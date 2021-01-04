import axios from "axios";
import { CF_ROUTE_FRIEND_REQUEST } from "../config/route";
import configAxios from "../helpers/auth-header";

function sendRequest({ receiver, sender }) {
	return axios
		.post(
			CF_ROUTE_FRIEND_REQUEST.SEND_REQUEST,
			{
				receiver,
				sender,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function deleteRequest({ receiver, sender }) {
	return axios
		.post(
			CF_ROUTE_FRIEND_REQUEST.SEND_REQUEST,
			{
				receiver,
				sender,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function acceptRequest({ receiver, sender, requestId }) {
	return axios
		.post(
			CF_ROUTE_FRIEND_REQUEST.ACCEPT_REQUEST,
			{
				receiver,
				sender,
				requestId,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

const friendReqService = { sendRequest, acceptRequest, deleteRequest };

export default friendReqService;
