import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
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
