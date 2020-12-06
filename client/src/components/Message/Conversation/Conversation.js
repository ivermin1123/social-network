import React from "react";

function Conversation(props) {
	const { conversation } = props;
	const { name, avatar, text, status, active } = conversation;
	return (
		<li className={active ? "active-li" : null}>
			<div className="avatar">
				<div className="avatar-image">
					<div
						className={status ? "status online" : "status offline"}
					/>
					<img alt="avatar" src={avatar} />
				</div>
			</div>
			<span>{name}</span>
			<p>{text}</p>
		</li>
	);
}

export default Conversation;
