import React from "react";
import sprite from "../../assets/icons/sprite.svg";

const AuthorButton = ({ ...props }) => {
	const { isType } = props;
	return (
		<div className="author__btns">
			{isType === 0 ? (
				<div>
					<button
						type="button"
						className="author__btn btn btn_purple"
					>
						Chỉnh sửa trang cá nhân
					</button>
				</div>
			) : null}
			{isType === -1 ? (
				<div>
					<button
						type="button"
						className="author__btn btn btn_purple"
					>
						Kết bạn
					</button>
					<button
						type="button"
						className="author__btn btn btn_asphalt btn_square"
					>
						<svg className="icon icon-add">
							<use href={`${sprite}#icon-add`} />
						</svg>
					</button>
				</div>
			) : null}
			{isType === 1 ? (
				<div>
					<button
						type="button"
						className="author__btn btn btn_purple"
					>
						Message
					</button>
					<button
						type="button"
						className="author__btn btn btn_asphalt btn_square"
					>
						<svg className="icon icon-profile-check">
							<use href={`${sprite}#icon-profile-check`} />
						</svg>
					</button>
				</div>
			) : null}
		</div>
	);
};

export default AuthorButton;
