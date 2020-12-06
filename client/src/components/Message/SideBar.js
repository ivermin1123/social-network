import React from "react";
import Conversation from "./Conversation/Conversation";

import img3 from "../../assets/image/avatar-3.png";
import img4 from "../../assets/image/avatar-4.png";
import img2 from "../../assets/image/avatar-2.png";

function SideBar() {
	const conversations = [
		{
			name: "Vy",
			avatar: img3,
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
			avatar: img2,
			text: "Nyc: OK nhé.",
			status: false,
		},
	];

	return (
		<div className="col-left">
			<div className="col-content">
				<div className="messages">
					<li>
						<h1>Chat</h1>
					</li>
					<li>
						<label className="search-label" htmlFor="search">
							<input
								name="search"
								autoComplete="off"
								className="search-conversations"
								placeholder="Tìm kiếm trên Messenger"
								spellCheck="false"
								type="text"
								aria-label="Tìm kiếm trên Messenger"
								value=""
							/>
						</label>
					</li>
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
