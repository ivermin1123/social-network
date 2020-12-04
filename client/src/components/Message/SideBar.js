import React from "react";
import Conversation from "./Conversation/Conversation";

import img3 from "../../assets/image/avatar-3.png";
import img4 from "../../assets/image/avatar-4.png";
import img5 from "../../assets/image/avatar-5.png";

function SideBar() {
	const conversations = [
		{
			name: "Vy",
			avatar: img5,
			text: "Vy: ?",
			status: true,
			active: true,
		},
		{
			name: "Anh Tú",
			avatar: img4,
			text: "Nhi: Haha",
			status: true,
		},
		{
			name: "Hoàng Yến",
			avatar: img3,
			text: "Nyc: OK nhé.",
			status: false,
		},
	];

	return (
		<div className="col-left">
			<div className="col-content">
				<div className="messages">
					{conversations.map((conversation) => (
						<Conversation
							conversation={conversation}
							key={Math.floor(Math.random() * 99999) + 1}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default SideBar;
