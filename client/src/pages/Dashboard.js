import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
// import Button from "../components/Button";
import ListGroup from "../components/ListGroup";
import UserPost from "../components/UserPost";
// import Post from "../components/Post";
import API from "../utils/API";
import "./sass/style.scss";

function Dashboard() {

    const [trendingPosts, setTrendingPosts] = useState({})

    useEffect(() => {
        getUser();
        getTrending();
    }, [])

    let usernameStored;
    function getUser() {
        usernameStored = localStorage.getItem("usernameMOAT");
        console.log("usernameStored: " + usernameStored)
        API.getUser(usernameStored);
    }

    function getTrending() {
        API.getTrending()
        .then(res => 
            setTrendingPosts(res.data)
        )
        .catch(err => console.log(err));
    }
    console.log(trendingPosts);

    // const handleBtnClick = event => {
    //     event.preventDefault();
    // };

    return (
        <div className="container" id="dashboardPage" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="hero row p-5 mb-3">
                {/* <div className="col-md-6">
                    <Tagline lineNum={[{ 1: "Welcome to" }, 2]} />
                </div>
                <div className="col-md-6">
                    <Tagline lineNum={[3]} />
                </div> */}
                <div className="col-12">
                    <Tagline />
                </div>
            </div>
            <div className="row">
                <div className="categories">
                    <ListGroup />
                </div>
                <div className="trending">
                    <p className="mb-3 text-center font-weight-bold">Trending</p>
                    {
                        trendingPosts.length > 0 ? trendingPosts.map(post =>
                        (< UserPost post={post} getUser={getUser} />)) : (
                            <p className="display-message text-center mt-5">No one has created any posts yet!</p>
                        )}   
                </div>
            </div>
        </div>
    );
}

export default Dashboard;