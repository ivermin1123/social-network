import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Messages from "../components/Message/Messages";
import NotFound from "../components/Message/NotFound";
import SideBar from "../components/Message/SideBar";
import "../assets/styles/_message.scss";

const MessagePage = () => {
	const { conversationId } = useParams();
	const [isExist, setExist] = useState(false);
	const { infoUser } = useSelector((state) => state.users);

	useEffect(() => {
		if (
			infoUser &&
			infoUser.conversations.length &&
			infoUser.conversations.includes(conversationId)
		) {
			setExist(true);
		}
	}, [conversationId]);
	return (
		<div className="chat">
			{isExist ? (
				<>
					<SideBar />
					<Messages conversationId={conversationId} />
				</>
			) : (
				<>
					<SideBar />
					<NotFound />
				</>
			)}
		</div>
	);
};

export default MessagePage;
