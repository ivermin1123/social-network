import socketConstants from "../constants/socket.constants";
// import messageConstants from "../constants/message.constants";

// export function connect(socket) {
// 	function connectSocket(socket) {
// 		return { type: socketConstants.CONNECT, socket };
// 	}
// 	return (dispatch) => {
// 		dispatch(connectSocket(socket));
// 		socket.on("SSC_SEND_MESSAGE", (data) => {
// 			console.log("SSC_SEND_MESSAGE", data);
// 			dispatch({
// 				type: messageConstants.SEND_MESSAGE_SUCCESS,
// 				payload: data,
// 			});
// 		});
// 	};
// }

export function connect() {
	return {
		type: "socket",
		types: [
			socketConstants.CONNECT,
			socketConstants.CONNECT_SUCCESS,
			socketConstants.CONNECT_FAIL,
		],
		promise: (socket) => socket.connect(),
	};
}

export function disconnect() {
	return {
		type: "socket",
		types: [
			socketConstants.DISCONNECT,
			socketConstants.DISCONNECT_SUCCESS,
			socketConstants.DISCONNECT_FAIL,
		],
		promise: (socket) => socket.disconnect(),
	};
}

export function socketTest({ name, room }) {
	const values = {
		name,
		room,
	};
	return {
		type: "socket",
		types: [null, null, null],
		promise: (socket) => socket.emit("CSS_JOIN", values),
	};
}

export function socketTestMessage({ message, conversationOpen }) {
	const values = {
		message,
		conversationOpen,
	};
	return {
		type: "socket",
		types: [null, null, null],
		promise: (socket) => socket.emit("CSS_SEND_MESSAGE", values),
	};
}
