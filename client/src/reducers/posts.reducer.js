import postConstants from "../constants/post.constants";

const initialState = {
	loadingPost: true,
	post: null,
	posts: null,
};

export default function posts(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case postConstants.CREATE_POST_SUCCESS:
			return {
				...state,
				posts: {
					...state.posts,
					data: [payload.post, ...state.posts.data],
				},
			};
		case postConstants.CREATE_POST_FAILURE:
			return {
				...state,
			};
		case postConstants.GET_LIST_POST_REQUEST:
			return {
				...state,
				loadingPost: true,
			};
		case postConstants.GET_LIST_POST_SUCCESS:
			return {
				...state,
				posts: payload.posts,
				loadingPost: false,
			};
		case postConstants.GET_LIST_POST_FAILURE:
			return {
				...state,
				loadingPost: false,
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
