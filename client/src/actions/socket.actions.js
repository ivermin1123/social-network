import socketConstants from "../constants/socket.constants";
import messageConstants from "../constants/message.constants";

function connect(socket) {
	function connectSocket(socket) {
		return { type: socketConstants.CONNECT, socket };
	}
	return (dispatch) => {
		dispatch(connectSocket(socket));
		socket.on("SSC_SEND_MESSAGE", (data) => {
			console.log("SSC_SEND_MESSAGE", data);
			dispatch({
				type: messageConstants.SEND_MESSAGE_SUCCESS,
				payload: data,
			});
		});
	};
}

export default {
	connect,
};
