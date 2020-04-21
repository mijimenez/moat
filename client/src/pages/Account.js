import React, { useState, useEffect } from "react";
// import Tagline from "../components/Tagline";
// import Image from "../components/Image";
import SigninForm from "../components/SigninForm";
import Button from "../components/Button";
import Card from "../components/Card";
import "./sass/style.scss";
import UserPost from "../components/UserPost";
import CreatePostModal from "../components/CreatePostModal";
// import ViewPostModal from "../components/ViewPostModal";
import API from "../utils/API";

function Account() {
    const [userInfo, setUserInfo] = useState({});
    const [userPosts, setUserPosts] = useState({
        userId: "",
        profilePic: "",
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
                setUserPosts({ userId: res.data._id, profilePic: res.data.profilePicture, createdPostsIds: [res.data.createdPosts], createdCommentsIds: [res.data.createdComments] });
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
        <div id="accountPage">
            <div className="info">
                <div className="container">
                    <div className="row">
                        <div className="user-image" style={{}}>
                            <img src={userPosts.profilePic} style={{ borderRadius: "50%" }} />
                            <div>Upload Profile Picture</div>
                            <div>
                                <p>{userInfo.firstName}, {userInfo.lastName}</p>
                                <p>{userInfo.username}</p>
                                <p>{userInfo.email}</p>
                            </div>
                        </div>

                        <div className="col user-info">
                        <p className="mb-3 text-center font-weight-bold">Update Information</p>
                            <SigninForm userInfo={userInfo} handleInputChange={handleInputChange} />
                            <Button className="btn btn-primary updateBtn" value="save" onClick={handleBtnClick} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container yourPosts">
                <div className="row">
                    <div className="add-post" style={{}}>
                        <Card className="add-post-card">
                            <p className="mr-3 font-weight-bold">Add Post</p>
                            <CreatePostModal />
                        </Card>
                    </div>
                    <div className="posts" style={{}}>
                        <p className="mb-3 text-center font-weight-bold">Your Posts</p>
                        <div className="user-posts" id={userPosts.userId}>
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
        </div>
    );
}

export default Account;