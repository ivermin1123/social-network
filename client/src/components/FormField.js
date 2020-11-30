import React from "react";

const FormField = ({ ...props }) => {
	const { label, type, name, value, onChange, submitted } = props;
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
				className={`${submitted && !value ? " is-invalid" : ""}`}
			/>
			{submitted && !value && (
				<div className="invalid-feedback">Bạn chưa nhập {label}</div>
			)}
		</div>
	);
};

export default FormField;
