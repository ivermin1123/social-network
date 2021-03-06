import postConstants from "../constants/post.constants";

const initialState = {
	loadingPost: true,
	post: null,
	posts: {
		data: [],
	},
	userPosts: null,
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
				// posts: {
				// 	...state.posts,
				// 	data: [...payload.posts.data, ...state.posts.data],
				// },
				loadingPost: false,
			};
		case postConstants.GET_LIST_POST_FAILURE:
			return {
				...state,
				loadingPost: false,
			};
		case postConstants.GETPOST_REQUEST:
			return {
				...state,
				loadingPost: true,
			};
		case postConstants.GETPOST_SUCCESS:
			return {
				...state,
				loadingPost: false,
			};
		case postConstants.GETPOST_FAILURE:
			return {
				...state,
				loadingPost: false,
			};

		case postConstants.GET_USER_POSTS_SUCCESS:
			return {
				...state,
				userPosts: payload.post,
			};
		case postConstants.GET_USER_POSTS_FAILURE:
			return {
				...state,
				userPosts: null,
			};
		case postConstants.DELETE_POST_SUCCESS: {
			const { postDelete } = payload;
			const arrPost = state.posts.data.filter(
				(post) => post._id !== postDelete._id
			);
			return {
				...state,
				posts: {
					...state.posts,
					data: arrPost,
				},
			};
		}
		case postConstants.EDIT_POST_SUCCESS: {
			const { postEdit } = payload;
			const arrPost = state.posts.data.map((post) => {
				if (post._id === postEdit._id) {
					post.description = postEdit.description;
				}
				return post;
			});
			return {
				...state,
				posts: {
					...state.posts,
					data: arrPost,
				},
			};
		}
		default:
			return state;
	}
}
