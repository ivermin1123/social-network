import { notifyConstants, alertConstants } from "../constants";
import { notifyService } from "../services";

const getUserNotify = ({ currentPage }) => (dispatch) => {
	function request() {
		return { type: notifyConstants.GET_USER_NOTIFY_REQUEST };
	}
	dispatch(request());
	return notifyService.getUserNotify({ currentPage }).then(
		(data) => {
			dispatch({
				type: notifyConstants.GET_USER_NOTIFY_SUCCESS,
				payload: { data },
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
				type: notifyConstants.GET_USER_NOTIFY_FAILURE,
			});

			dispatch({
				type: alertConstants.SET_ALERT,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

const notifyActions = {
	getUserNotify,
};
export default notifyActions;
