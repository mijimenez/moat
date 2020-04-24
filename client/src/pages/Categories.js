import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
// import Button from "../components/Button";
// import { List, ListItem } from "../components/List";
// import TestList from "../components/TestList";
import Card from "../components/Card";
// import Post from "../components/Post";
import API from "../utils/API";
import "./sass/style.scss";
import categories from "../utils/categories.json"

export default function Categories() {

//    const [userCategories, setCategories] = useState({})

//    useEffect(() => {
//       getUser();
//       getUserCategories();
//    }, [])

//    let usernameStored;
//    function getUser() {
//       usernameStored = localStorage.getItem("usernameMOAT");
//       console.log("usernameStored: " + usernameStored)
//       API.getUser(usernameStored);
//   }

   // function getUserCategories() {
   //    API.getUserCategories("PolkaDotMask")
   //       .then(res => {
   //          console.log(res.data)
   //          setCategories(res.data)
   //          console.log(userCategories)
   //       })
         
   // }


   return (
      <div className="container" id="categoriesPage" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
         <div className="hero row p-5 mb-3">
            {/* <div className="col-md-6">
                    <Tagline lineNum={[{ 1: "Welcome to" }, 2]} />
                </div>
                <div className="col-md-6">
                    <Tagline lineNum={[3]} />
                </div> */}
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
                  {/* {userCategories.map(category =>
                     <li className="list-group-item">{category}</li>
                  )} */}
               </ul>
            </div>
            <div className="trending">
               <p className="mb-3 text-center font-weight-bold">Trending</p>
               <div class="categories-container">
                  {categories.sort().map(category =>
                     <a href="#" className="category-boxes"><Card>{category}</Card></a>
                  )}
               </div>
            </div>
         </div>
      </div>
   );

}

