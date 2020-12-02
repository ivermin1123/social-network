import React from "react";
import { Link } from "react-router-dom";
import Theme from "../../constants/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
			<button>Chỉnh sửa chi tiết</button>
			<button>Thêm sở thích</button>
			<button>Chỉnh sửa phần Đáng chú ý</button>
		</div>
	);
};

export default Introduction;
