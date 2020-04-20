import React from "react";
import Button from "../Button";
import "./sass/style.scss";

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
    return (
        <div className="form-group">
        <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Categories</label>
        <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" {...props} >
            <option selected>Choose...</option>
            <option value="Appliance">Appliance</option>
            <option value="Home">Home</option>
            <option value="Lawn">Lawn</option>
            <option value="Hair">Hair</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Technology">Technology</option>
            <option value="Social">Social</option>
            <option value="Games">Games</option>
        </select>
    </div>
    );
  }
  
  export function FormBtn(props) {
    return (
        <Button
            value="Post"
            onClick={props.onClick}
        />
    );
  }