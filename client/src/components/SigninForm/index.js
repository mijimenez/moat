import React from "react";
// import "../sass/style.scss";

function SigninForm({ userInfo, formInfo, handleInputChange, onKeyDown }) {
    return (
        <form>
            {formInfo.map(info => {
                return (
                    <div className="form-group" key={info}>
                        <input
                            value={userInfo[info]}
                            onChange={handleInputChange}
                            onKeyDown={onKeyDown}
                            name={info}
                            type={info}
                            className="form-control"
                            id={`input${info.charAt(0).toLocaleUpperCase()}${info.substring(1)}`}
                            placeholder={info.toLocaleLowerCase()}
                        />
                    </div>
                )
            })}

            {/* <div className="form-group">
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
            </div> */}
        </form>
    );
}

export default SigninForm;

{/* <form>
<div className="form-group">
    <input
        value={userInfo.firstName}
        onChange={handleInputChange}
        name="firstName"
        type="text"
        className="form-control"
        id="inputFirstName"
        placeholder="first name"
    />
</div>
<div className="form-group">
    <input
        value={userInfo.lastName}
        onChange={handleInputChange}
        name="lastName"
        type="text"
        className="form-control"
        id="inputLastName"
        placeholder="last name"
    />
</div>
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
        value={userInfo.email}
        onChange={handleInputChange}
        name="email"
        type="text"
        className="form-control"
        id="inputEmail"
        placeholder="email"
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
</form> */}