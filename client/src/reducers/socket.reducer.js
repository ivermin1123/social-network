import socketConstants from "../constants/socket.constants";

const initialState = {};
export default function socket(state = initialState, action) {
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
