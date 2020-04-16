import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
import Image from "../components/Image";
import SigninForm from "../components/SigninForm";
import Button from "../components/Button";
import "./style.css";

function Account() {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    // useEffect(() => {
    // }, [])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleBtnClick = event => {
        event.preventDefault();
        console.log(userInfo);
        console.log(event.target);
    };

    return (
        <div className="container" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="row">
                <div className="col-md-6" style={{ borderRight: "solid" }}>
                    <Image style={{ borderRadius: "50%" }} />
                    <div>Upload Profile Picture</div>
                    <div>
                        <p>First Name, Last Name</p>
                        <p>Username</p>
                        <p>Email</p>
                    </div>
                </div>

                <div className="col-md-6 px-5">
                    <div>Update Information</div>
                    <SigninForm userInfo={userInfo} handleInputChange={handleInputChange} />
                    <Button className="btn btn-primary updateBtn" value="SAVE" handleBtnClick={handleBtnClick} />
                </div>
            </div>

            <div className="">
                
            </div>
        </div>
    );
}

export default Account;