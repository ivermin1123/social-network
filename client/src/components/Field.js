import React from "react";

const Field = ({...props}) =>{
    const {label, password, name } = props;
return (
    <div className="field">
        <p className="label">
            {label}
            <sup> *</sup>
        </p>
        <input name={name} type={password ? "password" : "text"} />
    </div>
);
}

export default Field;