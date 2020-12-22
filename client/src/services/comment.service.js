import axios from "axios";
import { CF_ROUTE_COMMENT } from "../config/route";
import configAxios from "../helpers/auth-header";

function commentOnPost({ postId, parent, content }) {
	return axios
		.post(
			CF_ROUTE_COMMENT.COMMENT_ON_POST,
			{
				postId,
				parent,
				content,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function deleteComment({ postId, commentId }) {
	return axios
		.post(
			CF_ROUTE_COMMENT.DELETE_COMMENT,
			{
				postId,
				commentId,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

const commentService = {
	commentOnPost,
	deleteComment,
};

export default commentService;
