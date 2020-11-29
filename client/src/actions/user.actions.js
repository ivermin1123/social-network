import { userConstants, messageConstants } from "../constants";
import userService from "../services/user.service";
import { history } from "../helpers/history";

const login = (username, password) => (dispatch) => {
	return userService.login(username, password).then(
		(data) => {
			dispatch({
				type: userConstants.LOGIN_SUCCESS,
				payload: { user: data },
			});

			return Promise.resolve();
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: userConstants.LOGIN_FAILURE,
			});

			dispatch({
				type: messageConstants.SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const logout = () => (dispatch) => {
	userService.logout();

	dispatch({ type: userConstants.LOGOUT });
};

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
				dispatch({
					type: messageConstants.SET_MESSAGE,
					payload: "Registration successful",
				});
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch({
					type: messageConstants.SET_MESSAGE,
					payload: error.toString(),
				});
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
