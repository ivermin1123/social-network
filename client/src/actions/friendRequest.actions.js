import {
	friendRequestConstants,
	userConstants,
	alertConstants,
} from "../constants";
import { friendReqService } from "../services";

const sendRequest = ({ receiver, sender }) => (dispatch) => {
	return friendReqService.sendRequest({ receiver, sender }).then(
		(data) => {
			dispatch({
				type: friendRequestConstants.SEND_FRIEND_REQ_SUCCESS,
				payload: { data },
			});

			dispatch({
				type: userConstants.GET_USER_SUCCESS,
				payload: { data: data.data },
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
				type: friendRequestConstants.SEND_FRIEND_REQ_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const deleteRequest = ({ receiver, sender, requestId }) => (dispatch) => {
	return friendReqService.deleteRequest({ sender, receiver, requestId }).then(
		(data) => {
			dispatch({
				type: friendRequestConstants.DELETE_FRIEND_REQ_SUCCESS,
				payload: { data },
			});

			dispatch({
				type: userConstants.GET_USER_SUCCESS,
				payload: { data: data.data },
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
				type: friendRequestConstants.DELETE_FRIEND_REQ_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const acceptRequest = ({ receiver, sender, requestId }) => (dispatch) => {
	return friendReqService.acceptRequest({ sender, receiver, requestId }).then(
		(data) => {
			dispatch({
				type: friendRequestConstants.ACCEPT_FRIEND_REQ_SUCCESS,
				payload: { data },
			});

			dispatch({
				type: userConstants.GET_USER_SUCCESS,
				payload: { data: data.data },
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
				type: friendRequestConstants.ACCEPT_FRIEND_REQ_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const friendRequestActions = {
	sendRequest,
	deleteRequest,
	acceptRequest,
};
export default friendRequestActions;
