import React, { useState, useEffect } from "react";
// import API from "../../utils/API";
import { TextArea } from "../PostForm";
import Button from "../Button";
import "./sass/style.scss";
import API from "../../utils/API";

function ViewPostModal({ post, modalId, commentsArray, getUser }) {
    const [formObject, setFormObject] = useState({
        postID: post._id,
        username: localStorage.getItem("usernameMOAT"),
        profilePicture: localStorage.getItem("profilePicMOAT"),
        date: new Date()
    });
    const [commentsRendered, setCommentsRendered] = useState({});
    const [commentLength, setCommentLength] = useState();
    useEffect(() => {
        console.log("viewpostmodal")
        console.log("commentsRendered: " + commentsRendered)
        // { commentsRendered.length > 0 ? renderComments(commentsRendered) : renderComments(commentsArray) }
        // { commentsRendered.length > 0 ? setCommentLength(commentsRendered.length) : setCommentLength(commentsArray.length) }
    }, [commentsRendered.length > 0])
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    const handleBtnClick = event => {
        event.preventDefault();
        console.log(post);
        console.log(formObject);
        // console.log(event.target.id);
        getUser();
        // createComment();
    };

    const createComment = () => {
        API.createComment(post._id, formObject)
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
                console.log(res.data);
                setCommentsRendered(res.data.commentsArray);
                setCommentLength(res.data.commentsArray.length);
            })
    }

    const deleteComment = (event) => {
        console.log(event.target.id)
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
            <div className="modal-dialog" role="document">
                {comments.map(comment => (
                    <div className="modal-content">

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
            <div className="modal fade" id={`viewPostModal${modalId}`} tabindex="-1" role="dialog"
                aria-labelledby="viewPostModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title" id="viewPostModalLabel">Posted by {post.username}</p>
                            <button type="button" onClick={handleBtnClick} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="titles mb-3">
                                <h3 className="title text-left mb-3">{post.postTitle}</h3>
                                <p className="description text-left">{post.postBody}</p>
                            </div>
                            <div className="tags-w-num  mb-3 d-flex justify-content-between align-items-center">
                                <div className="tags d-flex">
                                    {post.categories.map(category => (
                                        <h6 className="tag">{category}</h6>
                                    ))}
                                </div>
                            </div>
                            {/* <p className="commentsNum  mb-3 font-weight-bold description text-left">
                                {commentLength > 0 ? commentLength : commentsArray.length} Comments
                            </p> */}
                            {commentLength > 0 ? renderNumberOfComments(commentLength) : renderNumberOfComments(commentsArray.length)}
                            <textarea id="commentBody" rows="4" cols="50"
                                onChange={handleInputChange}
                                value={formObject.commentBody}
                                name="commentBody"
                                placeholder=""
                            ></textarea>
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
                                <div className="modal-content">

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
                        {commentsRendered.length > 0 ? renderComments(commentsRendered) : renderComments(commentsArray)}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewPostModal;