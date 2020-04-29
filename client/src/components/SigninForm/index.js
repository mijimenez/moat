import React from "react";
// import "../sass/style.scss";

function SigninForm({ userInfo, handleInputChange, onKeyDown }) {
    const infoReceived = Object.keys(userInfo);
    return (
        <form>
            {infoReceived.map(formInfo => {
                return (
                    <div className="form-group" key={formInfo}>
                        <input
                            value={userInfo[formInfo]}
                            onChange={handleInputChange}
                            onKeyDown={onKeyDown}
                            name={formInfo}
                            type={formInfo}
                            className="form-control"
                            id={`input${formInfo.charAt(0).toLocaleUpperCase()}${formInfo.substring(1)}`}
                            placeholder={formInfo.toLocaleLowerCase()}
                        />
                    </div>
                )
            })}
        </form>
    );
}

export default SigninForm;
