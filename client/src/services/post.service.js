import config from "config";
import axios from "axios";

const API_URL = config.apiUrl;

const postId1 = "5fc60bf6d4021633008e2cb3";

let user = JSON.parse(localStorage.getItem("user"));

const configAxios = {
	headers: {
		Authorization: user.token,
	},
};
console.log(configAxios);

function getPost(postId) {
	return axios
		.post(
			`${API_URL}/api/post/getPost`,
			{
				postId1,
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
