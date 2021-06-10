import React, {Component} from 'react';
import Recipe from "./Recipe";
import RecipeSearch from "./RecipeSearch";

class RecipeList extends Component {
   render() {
      const {
         recipes,
         handleDetails,
         value,
         handleChange,
         handleSubmit} = this.props;

      return (
         <React.Fragment>

            <RecipeSearch value={value}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit} />

            <div className="container my-5">
               { /* title */}
               <div className="row">
                  <div className="col-10 mx-auto col-md-6 text-center mb-3">
                     <h1 className="text-slanted">
                        Recipe List
                     </h1>
                  </div>
               </div>
               { /* end of title */}
               <div className="row">
                  {
                     recipes.map(recipe => {
                        return (
                           <Recipe key={recipe.recipe_id} recipe={recipe}
                              handleDetails={handleDetails} />
                        );
                     })
                  }
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default RecipeList;
