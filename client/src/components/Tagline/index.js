import React from "react";
// import "../sass/style.scss";

function Tagline({ lineNum }) {
    const tagArray = ["MOAT", "MASTER OF ALL TRADES", "A place for hobbyists and professionals to exchange advice."];
    return (
        // lineNum.map(num => {
        //     return (
        //         <div>
        //             {
        //                 Object.values(num).length > 0 ? Object.values(num).concat(` ${tagArray[Object.keys(num) - 1]}`) : tagArray[num - 1]
        //             }
        //         </div>
        //     )
        // })
        <div className="wrapper">
            <div className="welcome">
                <h1 className="mb-2">Welcome to MOAT.</h1>
                <h4 className="tagline">Master of All Trades</h4>
            </div>
            <p>A place for hobbyists and professionals to exchange advice.</p>
        </div>
    );
}

export default Tagline;