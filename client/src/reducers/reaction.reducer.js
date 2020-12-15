import reactionConstants from "../constants";

const initialState = {};

export default function reactions(state = initialState, action) {
	const { type } = action;
	switch (type) {
		case reactionConstants.LIKE_POST_FAILURE:
			return {
				...state,
			};
		default:
			return state;
	}
}
