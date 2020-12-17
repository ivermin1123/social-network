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
			return response.data;
		});
}

function getPosts() {
	return axios
		.get(CF_ROUTE_POST.GET_POSTS, { headers: configAxios.headers })
		.then((response) => {
			return response.data;
		});
}

function getUserPosts(userId) {
	return axios
		.get(
			CF_ROUTE_POST.GET_USER_POSTS,
			{
				userId,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

const postService = {
	getPost,
	getPosts,
	getUserPosts,
};

export default postService;
