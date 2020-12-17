import React, { useState } from "react";
import { useDispatch } from "react-redux";
import userActions from "../../actions/user.actions";

const ChangePassword = ({ show }) => {
	const [pass, setPass] = useState({
		currPassword: "",
		newPassword: "",
		repeat_password: "",
	});
	const dispatch = useDispatch();
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
		if (pass.currPassword && pass.newPassword) {
			if (!reTypePassError) {
				dispatch(
					userActions.changePassword(
						pass.currPassword,
						pass.newPassword
					)
				).catch(() => {
					setSubmitted(false);
				});
			}
		}
	}
	return (
		<div style={{ display: show }}>
			<div>
				<p>Đổi mật khẩu</p>
			</div>
			<form name="form" onSubmit={handleSubmit}>
				<div className="popup__user">
					<div className="field">
						<div className="field__label">Mật khẩu cũ</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="password"
								placeholder="Mật khẩu cũ ..."
								submitted={submitted}
								name="currPassword"
								value={pass.currPassword}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="field" style={{ marginTop: "10px" }}>
						<div className="field__label">Mật khẩu mới</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="password"
								placeholder="Mật khẩu mới ..."
								submitted={submitted}
								name="newPassword"
								value={pass.newPassword}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="field" style={{ marginTop: "10px" }}>
						<div className="field__label">Nhập lại khẩu mới</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="password"
								placeholder="Nhập lại khẩu mới ..."
								submitted={submitted}
								name="repeat_password"
								value={pass.repeat_password}
								onChange={handleRetypePassword}
							/>
						</div>
					</div>
				</div>
				<button className="popup__btn btn btn_purple" type="submit">
					Đổi mật khẩu
				</button>
			</form>
		</div>
	);
};

export default ChangePassword;
