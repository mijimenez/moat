import React, { useState, useEffect } from "react";
import axios from "axios";
// import Tagline from "../components/Tagline";
import Image from "../components/Image";
import SigninForm from "../components/SigninForm";
import Button from "../components/Button";
import Card from "../components/Card";
import "./sass/style.scss";
import UserPost from "../components/UserPost";
import API from "../utils/API";

function Account() {
    const [userInfo, setUserInfo] = useState({});
    const [userPosts, setUserPosts] = useState({
        _id: "",
        createdPosts: [],
        createdComments: []
    })

    useEffect(() => {
        getUser();
    }, [])

    function getUser() {
        const usernameStored = localStorage.getItem("usernameMOAT");
        console.log(usernameStored)
        API.getUser(usernameStored)
            .then(res => {
                console.log(res.data);
                setUserPosts({ _id: res.data._id, createdPosts: [res.data.createdPosts], createdComments: [res.data.createdComments] });
                setUserInfo(
                    {
                        firstName: res.data.firstName ? res.data.firstName : "",
                        lastName: res.data.lastName ? res.data.lastName : "",
                        username: res.data.username,
                        email: res.data.email ? res.data.email : "",
                        password: res.data.password
                    }
                )
            })
            .then(() => {
                // getPostsByUser()
            })
    }

    function getPostsByUser() {

    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleBtnClick = event => {
        event.preventDefault();
        console.log(userInfo);
        // console.log(event.target);
        console.log(userPosts);
    };

    return (
        <div className="container" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="row">
                <div className="col-md-6" style={{}}>
                    <Image style={{ borderRadius: "50%" }} />
                    <div>Upload Profile Picture</div>
                    <div>
                        <p>{userInfo.firstName}, {userInfo.lastName}</p>
                        <p>{userInfo.username}</p>
                        <p>{userInfo.email}</p>
                    </div>
                </div>

                <div className="col-md-6 px-5">
                    <div>Update Information</div>
                    <SigninForm userInfo={userInfo} handleInputChange={handleInputChange} />
                    <Button className="btn btn-primary updateBtn" value="SAVE" handleBtnClick={handleBtnClick} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-3" style={{}}>
                    <div className="">
                        Add Post <span> <Button className="btn btn-info addBtn" value="+" handleBtnClick={handleBtnClick} /></span>
                    </div>
                </div>
                <div className="col-md-9" style={{}}>
                    <div className="row">
                        <p>Your Posts</p>
                    </div>
                    <div className="row" id={userPosts._id}>
                        {userPosts.createdPosts.map(userPost => (
                            < UserPost userPost={userPost} createdComments={userPosts.createdComments} handleBtnClick={handleBtnClick} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;