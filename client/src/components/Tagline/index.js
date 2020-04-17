import React from "react";
import "../sass/style.scss";

function Tagline({ lineNum }) {
    const tagArray = ["MOAT", "MASTER OF ALL TRADES", "A place for hobbyists and professionals to exchange advice."];
    return (
        lineNum.map(num => {
            return (
                <div>
                    {
                        Object.values(num).length > 0 ? Object.values(num).concat(` ${tagArray[Object.keys(num) - 1]}`) : tagArray[num - 1]
                    }
                </div>
            )
        })
    );
}

export default Tagline;