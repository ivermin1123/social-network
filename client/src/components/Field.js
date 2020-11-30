import React from "react";

const Field = ({ label, type = "text", name = "", value = "", onChange, submitted }) => {
	return (
		<div className="field">
			<p className="label">
				{label}
				<sup> *</sup>
			</p>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className={`form-control${
					submitted && !value ? " is-invalid" : ""
				}`}
			/>
			{submitted && !value && (
				<div className="invalid-feedback">Password is required</div>
			)}
		</div>
	);
};

export default Field;