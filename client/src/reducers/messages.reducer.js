import messageConstants from "../constants/message.constants";

const initialState = {
	message: null,
	messages: null,
};

export default function message(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case messageConstants.GET_LIST_MESSAGE_SUCCESS:
			return {
				...state,
				messages: {
					data: payload.data,
				},
			};
		case messageConstants.GET_LIST_MESSAGE_FAILURE:
			return {
				...state,
				messages: null,
			};
		case messageConstants.SEND_MESSAGE_SUCCESS:
			return {
				...state,
				messages: {
					data: [...state.messages.data, payload.data],
				},
			};
		case messageConstants.SEND_MESSAGE_FAILURE:
			return state;
		default:
			return state;
	}
}
