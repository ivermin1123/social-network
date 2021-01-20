import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { Result } from "antd";

import Messages from "../components/Message/Messages";
import SideBar from "../components/Message/SideBar";
import messageActions from "../actions/message.actions";
import conversationActions from "../actions/conversation.actions";
import { emit } from "../actions/socket.actions";
import "../assets/styles/_message.scss";

const MessagePage = (props) => {
	const { conversationId } = useParams();
	const { isConnecting } = props;

	const dispatch = useDispatch();
	// const { socket } = useSelector((state) => state.socket);
	const { infoUser } = useSelector((state) => state.users);

	useEffect(() => {
		if (!isConnecting && infoUser) {
			dispatch(conversationActions.getListConversations());
			dispatch(messageActions.getMessages(conversationId));
			dispatch(
				emit("CSS_JOIN", {
					name: `${infoUser.username}`,
					room: conversationId,
				})
			);
			// socket.emit("CSS_JOIN", {
			// 	name: `${infoUser.username}`,
			// 	room: conversationId,
			// });
		}
	}, [dispatch, conversationId, infoUser, isConnecting]);
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

const mapStateToProps = (state) => ({
	isConnecting: state.socket.isConnecting,
});

export default connect(mapStateToProps)(MessagePage);
