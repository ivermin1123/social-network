import React from "react";
import { useParams, Link } from "react-router-dom";
import { Result } from "antd";

import Messages from "../components/Message/Messages";
import SideBar from "../components/Message/SideBar";
import "../assets/styles/_message.scss";

const MessagePage = () => {
	const { conversationId } = useParams();
	return (
		<>
			{conversationId === "NotFound" ? (
				<Result
					status="warning"
					title="Bạn chưa có cuộc trò chuyện nào	."
					extra={
						<Link to="/" className="btn btn-primary">
							Trở về trang chủ
						</Link>
					}
				/>
			) : (
				<div className="chat">
					<SideBar />
					<Messages conversationId={conversationId} />
				</div>
			)}
		</>
	);
};

export default MessagePage;
