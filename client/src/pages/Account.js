import React, { useState, useEffect, useRef } from "react";
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

// ----- Image upload
import FileUploadWithPreview from 'file-upload-with-preview';

function Account() {
    const [userInfo, setUserInfo] = useState({});
    const uploadedImages = useRef([]);
    // const [userUpload, setUserUpload] = useState({});
    const [userPosts, setUserPosts] = useState({
        userId: "",
        profilePic: "",
        createdPostIds: [],
        createdCommentsIds: []
    })
    const [posts, setPosts] = useState([]);

    var upload;

    useEffect(() => {
        upload = new FileUploadWithPreview('myUniqueUploadId');
        window.addEventListener('fileUploadWithPreview:imagesAdded', function(e) {
            // e.detail.uploadId
            // e.detail.cachedFileArray
            // e.detail.addedFilesCount
            // Use e.detail.uploadId to match up to your specific input
            // if (e.detail.uploadId === 'mySecondImage') {
            //     console.log(e.detail.cachedFileArray)
            //     console.log(e.detail.addedFilesCount)
            // }
            // console.log(upload.cachedFileArray);
            // console.log("e.detail.cachedFileArray: " , upload.cachedFileArray);
            // uploadedImages.current = e.detail.cachedFileArray;
            // console.log("Cached File: " , upload.cachedFileArray);
            uploadedImages.current = upload.cachedFileArray;
        });
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

    const handleUploadClick = event => {
        // console.log("Uploaded: ", uploadedImages.current[0]);
        const profilePic = uploadedImages.current[0];
        API.uploadPhoto(profilePic)
            .then(res => {
                console.log("Successfully uploaded profile pic!");
            })
            .catch(err => console.log("Failed uploading picture."))
    };

    return (
        <div id="accountPage">
            <div className="info">
                <div className="container">
                    <div className="row">
                        <div className="user-image" style={{}}>
                            <img src={userPosts.profilePic} style={{ borderRadius: "50%" }} />
                            <div>Upload Profile Picture</div>


                            <div class="custom-file-container" data-upload-id="myUniqueUploadId">
                                <label>Upload File <a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image">&times;</a></label>
                                <label class="custom-file-container__custom-file" >
                                    <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="*" aria-label="Choose File"/>
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <span class="custom-file-container__custom-file__custom-file-control"></span>
                                </label>
                                <div class="custom-file-container__image-preview"></div>
                                <Button className="btn btn-primary updateBtn" value="Upload" onClick={handleUploadClick} />
                            </div>
                            {/* <div class="custom-file">
                                <input type="file" className="custom-file-input" id="customFile" onClick={handleUploadClick}/>
                                <label className="custom-file-label" for="customFile">Choose file</label>
                                <Button className="btn btn-primary updateBtn" value="Upload" onClick={handleUploadClick} />
                            </div> */}


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
                                posts.length > 0 ? < UserPost posts={posts} getUser={getUser} /> :
                                    <div className="description-w-btn d-flex mb-3">
                                        <p className="description text-left">No Posts Yet</p>
                                    </div>
                            } */}
                            {
                                posts.length > 0 ? posts.map(post =>
                                    (< UserPost post={post} getUser={getUser} key={post._id}/>)) :
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