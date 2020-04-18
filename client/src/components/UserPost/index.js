import React from "react";
import Card from "../Card";
import Button from "../Button"

function UserPost({ userPost, createdComments, handleBtnClick }) {
    return (
        // userPosts.createdPosts.map(userPost => (
            <Card>
                <div className="description-w-btn d-flex mb-3">
                    <p className="description text-left">postId: {userPost}</p>
                    <Button className="viewBtn align-self-start ml-3"
                        value="View" handleBtnClick={handleBtnClick}
                    />
                    <Button className="deleteBtn align-self-start ml-3"
                        value="Delete" handleBtnClick={handleBtnClick}
                    />
                </div>
                <div className="tags-w-num d-flex justify-content-between align-items-center">
                    <div className="tags d-flex">
                        <h6 className="tag">Food</h6>
                        <h6 className="tag">Home</h6>
                    </div>
                    <p className="commentsNum font-weight-bold">Total comments by this user: {createdComments.length} Comments</p>
                </div>
            </Card>
        // ))
    );
}

export default UserPost;

{/* <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-7">
                            {userPost}
                        </div>
                        <div className="col-md-3 p-0">
                            <Button className="btn btn-info viewBtn" value="VIEW" handleBtnClick={handleBtnClick} />
                        </div>
                        <div className="col-md-2 p-0">
                            <Button className="btn btn-info deleteBtn" value="X" handleBtnClick={handleBtnClick} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <Button className="btn btn-info tempBtn" value="FOOD" handleBtnClick={handleBtnClick} />
                            <Button className="btn btn-info tempBtn" value="HOME" handleBtnClick={handleBtnClick} />
                        </div>
                        <div className="col-md-4">
                            comments
                        </div>
                    </div>
                </div> */}