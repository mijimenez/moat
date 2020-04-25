import React, { useState, useEffect } from "react";
import Card from "../Card";
import Button from "../Button";
import ViewPostModal from "../ViewPostModal";
// import Image from "../Image";
import "./sass/style.scss";
import API from "../../utils/API";

function UserPost({ post, posts, getUser, getTrending }) {
    const [commentsArray, setCommentsArray] = useState([]);

    useEffect(() => {
        console.log("userpost useEffect")
    }, [commentsArray.length > 0])

    const handleBtnClick = event => {
        event.preventDefault();
        // console.log("Post id: " + event.target.id);
        // API.findCommentByPost(event.target.id)
        //     .then(res => {
        //         console.log(res.data);
        //         setCommentsArray(res.data.commentsArray);
        //     })
        console.log("when click view button (post._id): " + post._id)
        findCommentByPost();
    };

    const findCommentByPost = () => {
        API.findCommentByPost(post._id)
            .then(res => {
                console.log(`comments for post id(${post._id}): ${JSON.stringify(res.data.commentsArray)}`);
                setCommentsArray(res.data.commentsArray);
                sendToModal();
            })
    }

    const deletePost = (id) => {
        console.log("Deleting post id: " + id)

        API.deleteUserPost(id)
            .then((res) => {
                if (res.status === 200) {
                    getUser();
                }
            })
            .catch(err => console.log(err));
    }

    const sendToModal = () => {
        return(<ViewPostModal modalId={post._id} post={post} commentsArray={commentsArray} getUser={getUser} getTrending={getTrending} key={post._id}/>)
    }

    return (
        // posts.map((post, i) => (
        <Card>
            <div className="description-w-btn d-flex  justify-content-between mb-3">
                <div className="image-title">
                    <div className="title d-flex align-items-center text-left">
                        {/* <img src={process.env.PUBLIC_URL + post.profilePicture} style={{ borderRadius: "50%" }} /> */}
                        <div className="profile-picture mr-2" style={{ backgroundImage: `url(${post.profilePicture})` }}></div>
                        <p>{post.username}</p>
                    </div>
                </div>
                <div className="buttons d-flex">
                    <Button className="viewBtn align-self-start ml-auto"
                        id={post._id} value="view" data-toggle="modal"
                        // data-target={`#viewPostModal${i}`}
                        data-target={`#viewPostModal${post._id}`}
                        onClick={handleBtnClick}
                    />
                    {sendToModal()}
                    {/* <ViewPostModal modalId={post._id} post={post} commentsArray={commentsArray} getUser={getUser} getTrending={getTrending} /> */}
                    {getUser ?
                        <Button className="deleteBtn align-self-start ml-3"
                            id={post._id} value="delete" onClick={() => deletePost(post._id)}
                        /> : ""
                    }
                </div>
            </div>
            <h3 className="title text-left mb-3">{post.postTitle}</h3>
            <p className="description text-left mb-3">{post.postBody}</p>
            <div className="tags-w-num d-flex justify-content-between align-items-center">
                <div className="tags d-flex">
                    {post.categories.map(category => (
                        <h6 className="tag" key={category}>{category}</h6>
                    ))}
                </div>
                <p className="commentsNum font-weight-bold">{post.commentsArray.length} Comments</p>
            </div>
        </Card>
        // ))
    );
}

export default UserPost;