import conversationConstants from "../constants/conversation.constants";

const initialState = {
	loadingConversation: true,
	conversation: null,
	conversationOpen: {
		id: null,
		name: null,
	},
	conversations: null,
};

export default function conversation(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case conversationConstants.CREATE_CONVERSATION_SUCCESS:
			return {
				...state,
				conversations: {
					...state.conversations,
					data: [payload.conversation, ...state.conversations.data],
				},
			};
		case conversationConstants.CREATE_CONVERSATION_FAILURE:
			return {
				...state,
				loadingConversation: false,
			};
		case conversationConstants.GET_LIST_CONVERSATION_REQUEST:
			return {
				...state,
				loadingConversation: true,
			};
		case conversationConstants.GET_LIST_CONVERSATION_SUCCESS:
			return {
				...state,
				conversations: payload.conversations,
				loadingConversation: false,
			};
		case conversationConstants.GET_LIST_CONVERSATION_FAILURE:
			return {
				...state,
				conversations: null,
			};
		case conversationConstants.GET_CONVERSATION_SUCCESS:
			return {
				...state,
				conversation: payload.conversation,
			};
		case conversationConstants.GET_CONVERSATION_FAILURE:
			return {
				...state,
				conversation: null,
			};
		case conversationConstants.SET_CONVERSATION_OPEN: {
			const { conversation } = payload;
			const newId = conversation.length
				? conversation[0]._id
				: "NotFound";
			const newName = conversation.length
				? conversation[0].name
				: "NotFound";
			return {
				...state,
				conversationOpen: {
					id: newId,
					name: newName,
				},
			};
		}
		default:
			return state;
	}
}
