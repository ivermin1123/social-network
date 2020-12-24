import axios from "axios";
import { CF_ROUTE_REACTION } from "../config/route";
import configAxios from "../helpers/auth-header";

function likePost(postId, type) {
	return axios
		.post(
			CF_ROUTE_REACTION.LIKE_POST,
			{
				postId,
				type,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function likeComment({ postId, commentId, type }) {
	return axios
		.post(
			CF_ROUTE_REACTION.LIKE_COMMENT,
			{
				postId,
				commentId,
				type,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function countReaction({ typeId, typeReact }) {
	return axios
		.post(
			CF_ROUTE_REACTION.COUNT_REACTION,
			{
				typeId,
				typeReact,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

const reactionService = {
	likePost,
	countReaction,
	likeComment,
};

export default reactionService;
