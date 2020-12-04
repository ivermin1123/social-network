import alertConstants from "../constants/alert.constants";

function alert(state = {}, action) {
	const { type, payload } = action;
	switch (type) {
		case alertConstants.SET_ALERT:
			return { alert: payload };
		case alertConstants.CLEAR_ALERT:
			return { alert: "" };
		default:
			return state;
	}
}

export default alert;
