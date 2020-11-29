import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import userActions from "../actions/user.actions";

function RegisterPage(props) {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		gender: 0,
		birthday: "",
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
				<div className="field">
					<p className="label">
						Tên đăng nhập
						<sup> *</sup>
					</p>
					<input
						type="text"
						name="username"
						value={user.username}
						onChange={handleChange}
						className={
							"form-control" +
							(submitted && !user.username ? " is-invalid" : "")
						}
					/>
					{submitted && !user.username && (
						<div className="invalid-feedback">
							Username is required
						</div>
					)}
				</div>
				<div className="row mb-3">
					<div className="col-6">
						<div className="field">
							<p className="label">
								Họ
								<sup> *</sup>
							</p>
							<input
								type="text"
								name="firstName"
								value={user.firstName}
								onChange={handleChange}
								className={
									"form-control" +
									(submitted && !user.firstName
										? " is-invalid"
										: "")
								}
							/>
							{submitted && !user.firstName && (
								<div className="invalid-feedback">
									First Name is required
								</div>
							)}
						</div>
					</div>
					<div className="col-6">
						<div className="field">
							<p className="label">
								Tên
								<sup> *</sup>
							</p>
							<input
								type="text"
								name="lastName"
								value={user.lastName}
								onChange={handleChange}
								className={
									"form-control" +
									(submitted && !user.lastName
										? " is-invalid"
										: "")
								}
							/>
							{submitted && !user.lastName && (
								<div className="invalid-feedback">
									Last Name is required
								</div>
							)}
						</div>
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
						<div className="field">
							<p className="label">
								Ngày sinh
								<sup> *</sup>
							</p>
							<input
								type="text"
								name="birthday"
								value={user.birthday}
								onChange={handleChange}
								className={
									"form-control" +
									(submitted && !user.birthday
										? " is-invalid"
										: "")
								}
							/>
							{submitted && !user.birthday && (
								<div className="invalid-feedback">
									birthday is required
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="row mb-3">
					<div className="col-6">
						<div className="field">
							<p className="label">
								Số điện thoại
								<sup> *</sup>
							</p>
							<input
								type="text"
								name="phone"
								value={user.phone}
								onChange={handleChange}
								className={
									"form-control" +
									(submitted && !user.phone
										? " is-invalid"
										: "")
								}
							/>
							{submitted && !user.phone && (
								<div className="invalid-feedback">
									phone is required
								</div>
							)}
						</div>
					</div>
					<div className="col-6">
						<div className="field">
							<p className="label">
								Email
								<sup> *</sup>
							</p>
							<input
								type="text"
								name="email"
								value={user.email}
								onChange={handleChange}
								className={
									"form-control" +
									(submitted && !user.email
										? " is-invalid"
										: "")
								}
							/>
							{submitted && !user.email && (
								<div className="invalid-feedback">
									email is required
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="field">
					<p className="label">
						Mật khẩu
						<sup> *</sup>
					</p>
					<input
						type="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						className={
							"form-control" +
							(submitted && !user.password ? " is-invalid" : "")
						}
					/>
					{submitted && !user.password && (
						<div className="invalid-feedback">
							password is required
						</div>
					)}
				</div>
				<div className="field">
					<p className="label">
						Nhập lại mật khẩu
						<sup> *</sup>
					</p>
					<input
						type="password"
						name="repeat_password"
						value={user.repeat_password}
						onChange={handleChange}
						className={
							"form-control" +
							(submitted && !user.repeat_password
								? " is-invalid"
								: "")
						}
					/>
					{submitted && !user.repeat_password && (
						<div className="invalid-feedback">
							repeat is required
						</div>
					)}
				</div>
				<div className="form-group">
					<button className="btn-form" type="submit">
						{registering && (
							<span className="spinner-border spinner-border-sm mr-1"></span>
						)}
						Register
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
