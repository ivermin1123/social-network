import React, { useState } from "react";
import { useSelector } from "react-redux";

function MessageFooter(props) {
	const [message, setMessage] = useState("");
	const { conversationOpen } = props;
	const { socket } = useSelector((state) => state.socket);
	const { infoUser } = useSelector((state) => state.users);
	function handleSubmit(e) {
		e.preventDefault();
		socket.emit("CSS_SEND_MESSAGE", {
			message,
			conversationId: conversationOpen,
			type: 0,
			userId: infoUser._id,
		});
		setMessage("");
	}

	return (
		<div className="editor">
			<div className="editor__wrap">
				<div className="editor__body">
					<div className="editor__field">
						<form onSubmit={handleSubmit}>
							<input
								className="editor__textarea"
								type="text"
								name="message"
								placeholder="Type a message"
								onChange={(e) => setMessage(e.target.value)}
								value={message}
								required
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MessageFooter;
