import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

import ava2 from "../../assets/image/ava-2.png";
import LINK_CONSTANT from "../../constants/link.constants";

function Chat() {
	const { infoUser } = useSelector((state) => state.users);

	const ChatItem = (props) => {
		const { user } = props;

		return (
			<Link
				className={`sidebar__item${user.online ? " online" : ""}`}
				to={`/account/${user._id}`}
				alt={`${user.firstName} ${user.lastName}`}
			>
				<div className="sidebar__ava">
					<Avatar
						className="sidebar__pic"
						size={30}
						src={
							user.avatar.length
								? `${LINK_CONSTANT.LINK_S3}${user.avatar[0].path}`
								: ava2
						}
					/>
					{/* <img
						className="sidebar__pic"
						src={
							user.avatar.length
								? `${LINK_CONSTANT.LINK_S3}${user.avatar[0].path}`
								: ava2
						}
						alt="avatar"
					/> */}
				</div>
				<div className="sidebar__text">
					{`${user.firstName} ${user.lastName}`}
				</div>
			</Link>
		);
	};

	return (
		<>
			{infoUser.friends.length ? (
				<div className="sidebar__group">
					<div className="sidebar__caption caption-sm">
						Người liên hệ
					</div>
					<div className="sidebar__list">
						{infoUser &&
							infoUser.friends.map((user) => (
								<ChatItem user={user} key={user._id} />
							))}
					</div>
				</div>
			) : null}
		</>
	);
}

export default Chat;
