import { messageConstants } from "../constants";

export const setMessage = (message) => ({
	type: messageConstants.SET_MESSAGE,
	payload: message,
});

export const clearMessage = () => ({
	type: messageConstants.CLEAR_MESSAGE,
});
