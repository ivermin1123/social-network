import React, { useState } from "react";

import "./ChatBar.scss";
import img2 from "../../assets/image/avatar-2.png";
import img3 from "../../assets/image/avatar-3.png";
import img4 from "../../assets/image/avatar-4.png";
import img5 from "../../assets/image/avatar-5.png";

function ChatBar(props) {
	const [state] = useState([
		{ id: 1, image: img5, name: "Hành" },
		{ id: 2, image: img4, name: "Sự" },
		{ id: 3, image: img3, name: "Tại" },
		{ id: 4, image: img2, name: "Nhân" },
		{ id: 5, image: img4, name: "Thành" },
		{ id: 6, image: img2, name: "Sự" },
		{ id: 7, image: img4, name: "Tại" },
		{ id: 8, image: img5, name: "Thiên" },
	]);
	const openChat = (user) => {
		props.openChat(user);
	};
	return (
		<div className="chatBar">
			<div className="chatBar__title">
				<span>Người liên hệ</span>
			</div>
			{state.map((user) => (
				<div
					role="button"
					tabIndex={0}
					className="chatBar__list"
					key={user.id}
					onClick={() => openChat(user)}
					onKeyDown={() => openChat(user)}
				>
					<div className="chatBar__list-img">
						<img src={user.image} alt="user" />
						<span className="status" />
					</div>
					<div className="chatBar__list-name">{user.name}</div>
				</div>
			))}
		</div>
	);
}

export default ChatBar;
