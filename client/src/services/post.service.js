import config from "config";
import axios from "axios";

const API_URL = config.apiUrl;

let { user } = JSON.parse(localStorage.getItem("user"));

const configAxios = {
	headers: {
		Authorization: user.token,
	},
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
