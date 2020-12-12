import React from "react";
import ava2 from "../../assets/image/ava-2.png";

function ChatItem(props) {
	const { online, name } = props;

	return (
		<a className={`sidebar__item${online ? " online" : ""}`} href="#/">
			<div className="sidebar__ava">
				<img className="sidebar__pic" src={ava2} alt="avatar" />
			</div>
			<div className="sidebar__text">{name}</div>
		</a>
	);
}

export default ChatItem;
