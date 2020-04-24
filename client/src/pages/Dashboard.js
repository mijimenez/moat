// import React, { useState, useEffect } from "react";
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Tagline from "../components/Tagline";
// import Button from "../components/Button";
import UserPost from "../components/UserPost";
import { List, ListItem } from "../components/List";
import API from "../utils/API";
import "./sass/style.scss";

function Dashboard() {

    const categories = ["Appliance", "Home", "Lawn"];

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
        console.log("Dashboard useEffect")

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
                <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
                    {categories.length >0? (
                    <List>
                        <li class="list-group-item font-weight-bold">By Category</li>
                        {categories.map(category => (
                            <ListItem
                                key={category.id}
                                item={category}
                                handleCategorySelect={handleCategorySelect}
                                categoryPicked={category}
                            />
                        ))}
                    </List>
                    ) : (
                        <p className="display-message text-center mt-5">No categories added. Add from categories tab to save search preferences.</p>
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