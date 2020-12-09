import React, { useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import PerfectScrollbar from "react-perfect-scrollbar";
import queryString from "query-string";

import Message from "./Message/Message";
import Header from "./Message/Header";
import Footer from "./Message/Footer";
import messageActions from "../../actions/message.actions";
import "react-perfect-scrollbar/dist/css/styles.css";

function Messages(props) {
	const { messages, conversationOpen, reload } = props;
	const [loading, setLoading] = useState(reload);
	const dispatch = useDispatch();
	const { socket } = useSelector((state) => state.socket);
	const { user } = useSelector((state) => state.authentication.user);

	useEffect(() => {
		dispatch(messageActions.getMessages(conversationOpen));
		const { name, room } = queryString.parse(location.search);
		console.log({ name, room });

		socket.emit(
			"JOIN",
			{
				name: `${user.username}`,
				room: conversationOpen,
			},
			(error) => {
				if (error) {
					alert(error);
				}
			}
		);
	}, []);

	if (loading) {
		dispatch(messageActions.getMessages(conversationOpen));
		setLoading(false);
	}
	return (
		<div className="col">
			<div className="col">
				<Header />
				<div className="col-content">
					<PerfectScrollbar>
						<ScrollToBottom className="messages-container">
							<div className="grid-message">
								{messages && messages.data.length
									? messages.data.map((message) => (
											<Message
												message={message}
												key={message._id}
											/>
									  ))
									: null}
							</div>
						</ScrollToBottom>
					</PerfectScrollbar>
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
});

export default connect(mapStateToProps)(Messages);
