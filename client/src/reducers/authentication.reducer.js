import { userConstants } from "../constants";
import jwtDecode from "jwt-decode";

const initialState = {
	isLoggedIn: false,
	user: null,
};

let user = JSON.parse(localStorage.getItem("user"));

if (user) {
	const decodedToken = jwtDecode(user.user.token);
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem("user");
	} else {
		initialState.user = user;
		initialState.isLoggedIn = true;
	}
}

export function authentication(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: payload.user,
			};
		case userConstants.LOGIN_FAILURE:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		case userConstants.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
}
