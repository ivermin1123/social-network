import conversationConstants from "../constants/conversation.constants";

const initialState = {
	conversation: null,
	conversationOpen: "5fcca9d95cad3811bc177bef",
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
			};
		case conversationConstants.GET_LIST_CONVERSATION_SUCCESS:
			return {
				...state,
				conversations: payload.conversations,
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
		case conversationConstants.SET_CONVERSATION_OPEN:
			return {
				...state,
				conversationOpen: payload.conversationOpen,
			};
		default:
			return state;
	}
}
