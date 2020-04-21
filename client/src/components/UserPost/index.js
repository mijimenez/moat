import React, { useState, useEffect } from "react";
import Card from "../Card";
import Button from "../Button";
import ViewPostModal from "../ViewPostModal";
import API from "../../utils/API";

function UserPost({ posts, getUser }) {
    useEffect(() => {
        console.log(posts)
    }, [])

    const handleBtnClick = event => {
        event.preventDefault();
        // console.log("Post id: " + event.target.id);
    };

    // const findCommentByPost = () => {
    //     API.findCommentByPost(pos)
    // }

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

    return (
        posts.map((post, i) => (
            <Card>
                <div className="description-w-btn d-flex mb-3">
                    <div className="titles">
                        <h3 className="title text-left mb-3">{post.postTitle}</h3>
                        <p className="description text-left">{post.postBody}</p>
                    </div>
                    <Button className="viewBtn align-self-start ml-auto"
                        id={post._id} value="view" data-toggle="modal"
                        data-target={`#viewPostModal${i}`}
                        onClick={handleBtnClick}
                    />
                    <ViewPostModal modalId={i} post={post} />
                    <Button className="deleteBtn align-self-start ml-3"
                        id={post._id} value="delete" onClick={() => deletePost(post._id)}
                    />
                </div>
                <div className="tags-w-num d-flex justify-content-between align-items-center">
                    <div className="tags d-flex">
                        {post.categories.map(category => (
                            <h6 className="tag">{category}</h6>
                        ))}
                    </div>
                    <p className="commentsNum font-weight-bold">{post.commentsArray.length} Comments</p>
                </div>
            </Card>
        ))
    );
}

export default UserPost;