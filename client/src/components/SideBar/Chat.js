import React from "react";
import ChatItem from "./ChatItem";

function Chat() {
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
