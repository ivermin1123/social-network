import React from "react";

const Cover = ({...props}) => {
	const {acc} = props;
	return (
		<div>
			<div className="cover-image"></div>
			<div className="cover-display">
				<div className="cover-display-content">
					<h1>{acc.displayName}</h1>
					<div className="button__add-profile">
						Thêm tiểu sử
					</div>
					<div className="cover-display-add">
						<textarea cols="30" rows="3" placeholder="Mô tả về bạn"></textarea>
						<div></div>
					</div>
				</div>
			</div>
			<div className="cover-menu"></div>
		</div>
		// <div className="">
		// 	<div className="account-header">
		// 		<div className="header-cover">
		// 			<div className="header-cover-image">
		// 				<div className="cover-image">
		// 					<img src={acc.cover} alt="cover" />
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<div className="header-button__change-cover">
		// 			<div>
		// 				<button>Chỉnh sửa ảnh bìa</button>
		// 			</div>
		// 		</div>
		// 		<div className="header-profile">
		// 			<div className="">
		// 				<h1>{acc.displayName}</h1>
		// 				<a>Thêm tiểu sử</a>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<div className="menu-tab"></div>
		// </div>
	);
};

export default Cover;
