import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
import Image from "../components/Image";
import SigninForm from "../components/SigninForm";
import Button from "../components/Button";
import API from "../utils/API";
import "./sass/style.scss";

function Signin() {
    const [userInfo, setUserInfo] = useState({
        username: "",
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
        API.loginUser(userInfo)
            .then(res => {
                console.log(res);
                localStorage.setItem("usernameMOAT", res.data.username);
                localStorage.setItem("profilePicMOAT", res.data.profilePicture);
                if (res.status === 200) window.location.href = "/dashboard";
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
            <div className="row">
                <div className="col-md-6 order-md-12">
                    <Image style={{ borderRadius: "50%" }} />
                    <Tagline lineNum={[1, 2, 3]} />
                </div>

                <div className="col-md-6 order-md-1">
                    <Image className="d-none d-md-block" style={{ borderRadius: "50%" }} />
                    <SigninForm userInfo={userInfo} handleInputChange={handleInputChange} />
                    <Button className="btn btn-primary signinBtn" value="sign in" onClick={handleBtnClick} disabled={!(userInfo.username) || !(userInfo.password)} />
                    <div><hr />OR<hr /></div>
                    <div>Create your account by</div>
                    <div><a href="/signup"><b>signing up here.</b></a></div>
                </div>
            </div>
        </div>
    );
}

export default Signin;