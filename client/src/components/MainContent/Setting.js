import React, { useState } from "react";
import { Modal } from "antd";
import { PopupUser, ChangePassword } from "../_components";

const Setting = ({ ...props }) => {
	const { infoUser, visible, handleOk, handleCancel } = props;
	const [popupTag, setPopupTag] = useState("profile");
	const popupTags = [
		{ title: "profile", name: "Thông tin cá nhân" },
		{ title: "password", name: "Đổi mật khẩu" },
		// { title: "email", name: "Email" },
		// { title: "notification", name: "Thông báo" },
		// { title: "settings", name: "Cài đặt" },
	];
	return (
		<Modal
			className="popup popup_settings"
			wrapClassName="popup__form"
			title="Cài đặt tài khoản"
			visible={visible}
			getContainer={false}
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
					? popupTags.map((item) => {
							return (
								<button
									type="button"
									className={`popup__tag ${
										popupTag === item.title ? "active" : ""
									}`}
									onClick={() => {
										setPopupTag(item.title);
									}}
									key={item.title}
								>
									{item.name}
								</button>
							);
					  })
					: null}
			</div>
			<div className="popup__field field mobile-show">
				<div className="field__wrap">
					<select
						className="field__select"
						onChange={(e) => {
							setPopupTag(e.target.value);
						}}
					>
						{popupTags
							? popupTags.map((item) => {
									return (
										<option
											value={item.title}
											key={item.title}
										>
											{item.name}
										</option>
									);
							  })
							: null}
					</select>
				</div>
			</div>

			<PopupUser
				infoUser={infoUser}
				show={popupTag === "profile" ? "block" : "none"}
				submitName="Cập nhật"
			/>
			<ChangePassword
				infoUser={infoUser}
				show={popupTag === "password" ? "block" : "none"}
				submitName="Đổi mật khẩu"
			/>
		</Modal>
	);
};

export default Setting;
