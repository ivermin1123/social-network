import React from "react";
import ava2 from "../../assets/image/ava-2.png";

function Chat() {
	const ChatItem = (props) => {
		const { online, name } = props;

		return (
			<a className={`sidebar__item${online ? " online" : ""}`} href="#/">
				<div className="sidebar__ava">
					<img className="sidebar__pic" src={ava2} alt="avatar" />
				</div>
				<div className="sidebar__text">{name}</div>
			</a>
		);
	};

	return (
		<div className="sidebar__group">
			<div className="sidebar__caption caption-sm">Người liên hệ</div>
			<div className="sidebar__list">
				<ChatItem name="Quốc Hoàng" online />
				<ChatItem name="Anh Tú" />
				<ChatItem name="Hoàng Yến" online />
				<ChatItem name="Việt Phi" />
				<ChatItem name="Huấn Rose" />
				<ChatItem name="Sơn Tùng MTP" online />
			</div>
		</div>
	);
}

export default Chat;
