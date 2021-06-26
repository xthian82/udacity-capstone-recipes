import React from 'react';
import { Button} from 'react-bootstrap'; //, Card
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import noimage from '../../../assets/no-image.png'

const Recipe = ({
                 id,
                 title,
                 ingredients,
                 date,
                 handleRemoveRecipe
              }) => {

   // const history = useHistory();

   return (


      <Card>
         <div className="col-7 mx-auto col-md-7 mr-1">
         <Card.Content className={"fa-pull-left"}>
            <Card.Header className={"card-title"}>
               <Link to={`/edit-recipe/${id}`}>{title}</Link>
            </Card.Header>
            <Card.Description className={"text-ingredient-detail"}>
               <i>Number of Ingredients: ({ingredients?.length || 0})</i>
            </Card.Description>
            <Card.Description className={"card-item"}>
               Date: {new Date(date).toDateString()}

            </Card.Description>

         </Card.Content>
         <Card.Content className={"fa-pull-right"}>
            <img src={noimage} width="130" height="100" alt=""/>
            <a href={`/edit-recipe/${id}`} type="button" className="btn btn-primary">
               <FontAwesomeIcon icon={faEdit}/>
            </a>
            &nbsp;
            <Button variant="danger" onClick={() => handleRemoveRecipe(id)}>
               <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
         </Card.Content>
         </div>
      </Card>
   );
};
export default Recipe;
