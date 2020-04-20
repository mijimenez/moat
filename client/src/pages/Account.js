import React, { useState, useEffect } from "react";
// import Tagline from "../components/Tagline";
import Image from "../components/Image";
import SigninForm from "../components/SigninForm";
import Button from "../components/Button";
// import Card from "../components/Card";
import "./sass/style.scss";
import UserPost from "../components/UserPost";
import CreatePostModal from "../components/CreatePostModal";
// import ViewPostModal from "../components/ViewPostModal";
import API from "../utils/API";

function Account() {
    const [userInfo, setUserInfo] = useState({});
    const [userPosts, setUserPosts] = useState({
        userId: "",
        createdPostIds: [],
        createdCommentsIds: []
    })
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUser();
    }, [])

    let usernameStored;
    function getUser() {
        usernameStored = localStorage.getItem("usernameMOAT");
        console.log("usernameStored: " + usernameStored)
        API.getUser(usernameStored)
            .then(res => {
                console.log(res.data);
                setUserPosts({ userId: res.data._id, createdPostsIds: [res.data.createdPosts], createdCommentsIds: [res.data.createdComments] });
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
                getPostsByUser()
            })
            .catch(err => console.log(err));
    }

    function getPostsByUser() {
        API.getAllUserPosts(usernameStored)
            .then(res => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleBtnClick = event => {
        event.preventDefault();
        console.log(userInfo);
        // console.log(event.target.value);
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
                    <Button className="btn btn-primary updateBtn" value="save" onClick={handleBtnClick} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-3" style={{}}>
                    <div className="">
                        Add Post <span>
                            {/* <Button className="btn btn-info addBtn" value="+" handleBtnClick={handleBtnClick} /> */}
                            <CreatePostModal />
                        </span>
                    </div>
                </div>
                <div className="col-md-9" style={{}}>
                    <div className="row">
                        <p>Your Posts</p>
                    </div>
                    <div className="row" id={userPosts.userId}>
                        {/* {
                            posts.length > 0 ? posts.map(post =>
                                (< UserPost post={post} />)) :
                                <div className="description-w-btn d-flex mb-3">
                                    <p className="description text-left">No Posts Yet</p>
                                </div>
                        } */}
                        {
                            posts.length > 0 ? < UserPost posts={posts} getUser={getUser} /> :
                                <div className="description-w-btn d-flex mb-3">
                                    <p className="description text-left">No Posts Yet</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;