import React from "react";
import { Link } from "react-router-dom";

const Images = () => {
	return (
		<div className="content-item image">
			<div>
				<h2>Ảnh</h2>
				<Link>Xem tất cả ảnh</Link>
			</div>
		</div>
	);
};

export default Images;
