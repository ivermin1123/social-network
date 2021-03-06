import { userConstants } from "../constants";

function users(
	state = {
		loadingUser: true,
		loadingUserProfile: true,
		updatingUser: false,
		deleting: false,
		loadingNotify: true,
		infoUser: null,
		notify: null,
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
				sendReqFri: action.payload.data.sendFriReq,
				lastConversation: action.payload.data.lastConversation,
				receiveReqFri: action.payload.data.receiveReqFri,
				loadingUser: false,
			};
		case userConstants.GET_USER_FAILURE:
			return {
				error: action.error,
				loadingUser: false,
			};

		case userConstants.GET_USER_PROFILE_REQUEST:
			return {
				...state,
				loadingUserProfile: true,
			};
		case userConstants.GET_USER_PROFILE_SUCCESS:
			return {
				...state,
				loadingUserProfile: false,
			};
		case userConstants.GET_USER_PROFILE_FAILURE:
			return {
				error: action.error,
				loadingUserProfile: false,
			};
		default:
			return state;
	}
}

export default users;
