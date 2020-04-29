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
        </form>
    );
}

export default SigninForm;
