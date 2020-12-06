/* eslint-disable operator-linebreak */
import { userConstants, alertConstants } from "../constants";
import userService from "../services/user.service";

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
				type: alertConstants.SET_ALERT,
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

const register = (username, email, password) => (dispatch) => {
	return userService.register(username, email, password).then(
		(response) => {
			dispatch({
				type: userConstants.REGISTER_SUCCESS,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: response.data,
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
				type: userConstants.REGISTER_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const userActions = {
	login,
	logout,
	register,
};

export default userActions;
