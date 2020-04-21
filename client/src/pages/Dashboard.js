import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
// import Button from "../components/Button";
import ListGroup from "../components/ListGroup";
import Card from "../components/Card";
import Post from "../components/Post";
import API from "../utils/API";
import "./sass/style.scss";

function Dashboard() {

    const [trendingPosts, setTrendingPosts] = useState({})

    useEffect(() => {
        getTrending();
    }, [])

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
        <div className="container" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="hero row p-5 mb-3">
                <div className="col-md-6">
                    <Tagline lineNum={[{ 1: "Welcome to" }, 2]} />
                </div>
                <div className="col-md-6">
                    <Tagline lineNum={[3]} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <ListGroup />
                </div>
                <div className="col-md-9">
                    <div className="mb-3">Trending</div>
                    {trendingPosts.length >0? (
                    <div> 
                        {/* {trendingPosts.map(post => (
                            <Post
                                postTitle={post.postTitle}
                                postBody={post.postBody}
                                comments={post.commentsArray.length}
                            />
                        ))} */}
                        < Post posts={trendingPosts} />
                    </div>
                    ) : (
                    <p className="display-message text-center mt-5">No one has created any posts yet!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;