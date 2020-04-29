import React from "react";


function Card({ children, props }) {
    return (
        <div className="card">
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}

export default Card;