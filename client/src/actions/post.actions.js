/* eslint-disable operator-linebreak */
import { postConstants, alertConstants } from "../constants";
import { postService, uploadService } from "../services";

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

const getListPosts = () => (dispatch) => {
	return postService.getPosts().then(
		(data) => {
			dispatch({
				type: postConstants.GET_LIST_POST_SUCCESS,
				payload: { posts: data },
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
				type: postConstants.GET_LIST_POST_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const createPost = (files, data, dataSaveServer) => (dispatch) => {
	console.log(files, data, dataSaveServer);
	return uploadService.UploadFileS3(files, data, dataSaveServer).then(
		(data) => {
			dispatch({
				type: postConstants.CREATE_POST_SUCCESS,
				payload: { post: data.data },
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
				type: postConstants.CREATE_POST_FAILURE,
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
	createPost,
	getListPosts,
};
export default postActions;
