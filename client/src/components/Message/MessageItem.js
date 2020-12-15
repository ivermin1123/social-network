import React from "react";
import moment from "moment";

import { Tooltip } from "antd";
import ButtonSVG from "../ButtonSVG";
import avatar1 from "../../assets/image/ava-1.png";

function MessageItem(props) {
	const { message, listMessage, isRight, fullName } = props;

	const MessageAction = () => {
		return (
			<div className="messages__actions">
				{/* <div className="messages__time">🔥 {time}</div> */}
				<ButtonSVG classN="messages__action" icon="icon-smile" />
				<ButtonSVG classN="messages__action" icon="icon-bookmarks" />
				<ButtonSVG classN="messages__action" icon="icon-menu" />
			</div>
		);
	};

	return (
		<div className={`messages__item${isRight ? "_right" : ""}`}>
			{isRight ? null : (
				<div className="messages__ava">
					<img className="messages__pic" src={avatar1} alt="" />
				</div>
			)}
			<div className="messages__details">
				<div className="messages__head">
					<div className="messages__man">{fullName}</div>
					{/* <div className="messages__time">🔥 3m ago</div> */}
				</div>
				<div className="messages__body">
					{listMessage ? (
						listMessage.map((message) => (
							<Tooltip
								title={moment(message.createdAt)
									.locale("vi")
									.fromNow()}
								placement={isRight ? "right" : "left"}
							>
								<div
									className={`messages__text${
										isRight ? "_right" : ""
									}`}
									key={message._id}
								>
									{message.content}
									<MessageAction />
								</div>
							</Tooltip>
						))
					) : (
						<Tooltip
							title={moment(message.createdAt)
								.locale("vi")
								.fromNow()}
							placement={isRight ? "right" : "left"}
						>
							<div
								className={`messages__text${
									isRight ? "_right" : ""
								}`}
							>
								{message.content}
								<MessageAction />
							</div>
						</Tooltip>
					)}
				</div>
			</div>
			{isRight ? (
				<div className="messages__ava">
					<img className="messages__pic" src={avatar1} alt="" />
				</div>
			) : null}
		</div>
	);
}

export default MessageItem;
