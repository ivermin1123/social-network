import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Field from "../components/Field";
import userActions from "../actions/user.actions";
import "../scss/_form.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
	const registering = useSelector((state) => state.registration.registering);
	const { isLoggedIn } = useSelector((state) => state.authentication);
	const dispatch = useDispatch();

	function handleChange(e) {
		const { name, value } = e.target;
		setUser((user) => ({ ...user, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();

		setSubmitted(true);
		if (
			user.firstName &&
			user.lastName &&
			user.username &&
			user.password &&
			user.gender &&
			user.phone &&
			user.birthday &&
			user.email &&
			user.repeat_password
		)
			if (user.password === user.repeat_password) {
				console.log(true);
				dispatch(userActions.register(user))
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
		<div className="register">
			<form className="content" name="form" onSubmit={handleSubmit}>
				<div className="logo field">
					<h3>LOGO</h3>
				</div>
				<Field
					label="Tên đăng nhập"
					submitted={submitted}
					type="text"
					name="username"
					value={user.username}
					onChange={handleChange}
				/>
				<div className="row mb-3">
					<div className="col-6">
						<Field
							label="Họ"
							submitted={submitted}
							type="text"
							name="firstName"
							value={user.firstName}
							onChange={handleChange}
						/>
					</div>
					<div className="col-6">
						<Field
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
						{/* <Field
							label="Ngày sinh"
							submitted={submitted}
							type="text"
							name="birthday"
							value={user.birthday}
							onChange={handleChange}
						/> */}
						<p className="label">
							Ngày sinh
							<sup> *</sup>
						</p>
						<div>
							<DatePicker
								selected={user.birthday}
								dateFormat='dd/MM/yyyy'
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
				<div className="row mb-3">
					<div className="col-6">
						<Field
							label="Số điện thoại"
							submitted={submitted}
							type="text"
							name="phone"
							value={user.phone}
							onChange={handleChange}
						/>
					</div>
					<div className="col-6">
						<Field
							label="Email"
							submitted={submitted}
							type="text"
							name="email"
							value={user.email}
							onChange={handleChange}
						/>
					</div>
				</div>
				<Field
					label="Mật khẩu"
					submitted={submitted}
					type="password"
					name="password"
					value={user.password}
					onChange={handleChange}
				/>
				<Field
					label="Nhập lại mật khẩu"
					submitted={submitted}
					type="password"
					name="repeat"
					value={user.repeat}
					onChange={handleChange}
				/>
				<div className="form-group">
					<button className="btn-form" type="submit">
						{registering && (
							<span className="spinner-border spinner-border-sm mr-1"></span>
						)}
						ĐĂNG KÝ
					</button>
					<Link to="/login" className="btn btn-link">
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}

export { RegisterPage };
