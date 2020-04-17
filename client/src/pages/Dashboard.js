import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
// import Button from "../components/Button";
import ListGroup from "../components/ListGroup";
import Card from "../components/Card";
import "./sass/style.scss";

function Dashboard() {

    const handleBtnClick = event => {
        event.preventDefault();
    };

    return (
        <div className="container" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="row" style={{ backgroundColor: "rgba(53, 50, 50, 0.575)" }}>
                <div className="col-md-6">
                    <Tagline lineNum={[{ 1: "Welcome to" }, 2]} />
                </div>
                <div className="col-md-6">
                    <Tagline lineNum={[3]} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    each category will be dynamically displayed later on
                    <ListGroup />
                </div>
                <div className="col-md-9">
                    <div>Trending</div>
                    <Card>
                        
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;