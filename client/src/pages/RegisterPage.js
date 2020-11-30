import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Field from "../components/Field";
import userActions from "../actions/user.actions";
import "../scss/_form.scss";

function RegisterPage() {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		gender: "",
		birthday: "",
		phone: "",
		email: "",
		repeat: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const registering = useSelector((state) => state.registration.registering);
	const dispatch = useDispatch();

	// reset login status
	useEffect(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

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
			user.repeat
		)
			if (user.password === user.repeat) {
				dispatch(userActions.register(user));
			}
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
							label="Họ"
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
						<select className="field" name="gender">
							<option value="male">Nam</option>
							<option value="female">Nữ</option>
						</select>
					</div>
					<div className="col-6">
						<Field
							label="Ngày sinh"
							submitted={submitted}
							type="text"
							name="birthday"
							value={user.birthday}
							onChange={handleChange}
						/>
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
					<button className="btn-form">
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
