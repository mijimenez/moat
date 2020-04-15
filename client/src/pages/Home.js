import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
import Emblem from "../components/Emblem";
// import Button from "../components/Button";
import "./style.css";

function Home() {

    const handleBtnClick = event => {
        event.preventDefault();
    };

    return (
        <div className="container" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="row">
                <div className="col-md-12 order-md-12">
                    <Emblem style={{ borderRadius: "50%" }} />
                    <Tagline />
                </div>
            </div>
        </div>
    );
}

export default Home;