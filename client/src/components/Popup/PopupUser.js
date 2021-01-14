import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, message } from "antd";

import userActions from "../../actions/user.actions";
import { LINK } from "../../constants";
import ava from "../../assets/image/ava-1.png";

const PopupUser = ({ ...props }) => {
	const { show, submitName, infoUser } = props;
	const [user, setUser] = useState({
		firstName: infoUser.firstName,
		lastName: infoUser.lastName,
	});
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((user) => ({ ...user, [name]: value }));
	};

	const handleUpdate = () => {
		console.log("OKOKOKOKO", user);
		dispatch(userActions.updateUserInformation({ body: user }))
			.then(() => {
				message.success("Cập nhật thông tin thành công.");
			})
			.catch(() => {
				message.error("Đã có lỗi xảy ra.");
			});
	};

	return (
		<div style={{ display: show }}>
			<div className="popup__user">
				<div className="popup__title h6 mobile-show">Your Profile</div>
				<div className="popup__category caption-sm">Ảnh đại diện</div>
				<div className="popup__line">
					<div className="popup__ava">
						<Avatar
							size={80}
							className="popup__pic"
							src={
								infoUser.avatar
									? `${LINK.LINK_S3}${infoUser.avatar[0].path}`
									: ava
							}
							alt=""
						/>
					</div>
					<div className="popup__details">
						{/* <div className="popup__btns">
							<div className="popup__loading">
								<input className="popup__file" type="file" />
								<button
									type="button"
									className="popup__btn btn btn_purple"
								>
									Tải ảnh lên
								</button>
							</div>
							<button
								type="button"
								className="popup__btn btn btn_gray"
							>
								Xóa ảnh đại diện
							</button>
						</div> */}
						<div className="popup__text">
							Ảnh đại diện giúp những người bạn quên biết có thể
							nhận ra bạn.
						</div>
					</div>
				</div>
			</div>
			<div className="popup__fieldset">
				<div className="popup__row">
					<div className="popup__field field">
						<div className="field__label">Tên</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="text"
								name="firstName"
								value={user.firstName}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="popup__field field">
						<div className="field__label">Họ</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="text"
								name="lastName"
								value={user.lastName}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
				{/* <div className="popup__row">
					<div className="popup__field field">
						<div className="field__label">Tên hiển thị</div>
						<div className="field__wrap">
							<input className="field__input" type="text" />
						</div>
					</div>
				</div> */}
			</div>
			<button
				className="popup__btn btn btn_purple"
				type="button"
				onClick={handleUpdate}
			>
				{submitName}
			</button>
		</div>
	);
};

export default PopupUser;
