import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../sass/style.scss";

function Navbar() {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        setPath(window.location.pathname);
    }, [path]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ display: window.location.pathname === "/signin" || window.location.pathname === "/signup" ? "none" : "block" }}>
            <div className="container">
                <Link className="navbar-brand" to="/" onClick={() => setPath("/")}>MOAT</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav navbar-right">
                        {/* <li className="nav-item active">
                            <Link className="nav-link" to="/" onClick={() => setPath("/")}>Home <span className="sr-only">(current)</span></Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard" onClick={() => setPath("/dashboard")}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/account" onClick={() => setPath("/account")}>Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" onClick={() => setPath("/signin")}>Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" onClick={() => setPath("/signup")}>Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
