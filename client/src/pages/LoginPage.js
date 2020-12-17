import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { FormLeft } from "../components/_components";
import userActions from "../actions/user.actions";
import sprite from "../assets/icons/sprite.svg";
import bgSignIn from "../assets/image/bg-sign-in.png";

const LoginPage = (props) => {
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
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	};

	const openNotificationWithIcon = (type) => {
		notification[type]({
			message: "Không thành công",
			description: "Bạn vui lòng thử lại",
		});
	};
	const handleLogin = (e) => {
		e.preventDefault();

		setSubmitted(true);
		if (username && password) {
			dispatch(userActions.login(username, password))
				.then(() => {
					props.history.push({ pathname: "/" });
					window.location.reload();
				})
				.catch(() => {
					setSubmitted(false);
					openNotificationWithIcon("error");
				});
		}
	};

	if (isLoggedIn) {
		return <Redirect to="/" />;
	}
	return (
		<div
			className="login"
			style={{
				backgroundImage: `url(${bgSignIn})`,
			}}
		>
			<div className="login__container">
				<FormLeft />
				<div className="login__form">
					<a className="login__close mobile-hide" href="/">
						<svg className="icon icon-remove">
							<svg className="icon icon-add">
								<use href={`${sprite}#icon-remove`} />
							</svg>
						</svg>
					</a>

					<div className="login__title h3">Đăng nhập</div>

					<div className="login__line">
						<div className="login__text">Người dùng mới?</div>
						<a className="login__link" href="/register">
							Tạo tài khoản
						</a>
					</div>

					<div className="field">
						<div className="field__label">
							Tên đăng nhập hoặc mật khẩu
						</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="email"
								placeholder="Nhập tên đăng nhập hoặc email ..."
								submitted={submitted}
								name="username"
								value={username}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="field">
						<div className="field__label">Mật khẩu</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="password"
								placeholder="Nhập mật khẩu ..."
								submitted={submitted}
								name="password"
								value={password}
								onChange={handleChange}
							/>
						</div>
					</div>

					<button
						className="login__btn btn btn_purple btn_wide"
						type="button"
						onClick={handleLogin}
					>
						Tiếp tục
					</button>

					<div className="login__or">Hoặc tiếp tục với</div>
					<button
						className="login__btn btn btn_blue btn_wide"
						type="button"
					>
						Google
					</button>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
