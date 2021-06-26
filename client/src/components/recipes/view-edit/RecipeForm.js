import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faTrash} from "@fortawesome/free-solid-svg-icons";

const RecipeForm = (props) => {
   const [recipe, setRecipe] = useState(() => {
      return {
         title: props.recipe ? props.recipe.title : '',
         image: props.recipe ? props.recipe.image : '',
         ingredients: props.recipe ? props.recipe.ingredients : [],
         date: props.recipe ? props.recipe.date : ''
      }
   });

   const [errorMsg, setErrorMsg] = useState('');
   const [item, setItem] = useState('');
   const isEdit = props.edit;

   const { title, image } = recipe;

   let ingredients = recipe.ingredients || [];

   const handleOnSubmit = (event) => {
      event.preventDefault();
      const values = [title];
      let errorMsg = '';

      const allReqFieldsFilled = values.every((field) => {
         const value = `${field}`.trim();
         return value !== '' && value !== '0';
      });

      if (allReqFieldsFilled) {
         const recipe = {
            id: uuidv4(),
            title,
            image,
            ingredients,
            date: new Date()
         };
         props.handleOnSubmit(recipe);
      } else {
         errorMsg = 'Please fill the title.';
      }
      setErrorMsg(errorMsg);
   };

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
         default:
            setRecipe((prevState) => ({
               ...prevState,
               [name]: value
            }));
            break;
      }
      setErrorMsg('')
   };

   const createIngredientsUI = () => {
      return ingredients.map((el, i) =>
            <div className={"row"} key={i}>
               <input type="text" value={el||''} onChange={handleIngredientChange.bind(this, i)} />

              <Button variant={"danger"} className="btn btn-danger" onClick={removeIngredient.bind(this, i)}>
                 <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
      )
   }

   const handleIngredientChange = (i, event) => {

      console.log(`handle ingredient change ${i} = ${event}`);
      let values = [...ingredients];
      values[i] = event.target.value;
      ingredients = values;
      setRecipe((prevState) => ({
         ...prevState,
         ingredients: values
      }));
      setErrorMsg('')
   }

   const addIngredient = () => {
      if (!item) {
         setErrorMsg('Please specify the ingredient');
         return;
      }

      let ing = recipe.ingredients;
      ing.push(item);
      setRecipe((prevState) => ({
         ...prevState,
         ingredients: ing
      }));

      setItem('');
      setErrorMsg('')
   }

   const removeIngredient = (i) => {
      let values = [...ingredients];
      values.splice(i,1);
      ingredients = values;

      setRecipe((prevState) => ({
         ...prevState,
         ingredients: values
      }));
   }

   return (
      <div className="mx-auto col-md-8">
      <div className="main-form">
         {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}

         <Form onSubmit={handleOnSubmit}>
            <Button variant="primary" type="submit" className="submit-btn">
               <FontAwesomeIcon icon={faPaperPlane} className="mr-1"/> { isEdit ? 'Update' :'Add Recipe'}
            </Button>

            <div className={"row"}>
               <Form.Group controlId="title">
                  <Form.Label>Recipe Title</Form.Label>
                  <Form.Control
                     className="input-control required"
                     type="text"
                     name="title"
                     value={title}
                     placeholder="Enter a title"
                     onChange={handleInputChange}
                  />
               </Form.Group>
            </div>

            <div className={"row"}>
               <Form.Label>Ingredient</Form.Label>
               <div className={"col-10 mx-auto col-md-6 text-center mb-3"}>
                  <Form.Control
                     className="input-control"
                     type="text"
                     value={item}
                     name="ingredient"
                     placeholder="add ingredient..."
                     onChange={event => setItem(event.target.value)}
                  />
                  <input type='button' className={"btn btn-success"} value='Add' onClick={addIngredient.bind(this)}/>
               </div>
            </div>

            {createIngredientsUI()}


         </Form>
      </div>
      </div>
   );
};

export default RecipeForm;
