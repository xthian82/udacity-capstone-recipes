import React from 'react';
import RecipeForm from "./RecipeForm";
import { useParams } from 'react-router-dom';

const EditRecipe = ({ history, recipes, setRecipes }) => {
   const { id } = useParams();
   const recipeToEdit = recipes.find((r) => r.id === id);

   const handleOnSubmit = (recipe) => {
      const filteredRecipes = recipes.filter((r) => r.id !== id);
      setRecipes([recipe, ...filteredRecipes]);
      history.push('/recipes');
   };

   return (
      <div>
         <RecipeForm recipe={recipeToEdit} handleOnSubmit={handleOnSubmit} edit={true} />
      </div>
   );
};

export default EditRecipe;
