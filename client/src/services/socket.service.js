// eslint-disable-next-line import/no-unresolved
import config from "config";
import io from "socket.io-client";

const API_URL = config.apiUrl;
function connect() {
	return new Promise((resolve) => {
		const socket = io(API_URL, {
			query: { token: JSON.parse(localStorage.getItem("user")).token },
		});
		socket.on("connect", () => {
			resolve(socket);
		});
	});
}

const socketService = {
	connect,
};
export default socketService;
