// eslint-disable-next-line import/no-unresolved
import config from "config";

const API_URL = config.apiUrl;

const CF_ROUTE_USER = {
	LOGIN: `${API_URL}/api/user/login`,
	REGISTER: `${API_URL}/api/user/signup`,
	GET_USER: `${API_URL}/api/user/getUser`,
};

const CF_ROUTE_POST = {
	GET_POST: `${API_URL}/api/post/getPost`,
};

export { CF_ROUTE_USER, CF_ROUTE_POST };
