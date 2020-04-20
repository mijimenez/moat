import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Input, TextArea, Select, FormBtn } from "../PostForm";
import "./sass/style.scss";

function CreatePostModal(props) {

    const [formObject, setFormObject] = useState({})

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    // When the form is submitted, use the API.createPost method to create a new post by user
    function handleFormSubmit(event) {
        event.preventDefault();
        API.createPost({
            postTitle: formObject.postTitle,
            postBody: formObject.postBody,
            categories: formObject.categories
        })
        .catch(err => console.log(err));
        console.log(formObject);
    };


    return (
        <div>
            <button type="button" className="create-post-btn" data-toggle="modal" data-target="#exampleModal">
                +
            </button>

            {/* --- Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">New Post</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Input
                        onChange={handleInputChange}
                        name="postTitle"
                        placeholder="Title (required)"
                    />
                    <TextArea
                        onChange={handleInputChange}
                        name="postBody"
                        placeholder="Body (required)"
                    />
                    <Select
                        onChange={handleInputChange}
                        name="categories"
                    />
                </div>
                <div className="modal-footer">
                    <FormBtn
                        onClick={handleFormSubmit}
                        value="Post"
                    />
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default CreatePostModal;