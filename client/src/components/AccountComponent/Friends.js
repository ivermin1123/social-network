import React from "react";
import { Link } from "react-router-dom";

const Friends = ({ ...props }) => {
	const { acc } = props;

	return (
		<div className="content-item friend">
			<div className="content-item-header">
				<h2 className="item-header-title">Bạn bè</h2>
				<Link to="/#">Xem tất cả bạn bè</Link>
			</div>
			<p>{acc.totalFriend} người bạn</p>
			<div className="content-item-main row">
				<div className="item__margin-bottom col-4">bbbb</div>
			</div>
		</div>
	);
};

export default Friends;
