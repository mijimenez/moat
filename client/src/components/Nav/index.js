import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./sass/style.scss";

function Navbar() {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        setPath(window.location.pathname);
    }, [path]);

    function logout() {
        API.logoutUser();
        localStorage.removeItem("usernameMOAT");
        localStorage.removeItem("profilePicMOAT");
        localStorage.removeItem("categoryMOAT");
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light" style={{ display: window.location.pathname === "/" || window.location.pathname === "/signin" || window.location.pathname === "/signup" ? "none" : "block" }}>
            <div className="container">
                <Link id="link-trigger" className="navbar-brand" to="/dashboard" onClick={() => setPath("/dashboard")}><img src={process.env.PUBLIC_URL + "/img/moat_logo_color.png"} alt="MOAT Logo" className="logo mr-2" /><h1 className="logo-name">MOAT</h1></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav navbar-right text-center ml-auto">
                        {
                            localStorage.getItem("usernameMOAT") ?
                                <li className="nav-item">
                                    <div className="nav-link username inactive text-muted">Hi, {localStorage.getItem("usernameMOAT")}</div>
                                </li> : ""
                        }
                        <li className="nav-item">
                            <Link id="link-trigger" className={
                                window.location.pathname === "/dashboard"
                                    ? "nav-link active"
                                    : "nav-link inactive"
                            } to="/dashboard" onClick={() => setPath("/dashboard")}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="link-trigger" className={
                                window.location.pathname === "/categories"
                                    ? "nav-link active"
                                    : "nav-link inactive"
                            } to="/categories" onClick={() => setPath("/categories")}>Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="link-trigger" className={
                                window.location.pathname === "/account"
                                    ? "nav-link active"
                                    : "nav-link inactive"
                            } to="/account" onClick={() => setPath("/account")}>Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={() => { return setPath("/"), logout() }}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
