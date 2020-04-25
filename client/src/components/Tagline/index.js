import React from "react";
// import "../sass/style.scss";

function Tagline({ lineNum }) {
    const tagArray = ["MOAT", "MASTER OF ALL TRADES", "A place for hobbyists and professionals to talk shop."];
    console.log(tagArray);
    return (

        <div className="wrapper">
            <div className="welcome">
                <h1 className="mb-2">Welcome to MOAT.</h1>
                <h4 className="tagline">Master of All Trades</h4>
            </div>
            <p>A place for hobbyists and professionals to talk shop.</p>
        </div>
    );
}

export default Tagline;