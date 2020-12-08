import socketConstants from "../constants/socket.constants";

export default function socket(state = {}, action) {
	switch (action.type) {
		case socketConstants.CONNECT:
			return {
				...state,
				socket: action.socket,
			};

		default:
			return state;
	}
}
