import React, { useState } from "react";
import { Modal } from "antd";
import ava from "../../assets/image/ava-1.png";

const Setting = ({ ...props }) => {
	const { visible, handleOk, handleCancel } = props;
	const [popupTag, setPopupTag] = useState(0);
	const popupTags = [
		"Profile",
		"Password",
		"Email",
		"Notification",
		"Settings",
	];
	return (
		<Modal
			className="popup popup_settings"
			wrapClassName="popup__form"
			title="Cài đặt tài khoản"
			visible={visible}
			onOk={handleOk}
			onCancel={handleCancel}
			style={{
				padding: 0,
			}}
			width="630px"
			footer={null}
		>
			<div className="popup__tags">
				{popupTags
					? popupTags.map((item, index) => {
							return (
								<button
									type="button"
									className={`popup__tag ${
										popupTag === index ? "active" : ""
									}`}
									onClick={() => {
										setPopupTag(index);
									}}
								>
									{item}
								</button>
							);
					  })
					: null}
			</div>
			<div className="popup__field field mobile-show">
				<div className="field__wrap">
					<select className="field__select">
						<option>Your Profile</option>
						<option>Password</option>
						<option>Channels</option>
						<option>Apps</option>
						<option>Data Export</option>
					</select>
				</div>
			</div>
			<div className="popup__user">
				<div className="popup__title h6 mobile-show">Your Profile</div>
				<div className="popup__category caption-sm">Your Avatar</div>
				<div className="popup__line">
					<div className="popup__ava">
						<img className="popup__pic" src={ava} alt="" />
					</div>
					<div className="popup__details">
						<div className="popup__btns">
							<div className="popup__loading">
								<input className="popup__file" type="file" />
								<button
									type="button"
									className="popup__btn btn btn_purple"
								>
									Upload New
								</button>
							</div>
							<button
								type="button"
								className="popup__btn btn btn_gray"
							>
								Delete Avatar
							</button>
						</div>
						<div className="popup__text">
							Avatar help your teammates recognize you in Unity.
						</div>
					</div>
				</div>
			</div>
			<div className="popup__fieldset">
				<div className="popup__row">
					<div className="popup__field field">
						<div className="field__label">Your Full Name</div>
						<div className="field__wrap">
							<input className="field__input" type="text" />
						</div>
					</div>
					<div className="popup__field field">
						<div className="field__label">Display Name</div>
						<div className="field__wrap">
							<input className="field__input" type="text" />
						</div>
					</div>
				</div>
			</div>

			<button className="popup__btn btn btn_purple" type="submit">
				Update Profile
			</button>
		</Modal>
	);
};

export default Setting;
