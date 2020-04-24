import React from "react";
// import "./sass/style.scss";

function CategoriesCard({ children, props }) {
   return (
      <div className="card">
         <div className="card-body" onClick={() => props.handleCategorySelect(props.categoryPicked)}>
            {children}
         </div>
      </div>
   );
}

export default CategoriesCard;