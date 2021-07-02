import React, {useEffect, useState} from 'react';
import RecipeForm from "./RecipeForm";
import { useParams } from 'react-router-dom';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../../Loading";
import axios from "axios";
import {apiEndpoint} from "../../../config";
import _ from "lodash";

const EditRecipe = ({ history }) => {
   const { recipeId } = useParams();
   const [recipe, setRecipe] = useState({})

   const {
      getIdTokenClaims
   } = useAuth0();

   const handleOnSubmit = () => {
      // const filteredRecipes = recipes.filter((r) => r.id !== id);
      // setRecipes([recipe, ...filteredRecipes]);
      history.push('/recipes');
   };

   useEffect(() => {
      async function fetchData() {
         try {
            const idToken = await getIdTokenClaims();

            axios.get(`${apiEndpoint}/recipe/${recipeId}`, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idToken.__raw}`
               }}).then(res => {
                  console.log(res.data)
               setRecipe(res.data.items)
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
      <div>
         {!_.isEmpty(recipe) ? (
            <RecipeForm recipe={recipe} handleOnSubmit={handleOnSubmit} edit={true} />
         ) : (
            <p className="message">Loading...</p>
         )}
      </div>
   );
};

export default withAuthenticationRequired(EditRecipe, {
   onRedirecting: () => <Loading/>,
});
