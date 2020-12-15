import React from "react";
import { useParams } from "react-router-dom";

import Messages from "../components/Message/Messages";
import NotFound from "../components/Message/NotFound";
import SideBar from "../components/Message/SideBar";
import "../assets/styles/_message.scss";

const MessagePage = () => {
	const { conversationId } = useParams();
	const messages = true;
	return (
		<div className="chat">
			{messages ? (
				<>
					<SideBar />
					<Messages conversationId={conversationId} />
				</>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default MessagePage;
