import React, {Fragment} from 'react';
import _ from 'lodash';
import Recipe from "../components/recipes/view-edit/Recipe";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

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

export default MyRecipes;
