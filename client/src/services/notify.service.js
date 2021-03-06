import axios from "axios";
import { CF_ROUTE_NOTIFY } from "../config/route";
import configAxios from "../helpers/auth-header";

function getUserNotify({ currentPage }) {
	return axios
		.post(
			CF_ROUTE_NOTIFY.GET_USER_NOTIFY,
			{
				currentPage,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function seenNotify({ notifyId }) {
	return axios
		.post(
			CF_ROUTE_NOTIFY.SEEN_NOTIFY,
			{
				notifyId,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

const notifyService = {
	getUserNotify,
	seenNotify,
};

export default notifyService;
