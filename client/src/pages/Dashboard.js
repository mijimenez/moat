// import React, { useState, useEffect } from "react";
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Tagline from "../components/Tagline";
// import Button from "../components/Button";
import UserPost from "../components/UserPost";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import API from "../utils/API";
import "./sass/style.scss";

function Dashboard() {

    const [userCategories, setCategories] = useState({})
    const [trendingPosts, setTrendingPosts] = useState({})

    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            setSticky(ref.current.getBoundingClientRect().top <= 0);
        }

    };

    useEffect(() => {
        getTrending();
        getUserCategories()
        // console.log("Dashboard useEffect")

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, [])

    function getTrending() {
        API.getTrending()
            .then(res => {
                // console.log(res.data);
                setTrendingPosts(res.data)
            })
            .catch(err => console.log(err));
    }
    // console.log(trendingPosts);
    let usernameStored
    function getUserCategories() {
        usernameStored = localStorage.getItem("usernameMOAT");
        console.log("usernameStored: " + usernameStored)
        console.log(usernameStored)
        API.getUserCategories(usernameStored)
            .then(res => {
                console.log(res.data)
                setCategories(res.data)
                console.log(userCategories)
            })
            .catch(err => console.log(err));
    }
    console.log(userCategories)

    function filler() {
        console.log("test")
    }

    function handleCategorySelect(categoryPicked) {
        console.log(categoryPicked);
        API.getPostByCategories(categoryPicked)
            .then(res => {
                console.log(res.data);
                setTrendingPosts(res.data)
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container" id="dashboardPage" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="hero row p-5 mb-3">
                <div className="col-12">
                    <Tagline />
                </div>
            </div>
            <div className="row">
                <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>

                    {userCategories.length > 0 ? (
                        <List>
                                <li className="list-group-item font-weight-bold">By All Users</li>
                                <li className="list-group-item item" onClick={() => getTrending()}>Trending</li>
                                <br></br>
                                <li className="list-group-item font-weight-bold">By Category</li>
                                {userCategories.map(category => (
                                    <ListItem
                                        // key={category.id}
                                        item={category}
                                        handleCategorySelect={handleCategorySelect}
                                        categoryPicked={category}
                                    />
                                ))}
                            </List>
                        ) : (
                            <List>
                                <ListItem
                                item={
                                    <Link to="/categories">
                                        <span>No categories added. Click here to add categories.</span>
                                    </Link>
                                }
                                handleCategorySelect={filler}
                                ></ListItem>
                            </List>
                            
                            )}
                </div>
                <div className="trending">
                    <p className="mb-3 text-center font-weight-bold">Trending</p>
                    {
                        trendingPosts.length > 0 ? trendingPosts.map(post =>
                            (< UserPost post={post} getTrending={getTrending} key={post._id} />)) : (
                                <p className="display-message text-center mt-5">No one has created any posts yet!</p>
                            )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;