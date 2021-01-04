// eslint-disable-next-line import/no-unresolved
import config from "config";

const API_URL = config.apiUrl;

const CF_ROUTE_USER = {
	LOGIN: `${API_URL}/api/user/login`,
	REGISTER: `${API_URL}/api/user/signup`,
	GET_USER: `${API_URL}/api/user/getUser`,
	UPDATE_USER_IMAGE: `${API_URL}/api/user/updateUserImage`,
	CHANGE_PASSWORD: `${API_URL}/api/user/changePassword`,
};

const CF_ROUTE_POST = {
	GET_POST: `${API_URL}/api/post/getPost`,
	GET_POSTS: `${API_URL}/api/post/getPosts`,
	CREATE_POST: `${API_URL}/api/post/addPost`,
	GET_USER_POSTS: `${API_URL}/api/post/getUserPosts`,
	DELETE_POST: `${API_URL}/api/post/deletePost`,
	EDIT_POST: `${API_URL}/api/post/editPost`,
};

const CF_ROUTE_CONVERSATION = {
	GET_CONVERSATION: `${API_URL}/api/conversation/getConversation`,
	GET_CONVERSATIONS: `${API_URL}/api/conversation/getConversations`,
	CREATE_CONVERSATION: `${API_URL}/api/conversation/addConversation`,
};

const CF_ROUTE_MESSAGE = {
	GET_MESSAGES: `${API_URL}/api/message/getMessages`,
	SEND_MESSAGE: `${API_URL}/api/message/sendMessage`,
};

const CF_ROUTE_REACTION = {
	LIKE_POST: `${API_URL}/api/reaction/likePost`,
	LIKE_COMMENT: `${API_URL}/api/reaction/likeComment`,
	COUNT_REACTION: `${API_URL}/api/reaction/countReaction`,
};

const CF_ROUTE_COMMENT = {
	GET_COMMENTS_BY_POST: `${API_URL}/api/comment/getCommentsByPost`,
	COMMENT_ON_POST: `${API_URL}/api/comment/commentOnPost`,
	DELETE_COMMENT: `${API_URL}/api/comment/deleteComment`,
};

const CF_ROUTE_FRIEND_REQUEST = {
	SEND_REQUEST: `${API_URL}/api/friend-request/sendFriendRequest`,
	ACCEPT_REQUEST: `${API_URL}/api/friend-request/acceptFriendRequest`,
	UNFRIEND: `${API_URL}/api/friend-request/unfriend`,
};

const CF_ROUTE_PUBLIC = {
	GENERATE_LINK_S3: `${API_URL}/api/generate-link-upload-s3`,
};

export {
	CF_ROUTE_USER,
	CF_ROUTE_POST,
	CF_ROUTE_PUBLIC,
	CF_ROUTE_CONVERSATION,
	CF_ROUTE_MESSAGE,
	CF_ROUTE_REACTION,
	CF_ROUTE_COMMENT,
	CF_ROUTE_FRIEND_REQUEST,
};
