import React from "react";
import Button from "../Button";
// import "./style.css";

function Card({ userPosts, handleBtnClick }) {
    return (
        userPosts.createdPosts.map(userPost => (
            <div className="card" style={{ width: "100%" }}>
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
                </div>
            </div>
        ))
    );
}

export default Card;