import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import LINK_CONSTANT from "../../constants/link.constants";
import avatar1 from "../../assets/image/ava-1.png";

function ConversationItem(props) {
	const { conversation } = props;
	const { infoUser } = useSelector((state) => state.users);
	const { members, lastMessage } = conversation;

	let conversationName = conversation.name;
	let avatarShow = conversation.logo;
	if (members.length === 2) {
		members.forEach((member) => {
			const { _id, avatar, firstName, lastName } = member;
			if (_id !== infoUser._id) {
				conversationName = `${firstName} ${lastName}`;
				if (avatar.length) {
					avatarShow = avatar;
				}
			}
		});
	}
	// const { _id: id } = conversation;
	return (
		<a
			className="chat__line"
			href={conversation ? `message/${conversation._id}` : "#/"}
		>
			<div className="ava ava_online">
				<img
					className="ava__pic"
					src={
						avatarShow.length
							? `${LINK_CONSTANT.LINK_S3}${avatarShow[0].path}`
							: avatar1
					}
					alt=""
				/>
			</div>
			<div className="chat__details">
				<div className="chat__man">{conversationName}</div>
				<div className="chat__time">
					{lastMessage.content} -{" "}
					{moment(lastMessage.createdAt).locale("vi").fromNow()}
				</div>
			</div>
			{/* <div className="chat__games">
				<div className="chat__ava">
					<img
						className="chat__pic"
						src="img/player-ava-1.png"
						alt=""
					/>
				</div>
				<div className="chat__counter bg-orange">3</div>
			</div> */}
		</a>
	);
}

export default ConversationItem;
