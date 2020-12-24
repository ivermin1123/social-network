import { commentConstants, alertConstants } from "../constants";
import { commentService } from "../services";

const commentOnPost = ({ postId, parent, content }) => (dispatch) => {
	return commentService.commentOnPost({ postId, parent, content }).then(
		(data) => {
			dispatch({
				type: commentConstants.COMMENT_ON_POST_SUCCESS,
				payload: { comment: data.data },
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
				type: commentConstants.COMMENT_ON_POST_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const deleteComment = ({ postId, commentId }) => (dispatch) => {
	return commentService.deleteComment({ postId, commentId }).then(
		(data) => {
			dispatch({
				type: commentConstants.DELETE_COMMENT_SUCCESS,
				payload: { post: data },
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
				type: commentConstants.DELETE_COMMENT_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const getCommentsByPost = ({ postId }) => (dispatch) => {
	function request() {
		return { type: commentConstants.GET_COMMENTS_BY_POST_REQUEST };
	}
	dispatch(request());
	return commentService.getCommentsByPost({ postId }).then(
		(data) => {
			dispatch({
				type: commentConstants.GET_COMMENTS_BY_POST_SUCCESS,
				payload: { comments: data.data },
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
				type: commentConstants.GET_COMMENTS_BY_POST_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const commentActions = {
	commentOnPost,
	deleteComment,
	getCommentsByPost,
};
export default commentActions;
