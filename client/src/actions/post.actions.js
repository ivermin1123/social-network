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

const getUserPosts = ({ userId, page }) => (dispatch) => {
	return postService.getUserPosts({ userId, currentPage: page }).then(
		(data) => {
			dispatch({
				type: postConstants.GET_USER_POSTS_SUCCESS,
				payload: { post: data },
			});

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
				type: postConstants.GET_USER_POSTS_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const getListPosts = ({ page }) => (dispatch) => {
	function request() {
		return { type: postConstants.GET_LIST_POST_REQUEST };
	}
	dispatch(request());
	return postService.getPosts({ currentPage: page }).then(
		(data) => {
			dispatch({
				type: postConstants.GET_LIST_POST_SUCCESS,
				payload: { posts: data },
			});

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

const deletePost = ({ userId, postId }) => (dispatch) => {
	return postService.deletePost({ userId, postId }).then(
		(data) => {
			dispatch({
				type: postConstants.DELETE_POST_SUCCESS,
				payload: { postDelete: data.data },
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
				type: postConstants.DELETE_POST_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const editPost = ({ description, postId }) => (dispatch) => {
	return postService.editPost({ description, postId }).then(
		(data) => {
			dispatch({
				type: postConstants.EDIT_POST_SUCCESS,
				payload: { postEdit: data.data },
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
				type: postConstants.EDIT_POST_FAILURE,
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
	getUserPosts,
	deletePost,
	editPost,
};
export default postActions;
