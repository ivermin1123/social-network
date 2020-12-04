import React, { useState } from "react";
import Message from "./Message/Message";
import Header from "./Message/Header";
// import Input from "./Message/Input";

const Messages = () => {
	const [msg, setMsg] = useState("");
	const [messages, setMessages] = useState([
		{
			author: "me",
			text: "Chào em",
		},
		{
			author: "me",
			text: "Anh đứng đây từ chiều",
		},
		{
			author: "other",
			text: "Đứng đứng cái địt mẹ mày",
		},
		{
			author: "other",
			text: "?",
		},
	]);

	const sendMsg = (e) => {
		e.preventDefault();
		const newMessage = {
			author: "me",
			text: msg,
		};
		setMessages((messages) => [...messages, newMessage]);
		setMsg("");
	};

	return (
		<div className="col">
			<div className="col-header">
				<Header />
			</div>
			<div className="col-content">
				<section className="messages">
					<div className="grid-message">
						{messages.map((message) => (
							<Message
								author={message.author}
								text={message.text}
								key={Math.floor(Math.random() * 99999) + 1}
							/>
						))}
					</div>
				</section>
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
			</div>
		</div>
	);
};

export default Messages;
