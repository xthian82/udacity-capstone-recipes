import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faHeart, faFileSignature, faFileImport, faFileArchive, faFileAlt} from "@fortawesome/free-solid-svg-icons";

import {useAuth0} from "@auth0/auth0-react";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";


class Recipe extends Component {
   // const {isAuthenticated} = useAuth0();

   clicked() {
      console.log('clicked!!!!');
   }

    render() {


       const {
          image_url,
          publisher,
          recipe_id,
          social_rank,
          title} = this.props.recipe;

       const {isAuthenticated} = this.props;

        return (
           <React.Fragment>
               <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
                  <div className="card">
                     <img
                        src={image_url}
                        className="img-card-top"
                        style={{height: "15rem"}}
                        alt="recipe"/>
                     <div className="card-body text-body-img text-capitalize">
                        <h6>{title}</h6>
                        <h6 className="text-warning text-publisher">
                           provided by {publisher}
                        </h6>
                     </div>
                     <div className="card-footer">

                        <button
                           type="button"
                           className="btn btn-success text-capitalize">
                           <FontAwesomeIcon icon={faFileSignature} className="mr-1" />
                           Info
                        </button>
                        <button
                           type="button"
                           onClick={() => this.clicked()}
                           disabled={isAuthenticated === false}
                           className="btn">
                           <FontAwesomeIcon color="red" icon={faHeart} className="mr-1" />
                           <span>{social_rank}</span>
                        </button>


                     </div>
                  </div>
               </div>
           </React.Fragment>
        );
    }
}

export default Recipe;
