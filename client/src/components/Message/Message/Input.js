import React, { useState } from "react";

const Input = (props) => {
	const [msg, setMsg] = useState("");
	const { setMessages } = props;
	const sendMsg = (e) => {
		e.preventDefault();
		const newMessage = {
			author: "me",
			text: msg,
		};
		setMessages((messages) => ({ ...messages, newMessage }));
		setMsg("");
	};
	return (
		<div className="input__form">
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
		</div>
	);
};

export default Input;
