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

const likeComment = ({ postId, commentId, type }) => (dispatch) => {
	return reactionService.likeComment({ postId, commentId, type }).then(
		(data) => {
			return Promise.resolve(data.data);
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: reactionConstants.LIKE_COMMENT_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const countReaction = ({ typeId, typeReact }) => (dispatch) => {
	return reactionService.countReaction({ typeId, typeReact }).then(
		(data) => {
			dispatch({
				type: reactionConstants.COUNT_REACTION_SUCCESS,
				payload: data.data,
			});

			return Promise.resolve(data.data);
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: reactionConstants.COUNT_REACTION_FAILURE,
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
	likeComment,
	countReaction,
};
export default reactionActions;
