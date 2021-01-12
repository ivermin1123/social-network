import { toastr } from "react-redux-toastr";

import socketConstants from "../constants/socket.constants";
import SocketClient from "../helpers/SocketClient";
import messageConstants from "../constants/message.constants";

const socketClient = new SocketClient();
const user = JSON.parse(localStorage.getItem("user"));

const toastConfig = {
	position: "top-right",
	timeOut: 2500,
};
function connect() {
	function connectSocket(socket) {
		return { type: socketConstants.CONNECT_SUCCESS, socket };
	}
	return (dispatch) => {
		socketClient.connect().then((socket) => {
			dispatch(connectSocket(socket));
			socket.emit("CSS_LOGIN", { userId: user.user._id });
			socket.on("SSC_SEND_MESSAGE", ({ data }) => {
				dispatch({
					type: messageConstants.SEND_MESSAGE_SUCCESS,
					payload: { data: data[0] },
				});
			});
			socket.on("SSC_LIKE_POST", () => {
				console.log("YES YES YES");
				toastr.light(
					"Thông báo",
					"Có ai đó vừa like bài viết của bạn",
					toastConfig
				);
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
