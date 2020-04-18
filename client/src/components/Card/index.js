import React from "react";
import Button from "../Button";
// import "./sass/style.scss";

function Card({ children, props }) {
    return (
        <div class="card">
            <div class="card-body">
                {children}
            </div>
        </div>
    );
}

export default Card;