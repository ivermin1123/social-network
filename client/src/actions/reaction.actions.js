/* eslint-disable operator-linebreak */
import { reactionConstants, alertConstants } from "../constants";
import { reactionService } from "../services";

const likePost = (postId, type) => (dispatch) => {
	return reactionService.likePost(postId, type).then(
		(data) => {
			return Promise.resolve(data);
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: reactionConstants.LIKE_POST_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const reactionActions = {
	likePost,
};
export default reactionActions;
