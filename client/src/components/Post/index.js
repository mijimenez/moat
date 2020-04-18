import React from "react";
import Card from "../Card";
import Button from "../Button"
import "./sass/style.scss";

function Post(props) {
    return (
        <Card>
            <div className="description-w-btn d-flex mb-3">
                <p className="description text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget blandit felis, vel accumsan eros. Morbi eu finibus nulla, sit amet pellentesque velit.</p>
                <Button className="view-btn align-self-start ml-3"
                    value="View"
                />
            </div>
            <div className="tags-w-num d-flex justify-content-between align-items-center">
                <div className="tags d-flex">
                    <h6 className="tag">Food</h6>
                    <h6 className="tag">Home</h6>
                </div>
                <p className="commentsNum font-weight-bold">5 Comments</p>
            </div>
        </Card>
    );
}

export default Post;