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

const changePassword = (password, newPassword) => (dispatch) => {
	return userService.changePassword(password, newPassword).then(
		(data) => {
			dispatch({
				type: alertConstants.SET_ALERT,
				payload: data,
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
				type: userConstants.CHANGE_PASSWORD_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};
const updateUserImage = (avatar) => (dispatch) => {
	return userService.updateUserImage(avatar).then(
		(data) => {
			dispatch({
				type: alertConstants.SET_ALERT,
				payload: data,
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
				type: userConstants.CHANGE_PASSWORD_FAILURE,
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

const getUser = (userId) => (dispatch) => {
	function request() {
		return { type: userConstants.GET_USER_REQUEST };
	}
	dispatch(request());
	return userService.getUserData(userId).then(
		(data) => {
			dispatch({
				type: userConstants.GET_USER_SUCCESS,
				payload: { data },
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: data.data,
			});
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: userConstants.GET_USER_FAILURE,
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
	changePassword,
	updateUserImage,
	getUser,
};

export default userActions;
