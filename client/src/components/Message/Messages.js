import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";
import Header from "./Message/Header";
import Footer from "./Message/Footer";
import messageActions from "../../actions/message.actions";

function Messages(props) {
	const { messages, conversationOpen } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(messageActions.getMessages(conversationOpen));
	}, [dispatch]);

	return (
		<div className="col">
			<div className="col">
				<Header />
				<div className="col-content">
					<ScrollToBottom>
						<section className="messages">
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
						</section>
					</ScrollToBottom>
					<Footer />
					<div className="cover-bar" />
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	conversationOpen: state.conversations.conversationOpen,
	messages: state.messages.messages,
});

export default connect(mapStateToProps)(Messages);
