import React from "react";
import { useSelector } from "react-redux";

export default function Message(props) {
	const { message } = props;
	const { sender, content } = message;
	const { user } = useSelector((state) => state.authentication.user);

	const messagePosition =
		sender._id === user._id ? "col-message-sent" : "col-message-received";

	const messagePositionChild =
		sender._id === user._id ? "message-sent" : "message-received";
	return (
		<div className={messagePosition}>
			<div className={messagePositionChild}>
				<p>{content}</p>
			</div>
		</div>
	);
}
