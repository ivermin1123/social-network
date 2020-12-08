import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import conversationActions from "../../../actions/conversation.actions";
// import messageActions from "../../../actions/message.actions";
import img5 from "../../../assets/image/avatar-5.png";

function Conversation(props) {
	const { user } = useSelector((state) => state.authentication.user);
	const dispatch = useDispatch();
	const { conversation } = props;
	const { name, lastMessage, status } = conversation;
	const { sender, content, createdAt } = lastMessage;
	const active = true;
	const nameSender =
		sender._id === user._id
			? "Bạn"
			: `${sender.firstName} ${sender.lastName}`;

	function handleClick() {
		dispatch(conversationActions.setConversationOpen(conversation._id));
		// dispatch(messageActions.getMessages(conversation._id));
	}

	return (
		<li className={active ? "active-li" : null}>
			<div
				onClick={handleClick}
				onKeyDown={handleClick}
				role="button"
				tabIndex={0}
			>
				<div className="avatar">
					<div className="avatar-image">
						<div
							className={
								status ? "status online" : "status offline"
							}
						/>
						<img alt="avatar" src={img5} />
					</div>
				</div>
				<span>{name}</span>
				<p>
					{`${nameSender}: ${content} · ${moment(createdAt)
						.locale("vi")
						.calendar()}`}
				</p>
			</div>
		</li>
	);
}

export default Conversation;
