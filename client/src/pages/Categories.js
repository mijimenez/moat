import React, { Fragment, useEffect, useRef, useState } from 'react';
import Tagline from "../components/Tagline";
import API from "../utils/API";
import "./sass/style.scss";
import categories from "../utils/categories.json"

function Categories() {

   const [userCategories, setCategories] = useState({})

   const [isSticky, setSticky] = useState(false);
   const ref = useRef(null);
   const handleScroll = () => {
       if (ref.current) {
           setSticky(ref.current.getBoundingClientRect().top <= 0);
       }

   };

   useEffect(() => {
      // getUser();

      getUserCategories();

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', () => handleScroll);
      };
   }, [userCategories.length])


   let usernameStored;
   function getUserCategories() {
      usernameStored = localStorage.getItem("usernameMOAT");
      console.log("usernameStored: " + usernameStored)
      console.log("user" + usernameStored)
      API.getUserCategories(usernameStored)
         .then(res => {
            console.log("get user res" + res.data)
            setCategories(res.data)
            console.log("get user cat", userCategories)
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
         API.updateUserCategories({ categoryPreferences: categoryPicked, username: usernameStored })
            .then(res => {
               console.log("newCat response " + res.data)
               getUserCategories();
            })
      }
   };

   function removeUserCategory(category) {
      
      usernameStored = localStorage.getItem("usernameMOAT");
      console.log("x button" + category);
      API.removeUserCategory({ categoryPreferences: category, username: usernameStored })
         .then(res => {
            console.log("removeCat response " + res.data)
            getUserCategories();
            // setCategories(res.data)
         })

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
            <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
               <div className="list-overflow-container  sticky-inner">
                  <ul className="list-group">
                     <li className="list-group-item font-weight-bold">Your Categories</li>
                     {userCategories.length > 0 ? userCategories.map(category =>
                        <li className="list-group-item d-flex justify-content-between align-items-center text-left"
                        key={category.id}>
                           <p className="mr-1">{category}</p>
                           <button className="float-right ml-2" onClick={() => removeUserCategory(category)}> X </button>
                        </li>
                     ) : (
                           <li className="list-group-item" style={{ width: "200px"}}>
                              <p className="row p-1">It looks like you don't have any categories yet.</p>
                              <br></br>
                              <p className="row p-1">Just click some categories that you are interested in to get started.</p>
                           </li>
                        )}
                  </ul>
               </div>
            </div>
            <div className="trending">
               <p className="mb-3 text-center font-weight-bold">Select Categories</p>
               <div className="categories-container">
                  {categories.sort().map(category =>
                     <div className="card category-boxes" key={category.id}>
                        <div className="card-body" onClick={() => handleCategorySelect(category)}>
                           {category}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );

}

export default Categories;
