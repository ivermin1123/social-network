import { messageConstants, alertConstants } from "../constants";
import { messageService } from "../services";

const getMessages = (conversationId) => (dispatch) => {
	function request() {
		return { type: messageConstants.GET_LIST_MESSAGE_REQUEST };
	}
	dispatch(request());
	return messageService.getMessages(conversationId).then(
		(data) => {
			console.log("MESSAGE 🚕", { data });
			dispatch({
				type: messageConstants.GET_LIST_MESSAGE_SUCCESS,
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
				type: messageConstants.GET_LIST_MESSAGE_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const sendMessage = (conversationId, message, type) => (dispatch) => {
	return messageService.sendMessage(conversationId, message, type).then(
		(data) => {
			dispatch({
				type: messageConstants.SEND_MESSAGE_SUCCESS,
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
				type: messageConstants.SEND_MESSAGE_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const messageActions = {
	getMessages,
	sendMessage,
};

export default messageActions;
