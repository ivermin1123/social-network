import socketConstants from "../constants/socket.constants";
import SocketClient from "../helpers/SocketClient";
import messageConstants from "../constants/message.constants";

const socketClient = new SocketClient();

function connect() {
	function connectSocket(socket) {
		return { type: socketConstants.CONNECT_SUCCESS, socket };
	}
	return (dispatch) => {
		socketClient.connect().then((socket) => {
			dispatch(connectSocket(socket));
			socket.on("SSC_SEND_MESSAGE", ({ data }) => {
				console.log(data);
				dispatch({
					type: messageConstants.SEND_MESSAGE_SUCCESS,
					payload: { data: data[0] },
				});
			});
		});
	};
}

function disconnect() {
	return () => {
		socketClient.disconnect();
	};
}

export { connect, disconnect };
