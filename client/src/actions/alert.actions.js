import alertConstants from "../constants/alert.constants";

export const setAlert = (alert) => ({
	type: alertConstants.SET_ALERT,
	payload: alert,
});

export const clearAlert = () => ({
	type: alertConstants.CLEAR_ALERT,
});
