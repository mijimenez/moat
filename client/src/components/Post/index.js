import React from "react";
import Card from "../Card";
import Button from "../Button"
import "./sass/style.scss";

function Post(props) {
    return (
        <Card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget blandit felis, vel accumsan eros. Morbi eu finibus nulla, sit amet pellentesque velit.</p>
            <Button 
                value="View"
            />
            <div className="tags">
                <h5 className="tag">Food</h5>
                <h5 className="tag">Home</h5>
            </div>
            <p className="commentsNum">5 Comments</p>
        </Card>
    );
}

export default Post;