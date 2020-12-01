import { postConstants } from "../constants";

export function posts(state = {}, action) {
	const { type, payload } = action;
	switch (type) {
		case postConstants.GETPOST_SUCCESS:
			return {
				...state,
				post: payload.post,
			};
		case postConstants.GETPOST_FAILURE:
			return {
				...state,
				post: null,
			};
		default:
			return state;
	}
}
