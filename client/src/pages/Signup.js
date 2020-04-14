import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
import Emblem from "../components/Emblem";
import SignupForm from "../components/SignupForm";
import Button from "../components/Button";
import "./style.css";

function Signup() {
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
                <div className="col-md-6 order-md-12">
                    <Emblem style={{ borderRadius: "50%" }} />
                    <Tagline />
                </div>

                <div className="col-md-6 order-md-1">
                    <Emblem style={{ borderRadius: "50%" }} />
                    <SignupForm userInfo={userInfo} handleInputChange={handleInputChange} />
                    <Button className="btn btn-primary signupBtn" value="SIGN UP" handleBtnClick={handleBtnClick} disabled={!(userInfo.username) || !(userInfo.password)} />
                    <div><hr />OR<hr /></div>
                    <div>Already have an account?</div>
                    <div><a href="/signin"><b>Sign in here.</b></a></div>
                </div>
            </div>
        </div>
    );
}

export default Signup;