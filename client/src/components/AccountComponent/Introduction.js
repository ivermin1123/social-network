import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../constants/Theme";

const Introduction = () => {
	return (
		<div className="content-item introduction">
			<h2>Giới thiệu</h2>
			<div className="account-instagram">
				<FontAwesomeIcon
					className="icon"
					icon={Theme.ICONS.instagram}
				/>

				<Link to="http://www.instagram.com/trhgyen/?hl=vi">
					trhgyen
				</Link>
			</div>
			<button type="button">Chỉnh sửa chi tiết</button>
			<button type="button">Thêm sở thích</button>
			<button type="button">Chỉnh sửa phần Đáng chú ý</button>
		</div>
	);
};

export default Introduction;
