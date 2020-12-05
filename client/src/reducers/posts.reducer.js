import postConstants from "../constants/post.constants";

const initialState = {
	post: null,
};

export default function posts(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case postConstants.CREATE_POST_SUCCESS:
			return {
				...state,
				post: payload.post,
			};
		case postConstants.CREATE_POST_FAILURE:
			return {
				...state,
				post: null,
			};
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
