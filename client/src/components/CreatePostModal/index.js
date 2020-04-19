import React from "react";
import { Input, TextArea, Select, FormBtn } from "../PostForm";
import "./sass/style.scss";

function CreatePostModal(props) {
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
                        // onChange={handleInputChange}
                        name="title"
                        placeholder="Title (required)"
                    />
                    <TextArea
                        // onChange={handleInputChange}
                        name="body"
                        placeholder="Body (required)"
                    />
                    <Select />
                </div>
                <div className="modal-footer">
                    <FormBtn
                        // onClick={handleFormSubmit}
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