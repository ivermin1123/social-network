/* eslint-disable operator-linebreak */
import { postConstants, alertConstants } from "../constants";
import { postService } from "../services";

const getPost = (postId) => (dispatch) => {
	return postService.getPost(postId).then(
		(data) => {
			dispatch({
				type: postConstants.GETPOST_SUCCESS,
				payload: { post: data },
			});

			return Promise.resolve();
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: postConstants.GETPOST_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};
const postActions = {
	getPost,
};
export default postActions;
