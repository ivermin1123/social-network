import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import userActions from "../actions/user.actions";
import { FormLeft } from "../components/_components";

const Register = (props) => {
	const [user, setUser] = useState({
		username: "",
		firstName: "",
		lastName: "",
		password: "",
		gender: 0,
		birthday: new Date(),
		email: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const { isLoggedIn } = useSelector((state) => state.authentication);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((user) => ({ ...user, [name]: value }));
	};
	const handleRegister = (e) => {
		try {
			e.preventDefault();

			setSubmitted(true);
			dispatch(userActions.register(user))
				.then(() => {
					props.history.push({ pathname: "/login" });
					window.location.reload();
				})
				.catch(() => {
					setSubmitted(false);
				});
		} catch (error) {
			console.log(error);
		}
	};
	if (isLoggedIn) {
		return <Redirect to="/" />;
	}
	return (
		<div
			className="login"
			style={{ backgroundImage: "img/bg-sign-in.png" }}
		>
			<div className="login__container">
				<FormLeft />
				<div className="login__form">
					<a className="login__close" href="index.html">
						<svg className="icon icon-arrow-left">
							{/* <a href="img/sprite.svg#icon-arrow-left"></a> */}
						</svg>
					</a>
					<div className="login__title h3">Đăng ký</div>
					<div className="login__line">
						<div className="login__text">Bạn đã có tài khoản?</div>
						<a className="login__link" href="/login">
							Đăng nhập ngay
						</a>
					</div>
					<div className="field">
						<div className="field__label">Tên đăng nhập</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="text"
								placeholder="Nhập tên đăng nhập ..."
								submitted={submitted}
								name="username"
								value={user.username}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="login__row">
						<div className="login__col">
							<div className="field">
								<div className="field__label">Họ</div>
								<div className="field__wrap">
									<input
										className="field__input"
										type="text"
										placeholder="Nhập họ ..."
										submitted={submitted}
										name="firstName"
										value={user.firstName}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>
						<div className="login__col">
							<div className="field">
								<div className="field__label">Tên</div>
								<div className="field__wrap">
									<input
										className="field__input"
										type="text"
										placeholder="Nhập tên ..."
										submitted={submitted}
										name="lastName"
										value={user.lastName}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="login__row">
						<div className="login__col">
							<div className="field">
								<div className="field__label">Giới tính</div>
								<div className="field__wrap">
									{/* option */}
									<input
										className="field__input"
										type="text"
										placeholder="đổi thành option"
										submitted={submitted}
										name="gender"
										value={user.gender}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>
						<div className="login__col">
							<div className="field">
								<div className="field__label">Ngày sinh</div>
								<div className="field__wrap">
									<DatePicker
										className="field__input"
										placeholder="Chọn ngày"
										format="DD/MM/yyyy"
										onChange={(date) => {
											setUser((user) => ({
												...user,
												birthday: date,
											}));
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="field">
						<div className="field__label">Email</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="email"
								placeholder="Nhập email ..."
								submitted={submitted}
								name="email"
								value={user.email}
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
								value={user.password}
								onChange={handleChange}
							/>
						</div>
					</div>
					<button
						className="login__btn btn btn_purple btn_wide"
						type="button"
						onClick={handleRegister}
					>
						Tiếp tục
					</button>
					{/* <div className="login__or">Đăng ký bằng</div>
					<button
						className="login__btn btn btn_blue btn_wide"
						type="button"
					>
						Tài khoản Google
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default Register;
