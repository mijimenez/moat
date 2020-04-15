import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
// import Emblem from "../components/Emblem";
// import Button from "../components/Button";
import "./style.css";

function Dashboard() {

    const handleBtnClick = event => {
        event.preventDefault();
    };

    return (
        <div className="container" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="row">
                <div className="col-md-6">
                    <Tagline lineNum={[{ 1: "Welcome to" }, 2]} />
                </div>
                <div className="col-md-6">
                    <Tagline lineNum={[3]} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-9">
                </div>
            </div>
        </div>
    );
}

export default Dashboard;