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
	GET_POSTS: `${API_URL}/api/post/getPosts`,
	CREATE_POST: `${API_URL}/api/post/addPost`,
};

const CF_ROUTE_PUBLIC = {
	GENERATE_LINK_S3: `${API_URL}/api/generate-link-upload-s3`,
};

export { CF_ROUTE_USER, CF_ROUTE_POST, CF_ROUTE_PUBLIC };
