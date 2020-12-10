/* eslint-disable operator-linebreak */
import { conversationConstants, alertConstants } from "../constants";
import { conversationService } from "../services";

const getConversation = (conversationId) => (dispatch) => {
	return conversationService.getConversation(conversationId).then(
		(data) => {
			dispatch({
				type: conversationConstants.GET_CONVERSATION_SUCCESS,
				payload: { conversation: data },
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
				type: conversationConstants.GET_CONVERSATION_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const getListConversations = () => (dispatch) => {
	function request() {
		return { type: conversationConstants.GET_LIST_CONVERSATION_REQUEST };
	}
	dispatch(request());
	return conversationService.getConversations().then(
		(data) => {
			dispatch({
				type: conversationConstants.GET_LIST_CONVERSATION_SUCCESS,
				payload: { conversations: data },
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
				type: conversationConstants.GET_LIST_CONVERSATION_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const createConversation = (files, data, dataSaveServer) => (dispatch) => {
	return conversationService.UploadFileS3(files, data, dataSaveServer).then(
		(data) => {
			dispatch({
				type: conversationConstants.CREATE_CONVERSATION_SUCCESS,
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
				type: conversationConstants.CREATE_CONVERSATION_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const setConversationOpen = (conversationId) => (dispatch) => {
	dispatch({
		type: conversationConstants.SET_CONVERSATION_OPEN,
		payload: { conversationOpen: conversationId },
	});
};

const conversationActions = {
	getConversation,
	createConversation,
	getListConversations,
	setConversationOpen,
};
export default conversationActions;
