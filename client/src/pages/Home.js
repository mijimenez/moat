import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
import Image from "../components/Image";
// import Button from "../components/Button";
import "./sass/style.scss";

function Home() {

    const handleBtnClick = event => {
        event.preventDefault();
    };

    return (
        <div className="container" id="homePage" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="row">
                <div className="col-md-12 order-md-12">
                    <Image style={{ borderRadius: "50%" }} />
                    <Tagline lineNum={[1, 2]} />
                </div>
            </div>
        </div>
    );
}

export default Home;