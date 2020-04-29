import React, { useState } from "react";
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
    const [errMsg, setErrMsg] = useState();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleBtnClick = event => {
        event.preventDefault();
        console.log(userInfo);
        const regEx = /.+@.+\..+/;
        !regEx.test(userInfo.email) ? setErrMsg("Invalid email form") : setErrMsg("Password has to be at least 6 characters")
        if (userInfo.password.length >= 6 && regEx.test(userInfo.email)) {
            setErrMsg("");
            signupUser(userInfo);
        }

    };

    const signupUser = (userInfo) => {
        console.log(userInfo);
        API.signupUser(userInfo)
            .then(res => {
                console.log(res);
                if (res.data.code) {
                    setErrMsg("Sorry, already a user with the email");
                    return;
                }
                else if (res.data.error) {
                    setErrMsg("Sorry, already a user with the username");
                    return;
                }
                else {
                    localStorage.setItem("usernameMOAT", res.data.username);
                    localStorage.setItem("profilePicMOAT", res.data.profilePicture);
                    localStorage.setItem("categoryMOAT", res.data.categoryPreferences);
                    window.location.href = "/dashboard";
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div id="signupPage">
            <div className="welcome-side">
                <div className="wrapper">
                    <img src={process.env.PUBLIC_URL + "/img/moat_logo_white.png"} alt="MOAT Logo" className="logo" />
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
                    <div className={errMsg ? "p-2 alert alert-danger" : ""} key="errMsg" role="alert" id="errMsg">{errMsg}</div>
                    <p className="or">OR</p>
                    <p>Already have an account?</p>
                    <div><a href="/signin" className="font-weight-bold signup-link">Sign in here.</a></div>
                </div>
            </div>
        </div>
    );
}

export default Signup;