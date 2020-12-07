import React from "react";
import { Link } from "react-router-dom";

const Images = ({ ...props }) => {
	const { acc } = props;
	const { user } = props;

	return (
		<div className="content-item image">
			<div className="content-item-header">
				<h2 className="item-header-title">Ảnh</h2>
				<Link to="/#">Xem tất cả ảnh</Link>
			</div>
			<div className="content-item-main grid-container">
				{acc.listImage
					? acc.listImage.map((item) => {
							return (
								<div className="item__margin-bottom grid-item">
									<div className="item__margin-right">
										<a href="/#" className="">
											<img
												src={item}
												alt="images"
												width="100%"
												height="100%"
											/>
										</a>
									</div>
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
};

export default Images;
