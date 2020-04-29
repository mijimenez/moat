import React, { useState } from "react";
import SigninForm from "../components/SigninForm";
import Button from "../components/Button";
import API from "../utils/API";
import "./sass/style.scss";

function Signin() {
    const [userInfo, setUserInfo] = useState({
        username: "",
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
        API.loginUser(userInfo)
            .then(res => {
                console.log(res);
                localStorage.setItem("usernameMOAT", res.data.username);
                localStorage.setItem("profilePicMOAT", res.data.profilePicture);
                localStorage.setItem("categoryMOAT", res.data.categoryPreferences);
                if (res.status === 200) window.location.href = "/dashboard";
            })
            .catch(err => {
                console.log(err)
                setErrMsg("Wrong credentials");
            });
    };

    const onKeyDown = event => {
        if (event.key === "Enter") {
            handleBtnClick(event);
        }
        else return;
    }

    return (
        <div id="signinPage">
            <div className="welcome-side">
                <div className="wrapper">
                    <img src={process.env.PUBLIC_URL + "/img/moat_logo_white.png"} alt="MOAT Logo" className="logo" />
                    <div className="welcome">
                        <h1 className="logo-name">MOAT</h1>
                        <h4 className="tagline text-white">Master of All Trades</h4>
                    </div>
                    <p className="text-white">A place for hobbyists and professionals to talk shop.</p>
                </div>
            </div>

            <div className="form-side">
                <div className="wrapper">
                    <SigninForm userInfo={userInfo} handleInputChange={handleInputChange} onKeyDown={onKeyDown} />
                    <Button className="btn btn-primary mb-3 signinBtn" value="sign in" onClick={handleBtnClick} disabled={!(userInfo.username) || !(userInfo.password)} />
                    <div className={errMsg ? "p-2 alert alert-danger" : ""} key="errMsg" role="alert" id="errMsg">{errMsg}</div>
                    <p className="or">OR</p>
                    <p>Create your account by</p>
                    <div><a href="/signup" className="font-weight-bold signup-link">signing up here.</a></div>
                </div>
            </div>
        </div>
    );
}

export default Signin;