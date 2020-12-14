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

const reactionService = {
	likePost,
};

export default reactionService;
