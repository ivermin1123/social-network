import axios from "axios";
import { CF_ROUTE_POST } from "../config/route";
import configAxios from "../helpers/auth-header";

function getPost(postId) {
	return axios
		.post(
			CF_ROUTE_POST.GET_POST,
			{
				postId,
			},
			configAxios
		)
		.then((response) => {
			console.log(response);
		});
}

function createPost(description, image) {
	const formData = new FormData();

	formData.append("image", image);
	console.log(formData, image);
	return axios
		.post(
			CF_ROUTE_POST.CREATE_POST,
			{
				description,
				image: formData,
			},
			{ ...configAxios, "Content-Type": "multipart/form-data" }
		)
		.then((response) => {
			return response.data;
		});
}

const postService = {
	getPost,
	createPost,
};

export default postService;
