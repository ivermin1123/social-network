import React, { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
// import PerfectScrollbar from "react-perfect-scrollbar";

import Message from "./Message/Message";
import Header from "./Message/Header";
import Footer from "./Message/Footer";
import messageActions from "../../actions/message.actions";
import "react-perfect-scrollbar/dist/css/styles.css";

function Messages(props) {
	const { messages, conversationOpen, isConnecting, loadingMessage } = props;
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authentication.user);
	const { socket } = useSelector((state) => state.socket);
	useEffect(() => {
		dispatch(messageActions.getMessages(conversationOpen));
		if (isConnecting) {
			socket.emit("CSS_JOIN", {
				name: `${user.username}`,
				room: conversationOpen,
			});
		}
	}, []);

	if (!isConnecting || loadingMessage) {
		return <h3>Loading...</h3>;
	}

	return (
		<div className="col">
			<div className="col">
				<Header />
				<div className="col-content">
					{/* <PerfectScrollbar> */}
					<ScrollToBottom className="messages-container">
						<div className="grid-message">
							{messages.data.reverse().map((message) => (
								<Message message={message} key={message._id} />
							))}
						</div>
					</ScrollToBottom>
					{/* </PerfectScrollbar> */}
					<Footer />
					<div className="cover-bar" />
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	reload: state.socket.reload,
	conversationOpen: state.conversations.conversationOpen,
	messages: state.messages.messages,
	loadingMessage: state.messages.loadingMessage,
	isConnecting: state.socket.isConnecting,
});

export default connect(mapStateToProps)(Messages);
