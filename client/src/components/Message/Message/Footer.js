import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import messageActions from "../../../actions/message.actions";
import Smile from "../../../Icons/Smile";
import Picture from "../../../Icons/Picture";

export default function Footer() {
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();
	const { conversationOpen } = useSelector((state) => state.conversations);

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(messageActions.sendMessage(conversationOpen, message, 0));
		setMessage("");
	}

	return (
		<div className="col-foot">
			<div className="compose">
				{/* <div className="input__form">
					<form onSubmit={sendMsg}>
						<input
							type="text"
							name=""
							className="input__control"
							placeholder="Write a message..."
							onChange={(e) => setMsg(e.target.value)}
							value={msg}
							required
						/>
					</form>
				</div> */}
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
