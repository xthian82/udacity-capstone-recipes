import React, {Fragment} from 'react';
import RecipeForm from "./RecipeForm";

const AddRecipe = ({ history, recipes, setRecipes }) => {

   const handleOnSubmit = (recipe) => {
      setRecipes([recipe, ...recipes]);
      history.push('/recipes');
   }

   return (
      <Fragment>
         <RecipeForm handleOnSubmit={handleOnSubmit} />
      </Fragment>
   );
};

export default AddRecipe;

