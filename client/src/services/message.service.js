import axios from "axios";
import { CF_ROUTE_MESSAGE } from "../config/route";
import configAxios from "../helpers/auth-header";

function getMessages(conversationId) {
	return axios
		.post(
			CF_ROUTE_MESSAGE.GET_MESSAGES,
			{
				conversationId,
				currentPage: 1,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function sendMessage(conversationId, message, type) {
	return axios
		.post(
			CF_ROUTE_MESSAGE.SEND_MESSAGE,
			{
				conversationId,
				message,
				type,
			},
			configAxios
		)
		.then((response) => {
			console.log({ response });
			return response.data;
		});
}

const messageService = {
	getMessages,
	sendMessage,
};

export default messageService;
