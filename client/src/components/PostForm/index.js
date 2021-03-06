import React, { useEffect, useState } from "react";
import Button from "../Button";
import "./sass/style.scss";
import API from "../../utils/API";
// import categories from "../utils/categories.json"
export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control textArea" rows="20" {...props} />
    </div>
  );
}

export function Select(props) {

  const [userCategories, setCategories] = useState({})
  
  useEffect(() => {
    // getUser();

    getUserCategories();
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
  return (
    <div className="form-group">
      <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Categories</label>
      <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" {...props} >
        <option selected disabled>Choose...</option>
        {userCategories.length > 0 ? userCategories.map(category => 
          <option value={category}>{category}</option>
        ) : (<option disabled>Go to Categories page to start posting.</option>)}
      </select>
    </div>
  );
}
export function FormBtn(props) {
  return (
    <Button
      value="Post"
      onClick={props.onClick}
      disabled={props.disabled}
    />
  );
}