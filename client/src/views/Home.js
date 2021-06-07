import React, {Component, Fragment} from "react";

import RecipeList from "../components/recipes/RecipeList";
import RecipeDetails from "../components/recipes/RecipeDetails";
import {recipes} from "../utils/tempList";

class Home extends Component {

   state = {
      recipesData: [],
      url: 'http://localhost:4200/api/search'
   };

   // async
   getRecipes() {
      try {
         //const data = await fetch(url);
         //const jsonData = await data.json();
         this.setState({
            recipesData: recipes
         });
      } catch (e) {
         console.log(e);
      }
   };

   componentDidMount()
   {
      this.getRecipes();
   }

   render()
   {

      const {isAuthenticated} = this.props;
      return (
         <Fragment>
            <RecipeList recipes={this.state.recipesData} isAuthenticated={isAuthenticated} />
            <RecipeDetails />
         </Fragment>
      );
   }

};

export default Home;
