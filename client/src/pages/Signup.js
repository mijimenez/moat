import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
import Image from "../components/Image";
import SigninForm from "../components/SigninForm";
import Button from "../components/Button";
import API from "../utils/API";
import "./sass/style.scss";

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
        API.signupUser(userInfo)
            .then(res => {
                console.log(res);
                localStorage.setItem("usernameMOAT", res.data.username);
                localStorage.setItem("profilePicMOAT", res.data.profilePicture);
                localStorage.setItem("categoryMOAT", res.data.categoryPreferences);
                if (res.status === 200) window.location.href = "/dashboard";
            })
            .catch(err => console.log(err));
    };

    return (
        <div id="signupPage">
            <div className="welcome-side">
                <div className="wrapper">
                    <img src={process.env.PUBLIC_URL + "/img/moat_logo_white.png"} alt="MOAT Logo" className="logo"/>
                    <div className="welcome">
                        <h1 className="logo-name">MOAT</h1>
                        <h4 className="tagline text-white">Master of All Trades</h4>
                    </div>
                    <p className="text-white">A place for hobbyists and professionals to exchange advice.</p>
                </div>
            </div>

            <div className="form-side">
                <div className="wrapper">
                    <SigninForm userInfo={userInfo} handleInputChange={handleInputChange} />
                    <Button className="btn btn-primary mb-3 signupBtn" value="sign up" onClick={handleBtnClick} disabled={!(userInfo.username) || !(userInfo.password) || !(userInfo.email)} />
                    <p className="or">OR</p>
                    <p>Already have an account?</p>
                    <div><a href="/signin" className="font-weight-bold signup-link">Sign in here.</a></div>
                </div>
            </div>
        </div>
    );
}

export default Signup;