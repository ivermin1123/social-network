import React from "react";

const Cover = ({...props}) => {
	const {acc} = props;
	return (
		<div className="account-header">
			<div className="account-header-top">
				<div className="header-cover">
					<div className="header-cover-image">
						<img src={acc.cover} alt="cover" />
						<button>Chỉnh sửa ảnh bìa</button>
					</div>
				</div>
				<div className="header-profile">
					<div>
						<h1>{acc.displayName}</h1>
						<a>Thêm tiểu sử</a>
					</div>
				</div>
			</div>
			<div className="menu-tab"></div>
		</div>
	);
};

export default Cover;
