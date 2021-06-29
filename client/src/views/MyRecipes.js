import React, {Fragment, useEffect} from 'react';
import _ from 'lodash';
import Recipe from "../components/recipes/view-edit/Recipe";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../components/Loading";

export const MyRecipes = ({recipes, setRecipes}) => {

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
      getAccessTokenSilently,
      getIdTokenClaims,
      //loginWithPopup,
      //getAccessTokenWithPopup,
   } = useAuth0();

   const getData = async () => {

   }

   /*useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state*/

   useEffect(() => {
      async function fetchData() {
         try {
            // You can await here
            const idToken = await getIdTokenClaims();
            console.log(`***** Id token ${idToken.__raw}`);

            /* const response = await fetch(`${apiOrigin}/api/external`, {
             headers: {
                Authorization: `Bearer ${token}`,
             },
            });

            const responseData = await response.json();

            setState({
             ...state,
             showResult: true,
             apiMessage: responseData,
            });*/
            // ...
         } catch (error) {
            console.log(error);
            /*setState({
               ...state,
               error: error.error,
            });*/
         }
      }

      fetchData();
   });

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
                     <Recipe key={recipe.id} {...recipe} handleRemoveRecipe={handleRemoveRecipe} />
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
