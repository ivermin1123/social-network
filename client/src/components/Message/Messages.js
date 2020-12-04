import React, { useState } from "react";
import Message from "./Message/Message";
import Header from "./Message/Header";
import Footer from "./Message/Footer";
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
		{
			author: "me",
			text: "Ơ này",
		},
		{
			author: "me",
			text: "Từ từ đã chứ",
		},
		{
			author: "other",
			text: "Từ từ?",
		},
		{
			author: "other",
			text: "Có cút không",
		},
		{
			author: "other",
			text: "Hay đợi block",
		},
		{
			author: "me",
			text: "Ok",
		},
		{
			author: "me",
			text: "You win",
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
			<div className="col">
				<Header />
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
					<Footer callback={(sendMsg, setMsg, msg)} />
					<div className="cover-bar" />
				</div>
			</div>
		</div>
	);
};

export default Messages;
