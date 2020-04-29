import React, { useState, useEffect } from "react";
// import API from "../../utils/API";
import { TextArea } from "../PostForm";
import Button from "../Button";
import Image from "../Image";
import "./sass/style.scss";
import API from "../../utils/API";

function ViewPostModal({ post, modalId, commentsArray, getUser, getTrending }) {
    const [formObject, setFormObject] = useState({
        username: localStorage.getItem("usernameMOAT"),
        profilePicture: localStorage.getItem("profilePicMOAT").replace(/\\/gi, "/")
    });
    const [commentsRendered, setCommentsRendered] = useState({});
    // const [commentLength, setCommentLength] = useState();

    useEffect(() => {
        console.log("viewpostmodal useEffect")
        console.log(`commentsRendered: ${JSON.stringify(commentsRendered, null, 4)}`)
        // { commentsRendered.length > 0 ? renderComments(commentsRendered) : renderComments(commentsArray) }
        // { commentsRendered.length > 0 ? setCommentLength(commentsRendered.length) : setCommentLength(commentsArray.length) }
    }, [commentsRendered.length >= 0])
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
    };

    const handleBtnClick = event => {
        event.preventDefault();
        console.log(post);
        console.log(formObject);
        // console.log(event.target.id);
    };

    const onKeyDown = event => {
        if (event.key === "Enter") {
            createComment(event);
        }
        else return;
    }

    const createComment = (event) => {
        console.log("when click create comment -> post_id: " + post._id + " event.target.id " + event.target.id)
        const commentSaved = {
            postID: post._id,
            ...formObject
        }
        console.log("comment info to be sent to backend" + JSON.stringify(commentSaved))
        API.createComment(post._id, commentSaved)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    findCommentByPost(post._id);
                    setFormObject({ ...formObject, commentBody: "" });
                }
            })
    };

    const findCommentByPost = (postId) => {
        API.findCommentByPost(postId)
            .then(res => {
                console.log(`rerender comments by postId (${postId}): ${JSON.stringify(res.data.commentsArray)}`);
                setCommentsRendered(res.data.commentsArray);
                // setCommentLength(res.data.commentsArray.length);
                getUser ? getUser() : getTrending();
            })
    }

    const deleteComment = (commentId, postId) => {
        console.log("deleting postId: " + postId + " commentId: " + commentId)
        API.deleteComment(commentId)
            .then((res) => {
                if (res.status === 200) {
                    findCommentByPost(postId);
                    console.log(res)
                }
            })
    }

    // const viewPost = () => {
    //     console.log(postId)
    //     API.getUserPost(postId)
    //         .then(res => {
    //             console.log(res.data)
    //             // setPostDetail(res.data);
    //         })
    //         .catch(err => console.log(err));
    // }

    function renderComments(comments) {
        return (
            <div className="comments-modal modal-dialog mb-3" style={{ width: "90%", margin: "auto" }} role="document">
                {comments.map(comment => (
                    <div className="modal-content" key={comment._id}>

                        <div className="modal-body">
                            <div className="d-flex align-items-center mb-3">
                                <div className="profile-picture ml-0 mr-2" style={{ backgroundImage: `url(${comment.profilePicture})` }}></div>
                                <p className="modal-title" id="viewPostModalLabel">Posted by        {comment.username}
                                </p>
                            </div>
                            <p className="description text-left">{comment.commentBody}</p>
                            {/* <p className="description text-left">postID for this comment {comment.postID}</p>
                            <p className="description text-left">commentID for this comment {comment._id}</p> */}
                        </div>
                        <div className="modal-footer">
                            {localStorage.getItem("usernameMOAT") === comment.username ?
                                <Button
                                    id={comment._id}
                                    onClick={() => deleteComment(comment._id, comment.postID)}
                                    value="delete"
                                /> : ""
                            }
                        </div>

                    </div>
                ))}
            </div>
        );
    }

    function renderNumberOfComments(length) {
        return (
            <p className="commentsNum  mb-3 font-weight-bold description text-left">
                {length} Comments
            </p>
        );
    }

    return (
        <div>
            <div className="main-model modal view-modal fade" id={`viewPostModal${modalId}`} tabIndex="-1" role="dialog"
                aria-labelledby="viewPostModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <div className="profile-picture mr-2" style={{ backgroundImage: `url(${post.profilePicture.replace(/\\/gi, "/")})` }}></div>
                                <p className="modal-title" id="viewPostModalLabel">Posted by        {post.username}
                                </p>
                            </div>
                            <button type="button" onClick={handleBtnClick} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="titles mb-3">
                                {/* <h3 className="title text-left mb-3">postID for this post: {post._id}</h3> */}
                                <h3 className="title text-left mb-3">{post.postTitle}</h3>
                                <p className="description text-left">{post.postBody}</p>
                            </div>
                            <div className="tags-w-num  mb-3 d-flex justify-content-between align-items-center">
                                <div className="tags d-flex">
                                    {post.categories.map(category => (
                                        <h6 className="tag" key={category}>{category}</h6>
                                    ))}
                                </div>
                            </div>
                            {/* <p className="commentsNum  mb-3 font-weight-bold description text-left">
                                {commentLength > 0 ? commentLength : commentsArray.length} Comments
                            </p> */}
                            {/* {commentLength >= 0 ? renderNumberOfComments(commentLength) : renderNumberOfComments(commentsArray.length)} */}
                            {commentsRendered.length >= 0 ? renderNumberOfComments(commentsRendered.length) : renderNumberOfComments(commentsArray.length)}
                            <TextArea id="commentBody" rows="4" cols="50"
                                onChange={handleInputChange}
                                onKeyDown={onKeyDown}
                                value={formObject.commentBody}
                                name="commentBody"
                                placeholder=""
                            ></TextArea>
                        </div>
                        <div className="modal-footer">
                            <Button
                                id={post._id}
                                disabled={!formObject.commentBody}
                                onClick={createComment}
                                value="comment"
                            />
                        </div>
                        {/* <div className="modal-dialog" role="document">
                            {commentsArray.map(comment => (
                                <div className="modal-content" key={category.id}>

                                    <div className="modal-body">
                                        <img src={commentsArray.profilePicture} style={{ borderRadius: "50%" }} />
                                        <p className="description text-left">{comment.username}</p>
                                        <p className="description text-left">{comment.commentBody}</p>
                                    </div>
                                    <div className="modal-footer">
                                        {localStorage.getItem("usernameMOAT") === comment.username ?
                                            <Button
                                                id={comment._id}
                                                onClick={deleteComment}
                                                value="delete"
                                            /> : ""
                                        }
                                    </div>

                                </div>
                            ))}
                        </div> */}
                        {commentsRendered.length >= 0 ? renderComments(commentsRendered) : renderComments(commentsArray)}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewPostModal;