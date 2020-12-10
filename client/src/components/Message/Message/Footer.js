import React, { useState } from "react";
import { useSelector } from "react-redux";

import Smile from "../../../Icons/Smile";
import Picture from "../../../Icons/Picture";

export default function Footer() {
	const [message, setMessage] = useState("");
	const { conversationOpen } = useSelector((state) => state.conversations);
	const { socket } = useSelector((state) => state.socket);
	const { user } = useSelector((state) => state.authentication.user);

	function handleSubmit(e) {
		e.preventDefault();
		socket.emit("CSS_SEND_MESSAGE", {
			message,
			conversationOpen,
			type: 0,
			userId: user._id,
		});
		setMessage("");
	}

	return (
		<div className="col-foot">
			<div className="compose">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="message"
						placeholder="Type a message"
						onChange={(e) => setMessage(e.target.value)}
						value={message}
						required
					/>
				</form>

				<div className="compose-dock">
					<div className="dock">
						<Smile />
						<Picture />
					</div>
				</div>
			</div>
		</div>
	);
}
