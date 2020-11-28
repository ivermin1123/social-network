import { userConstants } from "../constants";
import userService from "../services/user.service";
import alertActions from "./alert.actions";
import { history } from "../helpers";

function login(username, password, from) {
	return (dispatch) => {
		function request(user) {
			return { type: userConstants.LOGIN_REQUEST, user };
		}
		function success(user) {
			return { type: userConstants.LOGIN_SUCCESS, user };
		}
		function failure(error) {
			return { type: userConstants.LOGIN_FAILURE, error };
		}

		dispatch(request({ username }));

		userService.login(username, password).then(
			(user) => {
				dispatch(success(user));
				history.push(from);
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};
}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}

function register(user) {
	return (dispatch) => {
		function request(userR) {
			return { type: userConstants.REGISTER_REQUEST, userR };
		}
		function success(userR) {
			return { type: userConstants.REGISTER_SUCCESS, userR };
		}
		function failure(error) {
			return { type: userConstants.REGISTER_FAILURE, error };
		}

		dispatch(request(user));

		userService.register(user).then(
			(userR) => {
				dispatch(success());
				history.push("/login");
				dispatch(alertActions.success("Registration successful"));
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};
}

const userActions = {
	login,
	logout,
	register,
};

export default userActions;
