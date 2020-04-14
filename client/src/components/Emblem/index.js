import React from "react";
// import "./style.css";

function Emblem(props) {
    return (
        <>
            <div className="emblem">
                <img src="https://via.placeholder.com/100" {...props}/>
            </div>
        </>
    );
}

export default Emblem;