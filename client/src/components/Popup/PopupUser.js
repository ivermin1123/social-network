import React from "react";
import ava from "../../assets/image/ava-1.png";

const PopupUser = ({ ...props }) => {
	const { show } = props;

	return (
		<div style={{ display: show }}>
			<div className="popup__user">
				<div className="popup__title h6 mobile-show">Your Profile</div>
				<div className="popup__category caption-sm">Ảnh đại diện</div>
				<div className="popup__line">
					<div className="popup__ava">
						<img className="popup__pic" src={ava} alt="" />
					</div>
					<div className="popup__details">
						<div className="popup__btns">
							<div className="popup__loading">
								<input
									className="popup__file"
									type="file"
								/>
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
						<div className="field__label">Họ tên</div>
						<div className="field__wrap">
							<input className="field__input" type="text" value={name} />
						</div>
					</div>
					<div className="popup__field field">
						<div className="field__label">Tên hiển thị</div>
						<div className="field__wrap">
							<input className="field__input" type="text" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopupUser;
