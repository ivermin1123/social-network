import userConstants from "../constants/user.constants";

function users(
	state = {
		loadingUser: true,
		updatingUser: false,
		deleting: false,
		hasError: false,
		infoUser: null,
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
		case userConstants.GET_USER_REQUEST:
			return {
				loadingUser: true,
			};
		case userConstants.GET_USER_SUCCESS:
			return {
				...state,
				infoUser: action.payload.data,
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
