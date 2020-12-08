import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/_form.scss";

import { FormField } from "../components/_components";

const ChangePassword = () => {
	const [pass, setPass] = useState({
		currPassword: "",
		newPassword: "",
		repeat_password: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [reTypePassError, setReTypePassError] = useState(false);

	function handleChange(e) {
		const { name, value } = e.target;
		setPass((pass) => ({ ...pass, [name]: value }));
	}
	function handleRetypePassword(event) {
		const { name, value } = event.target;
		if (value !== pass.newPassword) {
			setReTypePassError(true);
		} else {
			setReTypePassError(false);
		}
		setPass((pass) => ({ ...pass, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();

		setSubmitted(true);
		if (password) {
			// get return url from location state or default to home page
			// dispatch(userActions.login(username, password))
			// 	.then(() => {
			// 		props.history.push({ pathname: "/" });
			// 		window.location.reload();
			// 	})
			// 	.catch(() => {
			// 		setSubmitted(false);
			// 	});
		}
	}

	return (
		<div className="row login">
			<form name="form" className="content" onSubmit={handleSubmit}>
				<FormField
					label="Mật khẩu"
					submitted={submitted}
					type="password"
					name="currPassword"
					value={pass.currPassword}
					onChange={handleChange}
				/>
				<FormField
					label="Mật khẩu mới"
					submitted={submitted}
					type="password"
					name="newPassword"
					value={pass.newPassword}
					onChange={handleChange}
				/>
				<FormField
					label="Nhập lại mật khẩu"
					submitted={submitted}
					type="password"
					name="repeat_password"
					value={pass.repeat_password}
					onChange={handleRetypePassword}
				/>
				<button className="btn-form" type="submit">
					ĐỔI MẬT KHẨU
				</button>
			</form>
		</div>
	);
};

export default ChangePassword;
