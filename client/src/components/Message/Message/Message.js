import React from "react";

export default function Message(props) {
	const { author, text } = props;

	return (
		<div
			className={
				author === "me" ? "col-message-sent" : "col-message-received"
			}
			key={Math.floor(Math.random() * 99999) + 1}
		>
			<div
				className={
					author === "me" ? "message-sent" : "message-received"
				}
			>
				<p>{text}</p>
			</div>
		</div>
	);
}
