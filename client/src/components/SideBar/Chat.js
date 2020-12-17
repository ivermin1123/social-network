import React from "react";
import { useSelector } from "react-redux";
import ava2 from "../../assets/image/ava-2.png";
import LINK_CONSTANT from "../../constants/link.constants";

function Chat() {
	const { infoUser } = useSelector((state) => state.users);

	const ChatItem = (props) => {
		const { user } = props;

		return (
			<a
				className={`sidebar__item${user.online ? " online" : ""}`}
				href="#/"
				alt={`${user.firstName} ${user.lastName}`}
			>
				<div className="sidebar__ava">
					<img
						className="sidebar__pic"
						src={
							user.avatar.length
								? `${LINK_CONSTANT.LINK_S3}${user.avatar[0].path}`
								: ava2
						}
						alt="avatar"
					/>
				</div>
				<div className="sidebar__text">
					{`${user.firstName} ${user.lastName}`}
				</div>
			</a>
		);
	};

	return (
		<div className="sidebar__group">
			<div className="sidebar__caption caption-sm">Người liên hệ</div>
			<div className="sidebar__list">
				{infoUser &&
					infoUser.friends.map((user) => (
						<ChatItem user={user} key={user._id} />
					))}
			</div>
		</div>
	);
}

export default Chat;
