import React from "react";
// import "./style.css";

function SigninForm({ userInfo, handleInputChange }) {
    return (
        <form>
            <div className="form-group">
                <input
                    value={userInfo.username}
                    onChange={handleInputChange}
                    name="username"
                    type="text"
                    className="form-control"
                    id="inputUsername"
                    placeholder="username"
                />
            </div>
            <div className="form-group">
                <input
                    value={userInfo.password}
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="password"
                />
            </div>
        </form>
    );
}

export default SigninForm;
