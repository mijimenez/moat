import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import CreatePostModal from "../CreatePostModal";
import "./sass/style.scss";

function Navbar() {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        setPath(window.location.pathname);
    }, [path]);

    function logout() {
        API.logoutUser();
        localStorage.removeItem("usernameMOAT");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ display: window.location.pathname === "/" || window.location.pathname === "/signin" || window.location.pathname === "/signup" ? "none" : "block" }}>
            <div className="container">
                <Link className="navbar-brand" to="/dashboard" onClick={() => setPath("/dashboard")}>MOAT</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav navbar-right ml-auto">
                        <li className="nav-item">
                            <Link className={
                                window.location.pathname === "/dashboard"
                                    ? "nav-link active"
                                    : "nav-link inactive"
                            } to="/dashboard" onClick={() => setPath("/dashboard")}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={
                                window.location.pathname === "/account"
                                    ? "nav-link active"
                                    : "nav-link inactive"
                            } to="/account" onClick={() => setPath("/account")}>Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={() => { return setPath("/"), logout() }}>Logout</Link>
                        </li>
                        <li className="nav-item">
                            <CreatePostModal />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
