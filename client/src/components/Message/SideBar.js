import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import conversationActions from "../../actions/conversation.actions";
import Conversation from "./Conversation/Conversation";

function SideBar(props) {
	const [searchCon, setSearchCon] = useState("");
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(conversationActions.getListConversations());
	}, [dispatch]);

	const { conversations } = props;
	return (
		<div className="col-left">
			<div className="col-content">
				<div className="messages">
					<li>
						<h1>Chat</h1>
					</li>
					<li>
						<label className="search-label" htmlFor="search">
							<input
								name="search"
								autoComplete="off"
								className="search-conversations"
								placeholder="Tìm kiếm trên Messenger"
								spellCheck="false"
								type="text"
								aria-label="Tìm kiếm trên Messenger"
								onChange={(e) => setSearchCon(e.target.value)}
								value={searchCon}
							/>
						</label>
					</li>
					{conversations
						? conversations.data.map((conversation) => (
								<Conversation
									conversation={conversation}
									key={conversation._id}
								/>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	conversations: state.conversations.conversations,
});

export default connect(mapStateToProps)(SideBar);
