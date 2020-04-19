import React from "react";
import Card from "../Card";
import Button from "../Button"
import "./sass/style.scss";

function Post(props) {
    return (
        <Card>
            <div className="description-w-btn d-flex mb-3">
                <div className="titles">
                    <h3 className="title text-left mb-3">{props.postTitle}</h3>
                    <p className="description text-left">{props.postBody}</p>
                </div>
                <Button className="view-btn align-self-start ml-3"
                    value="View"
                />
            </div>
            <div className="tags-w-num d-flex justify-content-between align-items-center">
                <div className="tags d-flex">
                    <h6 className="tag">Food</h6>
                    <h6 className="tag">Home</h6>
                </div>
                <p className="commentsNum font-weight-bold">{props.comments} Comments</p>
            </div>
        </Card>
    );
}

export default Post;