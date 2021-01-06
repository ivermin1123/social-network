import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import conversationActions from "../actions/conversation.actions";

const MessageCheck = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const [conversationId, setConversationId] = useState(null);

	useEffect(() => {
		dispatch(conversationActions.getConversationId({ user: userId })).then(
			(data) => {
				console.log("DAYNE 😛", data);
				setConversationId(data.data._id);
			}
		);
	}, [userId]);
	return conversationId !== null ? (
		<Redirect to={`/message/t/${conversationId}`} />
	) : null;
};

export default MessageCheck;
