import { messageConstants } from "../constants";

export function message(state = {}, action) {
	const { type, payload } = action;
	switch (type) {
		case messageConstants.SET_MESSAGE:
			return { message: payload };
		case messageConstants.CLEAR_MESSAGE:
			return { message: "" };
		default:
			return state;
	}
}
