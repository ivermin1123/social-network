/* eslint-disable operator-linebreak */
import {
	userConstants,
	alertConstants,
	conversationConstants,
} from "../constants";
import { userService, uploadService } from "../services";

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
const updateUserImage = (file, data, dataSaveServer) => (dispatch) => {
	return uploadService.UploadFileS3(file, data, dataSaveServer).then(
		(data) => {
			dispatch({
				type: userConstants.UPDATE_IMAGE_SUCCESS,
				payload: { post: data.data },
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
		(res) => {
			dispatch({
				type: userConstants.GET_USER_SUCCESS,
				payload: { data: res.data },
			});

			dispatch({
				type: conversationConstants.SET_CONVERSATION_OPEN,
				payload: { conversation: res.data.lastConversation },
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: res.data,
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
