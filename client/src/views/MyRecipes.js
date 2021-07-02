import React, {Fragment, useEffect, useState} from 'react';
import _ from 'lodash';
import Recipe from "../components/recipes/view-edit/Recipe";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../components/Loading";
import axios from "axios";
import {apiEndpoint} from "../config";

export const MyRecipes = (/*{recipes, setRecipes}*/) => {

   const [recipes, setRecipes] = useState([])

   const handleRemoveRecipe = (id) => {
      confirmAlert({
         title: 'Confirm',
         message: 'Are you sure ?',
         buttons: [
            {
               label: 'Yes',
               onClick: () => { setRecipes(recipes.filter((recipe) => recipe.id !== id)); }
            },
            {
               label: 'No',
               onClick: () => { return; }
            }
         ]
      });


   };

   const {
      getIdTokenClaims,
      //loginWithPopup,
      //getAccessTokenWithPopup,
   } = useAuth0();

   useEffect(() => {
      async function fetchData() {
         try {
            const idToken = await getIdTokenClaims();
            console.log(`Bearer ${idToken.__raw}`)

            axios.get(`${apiEndpoint}/recipes`, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idToken.__raw}`
               }}).then(res => {
                  console.log(res.data.items)
                  setRecipes(res.data.items)
               }).catch(err => {
                  console.log(err);
               })
         } catch (error) {
            console.log(error);
         }
      }

      fetchData()

   }, []);

   return (
      <Fragment>
         <div className="fluid-container">
            <div className="d-flex mx-auto col-md-9 mb-2">
               <a href="/add-recipe" type="button" className="btn btn-success add-button fa-pull-right">Add Recipe
               </a>
            </div>
            <div>
               {!_.isEmpty(recipes) ? (
                  recipes.map((recipe) => (
                     <Recipe key={recipe.recipeId} {...recipe} handleRemoveRecipe={handleRemoveRecipe} />
                  ))
               ) : (
                  <p className="message">No Recipes available. Please add some recipes.</p>
               )}
            </div>
         </div>
      </Fragment>
   );

}

export default withAuthenticationRequired(MyRecipes, {
   onRedirecting: () => <Loading/>,
});
