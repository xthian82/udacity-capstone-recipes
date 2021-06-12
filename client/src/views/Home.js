import React, {Component, Fragment} from "react";

import RecipeList from "../components/recipes/RecipeList";
import RecipeDetails from "../components/recipes/RecipeDetails";
import {recipes} from "../utils/tempList";

class Home extends Component {

   state = {
      recipes: [],
      url: 'http://localhost:4200/api/recipes',
      base_url: 'http://localhost:4200/api/recipes/search',
      details_id: 35382,
      pageIndex: 1,
      search:'',
      query:'?q=',
      currentPage: 1,
      postsPerPage: 10
   };


   getRecipes() {
      try {
        /* const data = await fetch(url);
         const jsonData = await data.json();
         if (jsonData.recipes.length === 0) {
            this.setState(() => {
               return {error: "search didn't result any match"}
            })
         } else {
            this.setState(() => {
               return {recipes: jsonData.recipes}
            })
         }*/
         this.setState({
            recipes: recipes
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
               <RecipeList recipes={this.state.recipes}
                  handleDetails={this.handleDetails}
                  value={this.state.search}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                           error={this.state.error} />

            )
         case 0:
            return (
               <RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex}/>
            )
      }
   }

   handleChange = (e) => {
      this.setState({
         search: e.target.value
      });
      console.log('hello from handle change');
   }

   handleSubmit = (e) => {
      e.preventDefault();

      const {base_url, query, search} = this.state;
      console.log(`hello from handle submit base=${base_url}, q=${query}, s=${search}`);
      this.setState(() => {
         return {
            url: `${base_url}${query}${search}`,
            search: ""
         }}, () => {
         this.getRecipes()
      });
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
