import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { FormField } from "../components/_components";
import userActions from "../actions/user.actions";
import "../assets/styles/_form.scss";

function RegisterPage(props) {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		gender: 0,
		birthday: new Date(),
		phone: "",
		email: "",
		repeat_password: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [reTypePassError, setReTypePassError] = useState(false);
	const registering = useSelector((state) => state.registration.registering);
	const { isLoggedIn } = useSelector((state) => state.authentication);
	const dispatch = useDispatch();

	function handleChange(e) {
		const { name, value } = e.target;
		setUser((user) => ({ ...user, [name]: value }));
	}

	function handleRetypePassword(event) {
		const { name, value } = event.target;
		if (value !== user.password) {
			setReTypePassError(true);
		} else {
			setReTypePassError(false);
		}
		setUser((user) => ({ ...user, [name]: value }));
	}

	function handleSubmit(e) {
		try {
			e.preventDefault();

			setSubmitted(true);
			if (!reTypePassError) {
				dispatch(userActions.register(user))
					.then(() => {
						props.history.push({ pathname: "/" });
						window.location.reload();
					})
					.catch(() => {
						setSubmitted(false);
					});
			}
		} catch (error) {
			console.log(error);
		}
	}

	if (isLoggedIn) {
		return <Redirect to="/" />;
	}

	return (
		<div className="register">
			<form className="content" name="form" onSubmit={handleSubmit}>
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
					value={user.username}
					onChange={handleChange}
				/>
				<div className="row mb-3">
					<div className="col-6">
						<FormField
							label="Họ"
							submitted={submitted}
							type="text"
							name="firstName"
							value={user.firstName}
							onChange={handleChange}
						/>
					</div>
					<div className="col-6">
						<FormField
							label="Tên"
							submitted={submitted}
							type="text"
							name="lastName"
							value={user.lastName}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="row mb-3">
					<div className="col-6">
						<p className="label">
							Giới tính <sup>*</sup>
						</p>
						<select
							className="field"
							name="gender"
							onChange={handleChange}
						>
							<option value="0">Nam</option>
							<option value="1">Nữ</option>
						</select>
					</div>
					<div className="col-6">
						<p className="label">
							Ngày sinh
							<sup> *</sup>
						</p>
						<DatePicker
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

				<div className="row mb-3">
					<div className="col-6">
						<FormField
							label="Số điện thoại"
							submitted={submitted}
							type="text"
							name="phone"
							value={user.phone}
							onChange={handleChange}
						/>
					</div>
					<div className="col-6">
						<FormField
							label="Email"
							submitted={submitted}
							type="text"
							name="email"
							value={user.email}
							onChange={handleChange}
						/>
					</div>
				</div>

				<FormField
					label="Mật khẩu"
					submitted={submitted}
					type="password"
					name="password"
					value={user.password}
					onChange={handleChange}
				/>
				<FormField
					label="Nhập lại mật khẩu"
					submitted={submitted}
					type="password"
					name="repeat_password"
					value={user.repeat_password}
					onChange={handleRetypePassword}
				/>
				<div className="row form__button">
					<div className="col-6">
						<button type="submit">
							{registering && (
								<span className="spinner-border spinner-border-sm mr-1" />
							)}
							ĐĂNG KÝ
						</button>
					</div>
					<div className="col-6">
						<Link to="/login" className="btn">
							HỦY
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default RegisterPage;
