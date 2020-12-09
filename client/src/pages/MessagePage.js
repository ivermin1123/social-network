import React from "react";
import { useParams } from "react-router-dom";
import Home from "../components/Message/Home";
import "../assets/styles/_message.scss";

const MessagePage = () => {
	const { conversationId } = useParams();
	return <Home conversationId={conversationId} />;
};

export default MessagePage;
