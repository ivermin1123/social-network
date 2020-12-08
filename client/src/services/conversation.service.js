import axios from "axios";
import { CF_ROUTE_CONVERSATION } from "../config/route";
import configAxios from "../helpers/auth-header";

function getConversation(conversationId) {
	return axios
		.post(
			CF_ROUTE_CONVERSATION.GET_CONVERSATION,
			{
				conversationId,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function getConversations() {
	return axios
		.get(CF_ROUTE_CONVERSATION.GET_CONVERSATIONS, {
			headers: configAxios.headers,
		})
		.then((response) => {
			return response.data;
		});
}

const conversationService = {
	getConversation,
	getConversations,
};

export default conversationService;
