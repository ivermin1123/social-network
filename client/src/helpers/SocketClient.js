// eslint-disable-next-line import/no-unresolved
import config from "config";
import io from "socket.io-client";

// TODO Move me elsewhere!
const host = config.apiUrl;
const socketPath = "/api/socket.io";

export default class socketAPI {
	socket;

	connect() {
		this.socket = io.connect(host, { path: socketPath });
		return new Promise((resolve, reject) => {
			this.socket.on("connect", () => resolve());
			this.socket.on("connect_error", (error) => reject(error));
		});
	}

	disconnect() {
		return new Promise((resolve) => {
			this.socket.disconnect(() => {
				this.socket = null;
				resolve();
			});
		});
	}

	emit(event, data) {
		return new Promise((resolve, reject) => {
			if (!this.socket) return reject(new Error("No socket connection."));

			return this.socket.emit(event, data, (response) => {
				if (response.error) {
					console.error(response.error);
					return reject(response.error);
				}
				return resolve(response);
			});
		});
	}

	on(event, fun) {
		// No promise is needed here, but let's be consistent.
		return new Promise((resolve, reject) => {
			if (!this.socket) return reject(new Error("No socket connection."));

			this.socket.on(event, fun);
			resolve();
		});
	}
}
