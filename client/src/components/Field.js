import React from "react";

const Field = ({...props}) =>{
    const { label, password, name, handleChange, className, value } = props;
return (
	<div className="field">
		<p className="label">
			{label}
			<sup> *</sup>
		</p>
		<input
			className={className}
			name={name}
			// value={value}
			onChange={handleChange}
			type={password ? "password" : "text"}
		/>
	</div>
);
}

export default Field;