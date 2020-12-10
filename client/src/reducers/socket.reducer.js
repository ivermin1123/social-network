import socketConstants from "../constants/socket.constants";

const initialState = {};
export default function socket(state = initialState, action) {
	switch (action.type) {
		case socketConstants.CONNECT:
			return {
				...state,
				isConnecting: true,
			};
		case socketConstants.CONNECT_SUCCESS:
			return {
				...state,
				socket: action.socket,
				isConnecting: true,
				connectError: null,
			};
		case socketConstants.CONNECT_FAIL:
			return {
				...state,
				isConnecting: false,
				connectError: action.error,
			};
		case socketConstants.DISCONNECT:
			return {
				...state,
				isDisconnecting: false,
			};
		case socketConstants.DISCONNECT_SUCCESS:
			return {
				...state,
				isDisconnecting: true,
				disconnectError: null,
			};
		case socketConstants.DISCONNECT_FAIL:
			return {
				...state,
				isDisconnecting: false,
				disconnectError: action.error,
			};
		default:
			return state;
	}
}
