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

function countReaction(postId) {
	return axios
		.post(
			CF_ROUTE_REACTION.COUNT_REACTION,
			{
				postId,
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
};

export default reactionService;
