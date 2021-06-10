import React, {Component, Fragment} from "react";

import RecipeList from "../components/recipes/RecipeList";
import RecipeDetails from "../components/recipes/RecipeDetails";
import {recipes} from "../utils/tempList";

class Home extends Component {

   state = {
      recipesData: [],
      url: 'http://localhost:4200/api/search',
      details_id: 35382,
      pageIndex: 1,
      search:''
   };

   async getRecipes() {
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


   handleIndex = (index) => {
      this.setState({
         pageIndex: index
      })
   }

   handleDetails = (index, id) => {
      this.setState({
         pageIndex: index,
         details_id: id
      })
   }

   displayPage = (index) => {
      switch (index) {
         default:
         case 1:
            return (
               <RecipeList recipes={this.state.recipesData}
                  handleDetails={this.handleDetails}
                  value={this.state.search}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
               />
            )
         case 0:
            return (
               <RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex}/>
            )
      }
   }

   handleChange = (e) => {
      console.log('hello from handle change');
   }

   handleSubmit = (e) => {
      e.preventDefault();
      console.log('hello from handle submit');
   }

   render()
   {
      return (
         <Fragment>
            { this.displayPage(this.state.pageIndex) }
         </Fragment>
      );
   }

};

export default Home;
