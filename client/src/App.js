import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {Container} from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import {useAuth0} from "@auth0/auth0-react";
import history from "./utils/history";

import MyRecipes from "./views/MyRecipes";
import AddRecipe from "./components/recipes/view-edit/AddRecipe";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import useLocalStorage from "./utils/useLocalStorage";
import EditRecipe from "./components/recipes/view-edit/EditRecipe";

initFontAwesome();

const App = () => {
   const {isLoading, error} = useAuth0();

   const [recipes, setRecipes] = useLocalStorage('recipes', []);

   if (error) {
      return <div>Oops... {error.message}</div>;
   }

   if (isLoading) {
      return <Loading/>;
   }

   return (
      <Router history={history}>
         <div id="app" className="d-flex flex-column h-100">
            <NavBar/>
            <Container className="flex-grow-1 mt-5">
               <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/profile" component={Profile}/>
                  <Route path="/external-api" component={ExternalApi}/>

                  <Route path="/recipes"
                     render={(props) =>
                        <MyRecipes {...props} recipes={recipes} setRecipes={setRecipes} /> } />

                  <Route path="/add-recipe"
                         render={(props) => (
                            <AddRecipe {...props} recipes={recipes} setRecipes={setRecipes} />
                         )}/>

                  <Route path="/edit-recipe/:id"
                         render={(props) => (
                            <EditRecipe {...props} recipes={recipes} setRecipes={setRecipes} />
                         )}/>

               </Switch>
            </Container>
            <Footer/>
         </div>
      </Router>
   );
};

export default App;
