// eslint-disable-next-line import/no-unresolved
import config from "config";
import axios from "axios";
import authHeader from "../helpers/auth-header";

const API_URL = config.apiUrl;

const author = authHeader();

const configAxios = {
	headers: author,
};

function getPost(postId) {
	return axios
		.post(
			`${API_URL}/api/post/getPost`,
			{
				postId,
			},
			configAxios
		)
		.then((response) => {
			console.log(response);
		});
}

const postService = {
	getPost,
};

export default postService;
