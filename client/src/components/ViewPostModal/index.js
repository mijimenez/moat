import React, { useState, useEffect } from "react";
// import API from "../../utils/API";
import { TextArea } from "../PostForm";
import Button from "../Button";
// import "./sass/style.scss";

function ViewPostModal({ post, modalId }) {
    const [formObject, setFormObject] = useState({});
    // useEffect(() => {
    //     viewPost();
    // }, [])
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    const handleBtnClick = event => {
        event.preventDefault();
        console.log(post);
        console.log(formObject);
    };
    // const viewPost = () => {
    //     console.log(postId)
    //     API.getUserPost(postId)
    //         .then(res => {
    //             console.log(res.data)
    //             // setPostDetail(res.data);
    //         })
    //         .catch(err => console.log(err));
    // }


    return (
        <div>
            <div className="modal fade" id={`viewPostModal${modalId}`} tabindex="-1" role="dialog"
                aria-labelledby="viewPostModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title" id="viewPostModalLabel">Posted by {post.username}</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <p className="description text-left">{post.postBody}</p>
                            </div>
                            <div className="tags-w-num d-flex justify-content-between align-items-center">
                                <div className="tags d-flex">
                                    {post.categories.map(category => (
                                        <h6 className="tag">{category}</h6>
                                    ))}
                                </div>
                            </div>
                            <p className="commentsNum font-weight-bold description text-left">
                                {post.comments.length} Comments
                            </p>
                            <TextArea
                                onChange={handleInputChange}
                                name="commentBody"
                                placeholder=""
                            />
                        </div>
                        <div className="modal-footer">
                            <Button
                                disabled={!formObject.commentBody}
                                onClick={handleBtnClick}
                                value="comment"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPostModal;