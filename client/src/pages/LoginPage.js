import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/_form.scss";
import imageLogin from "../assets/image/showcase.4b31330b.jpg";

import userActions from "../actions/user.actions";
import { FormField } from "../components/_components";

function LoginPage(props) {
	const [inputs, setInputs] = useState({
		email: "",
		username: "",
		password: "",
		emailToVerify: "",
		forgotPasswordEmail: "",
		submitted: false,
		showForm: false,
		forgotPasswordForm: false,
	});
	const [submitted, setSubmitted] = useState(false);
	const { username, password } = inputs;
	const { isLoggedIn } = useSelector((state) => state.authentication);
	const dispatch = useDispatch();

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
			dispatch(userActions.login(username, password))
				.then(() => {
					props.history.push({ pathname: "/" });
					window.location.reload();
				})
				.catch(() => {
					setSubmitted(false);
				});
		}
	}

	if (isLoggedIn) {
		return <Redirect to="/" />;
	}

	return (
		<div className="row login">
			<div className="col-md-5 col-xs-12 side-left">
				<img src={imageLogin} alt="cat" />
			</div>
			<div className="col-md-7 col-xs-12 side-right">
				<div className="side-right-top">
					<form
						name="form"
						className="content"
						onSubmit={handleSubmit}
					>
						<div className="logo field">
							<img
								src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/119006919_2630686663849214_7588642771909915890_o.jpg?_nc_cat=104&ccb=2&_nc_sid=730e14&_nc_ohc=oYe86sMlZaUAX8luzCb&_nc_ht=scontent.fvca1-2.fna&oh=8b21dc4e660658cf1e0cb6463352f220&oe=5FF3FE38"
								alt=""
							/>
						</div>
						<FormField
							label="Tên đăng nhập"
							submitted={submitted}
							type="text"
							name="username"
							value={username}
							onChange={handleChange}
						/>
						<FormField
							label="Mật khẩu"
							submitted={submitted}
							type="password"
							name="password"
							value={password}
							onChange={handleChange}
						/>
						<div className="field">
							<input type="checkbox" name="save" />
							Nhớ mật khẩu
							<a href="/#" className="mt-0">
								Quên mật khẩu
							</a>
						</div>
						<button className="btn-form" type="submit">
							{isLoggedIn && (
								<span className="spinner-border spinner-border-sm mr-1" />
							)}
							ĐĂNG NHẬP
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

export default LoginPage;
