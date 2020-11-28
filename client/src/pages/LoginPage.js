import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../scss/_form.scss";

import userActions from "../actions/user.actions";
// import Field from "../components/Field";

function LoginPage() {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		emailToVerify: "",
		forgotPasswordEmail: "",
		submitted: false,
		showForm: false,
		forgotPasswordForm: false,
	});
	const [submitted, setSubmitted] = useState(false);
	const { username, password } = inputs;
	const loggingIn = useSelector((state) => state.authentication.loggingIn);
	const dispatch = useDispatch();
	const location = useLocation();

	// reset login status
	useEffect(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	function handleChange(e) {
		const { name, value } = e.target;
		// eslint-disable-next-line no-shadow
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();

		setSubmitted(true);
		if (username && password) {
			// get return url from location state or default to home page
			const { from } = location.state || { from: { pathname: "/" } };
			dispatch(userActions.login(username, password, from));
		}
	}
	const Field = (label, type, name, value, onChangge, submitted,) =>{
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
					onChange={onChangge}
					className={`form-control${
						submitted && !value ? " is-invalid" : ""
					}`}
				/>
				{submitted && !value && (
					<div className="invalid-feedback">Password is required</div>
				)}
			</div>
		);
	}

	return (
		<div className="row login">
			<div className="col-md-5 col-xs-12 side-left">
				<img src="../assets/image/imageLogin.jpg" alt="cat" />
			</div>
			<div className="col-md-7 col-xs-12 side-right">
				<div className="side-right-top">
					<form
						name="form"
						className="content"
						onSubmit={handleSubmit}
					>
						<div className="logo field">
							<h3>LOGO</h3>
						</div>
						<div className="field">
							<p className="label">
								Tên đăng nhập
								<sup> *</sup>
							</p>
							<input
								type="text"
								name="username"
								value={username}
								onChange={handleChange}
								className={`form-control${
									submitted && !username ? " is-invalid" : ""
								}`}
							/>
							{submitted && !username && (
								<div className="invalid-feedback">
									Username is required
								</div>
							)}
						</div>
						<div className="field">
							<p className="label">
								Mật khẩu
								<sup> *</sup>
							</p>
							<input
								type="password"
								name="password"
								value={password}
								onChange={handleChange}
								className={`form-control${
									submitted && !password ? " is-invalid" : ""
								}`}
							/>
							{submitted && !password && (
								<div className="invalid-feedback">
									Password is required
								</div>
							)}
						</div>
						{/* <Field
							submitted={submitted}
							type="password"
							name="password"
							value={password}
							onChange={handleChange}
						/> */}
						<button className="btn-form">
							{loggingIn && (
								<span className="spinner-border spinner-border-sm mr-1" />
							)}
							Login
						</button>
					</form>
				</div>
				<div className="side-right-bottom">
					<div className="content">
						<div>
							<p>Bạn chưa có tài khoản?</p>
							<Link to="/register" className="btn btn-link">
								Đăng ký ngay
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { LoginPage };
