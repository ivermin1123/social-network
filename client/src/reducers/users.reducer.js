import userConstants from "../constants/user.constants";

function users(
	state = {
		loadingUser: true,
		updatingUser: false,
		deleting: false,
		hasError: false,
		infoUser: null,
		lastConversation: null,
	},
	action
) {
	switch (action.type) {
		case userConstants.GETALL_REQUEST:
			return {
				loading: true,
			};
		case userConstants.GETALL_SUCCESS:
			return {
				items: action.users,
			};
		case userConstants.GETALL_FAILURE:
			return {
				error: action.error,
			};
		case userConstants.UPDATE_IMAGE_REQUEST:
			return {
				updatingUser: true,
			};
		case userConstants.UPDATE_IMAGE_SUCCESS:
			return {
				items: action.users,
			};
		case userConstants.UPDATE_IMAGE_FAILURE:
			return {
				error: action.error,
			};
		case userConstants.DELETE_REQUEST:
			// add 'deleting:true' property to user being deleted
			return {
				loadingUser: true,
			};
		case userConstants.GET_USER_SUCCESS:
			return {
				...state,
				infoUser: action.payload.data,
				lastConversation: action.payload.data.lastConversation[0],
				loadingUser: false,
			};
		case userConstants.GET_USER_FAILURE:
			return {
				error: action.error,
				loadingUser: false,
			};
		default:
			return state;
	}
}

export default users;
