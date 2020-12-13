import React from "react";

function ConversationItem(props) {
	const { conversation } = props;
	// const { _id: id } = conversation;
	return (
		<a className="chat__line" href={conversation ? `message/` : "#/"}>
			<div className="ava ava_online">
				<img className="ava__pic" src="img/ava-1.png" alt="" />
			</div>
			<div className="chat__details">
				<div className="chat__man">Jesus Brown</div>
				<div className="chat__time">3m ago</div>
			</div>
			<div className="chat__games">
				<div className="chat__ava">
					<img
						className="chat__pic"
						src="img/player-ava-1.png"
						alt=""
					/>
				</div>
				<div className="chat__counter bg-orange">3</div>
			</div>
		</a>
	);
}

export default ConversationItem;
