import commentConstants from "../constants/comment.constants";

const initialState = {
	loadingComment: true,
	error: false,
};

export default function comments(state = initialState, action) {
	const { type } = action;
	switch (type) {
		case commentConstants.GET_COMMENTS_BY_POST_REQUEST:
			return {
				loadingComment: true,
			};
		case commentConstants.GET_COMMENTS_BY_POST_SUCCESS:
			return {
				loadingComment: false,
			};
		case commentConstants.GET_COMMENTS_BY_POST_FAILURE:
			return {
				loadingComment: false,
				error: true,
			};
		default:
			return state;
	}
}
