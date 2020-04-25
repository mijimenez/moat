import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
import { List, ListItem } from "../components/List";
// import Button from "../components/Button";
// import ListGroup from "../components/ListGroup";
// import TestList from "../components/TestList";
import CategoriesCard from "../components/CategoriesCard";
// import Post from "../components/Post";
import API from "../utils/API";
import "./sass/style.scss";
import categories from "../utils/categories.json"

function Categories() {

   const [userCategories, setCategories] = useState({})

   useEffect(() => {
      getUser();
      getUserCategories();
   }, [userCategories.length > 0])

   let usernameStored;
   function getUser() {
      usernameStored = localStorage.getItem("usernameMOAT");
      console.log("usernameStored: " + usernameStored)
      console.log( "getUser cat" +categories)
      API.getUser(usernameStored);
   }

   function getUserCategories() {
      usernameStored = localStorage.getItem("usernameMOAT");
      console.log("usernameStored: " + usernameStored)
      console.log("user" + usernameStored)
      API.getUserCategories(usernameStored)
         .then(res => {
            console.log("get user res" + res.data)
            setCategories(res.data)
            console.log("get user cat" + userCategories)
         })
         .catch(err => console.log(err));
   }
   console.log(userCategories)


   function handleCategorySelect(categoryPicked) {

      console.log("category " + categoryPicked);
      usernameStored = localStorage.getItem("usernameMOAT");
      console.log("category " + usernameStored)
      if (categoryPicked === "") {
         return console.log("not found)");
      }
      else {
         return API.updateUserCategories({ categoryPreferences: categoryPicked, username: usernameStored })
            .then(res => {

               console.log("newCat response " + res.data)
               getUserCategories();
            })
         }
   };

   function removeUserCategory(category) {

      console.log("x button" + category);
      if (category === "") {
         return console.log("Not found")
      }
      else {
         API.removeUserCategory({ categoryPreferences: category, username: usernameStored })
            .then(res => {
               console.log("removeCat response " + res.data)
               getUserCategories();
            })
      }
   }


   return (
      <div className="container" id="categoriesPage" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
         <div className="hero row p-5 mb-3">
            <div className="col-12">
               <div className="wrapper">
                  <div className="welcome">
                     <h1 className="mb-2">Categories</h1>
                     <h4 className="tagline">Master of All Trades</h4>
                  </div>
                  <p>A place to learn just about anything. Choose your trades and master them.</p>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="categories">
               <ul class="list-group">
                  <li class="list-group-item font-weight-bold">Your Categories</li>
                  {userCategories.length > 0 ? userCategories.map(category =>
                     <li className="list-group-item"> {category}
                        <button className="float-right" onClick={() => removeUserCategory(category)}> X </button>
                     </li>
                  ) : (
                        <li className="list-group-item">
                           <div className="row">It looks like you don't have any categories yet.</div>
                           <br></br>
                           <div className="row">Just click some categories that you are interested in to get started</div>
                        </li>
                     )}
               </ul>
            </div>
            <div className="trending">
               <p className="mb-3 text-center font-weight-bold">Trending</p>
               <div class="categories-container">
                  {categories.sort().map(category =>
                     <a href="#" key={category.id} className="category-boxes">
                        <div className="card">
                           <div className="card-body" onClick={() => handleCategorySelect(category)}>
                              {category}
                           </div>
                        </div>
                     </a>
                  )}
               </div>
            </div>
         </div>
      </div>
   );

}

export default Categories;
