import { combineReducers } from "redux";

import authentication from "./authentication.reducer";
import registration from "./registration.reducer";
import users from "./users.reducer";
import conversations from "./conversation.reducer";
import messages from "./messages.reducer";
import alert from "./alert.reducer";
import { userConstants } from "../constants";
import posts from "./posts.reducer";

const appReducer = combineReducers({
	authentication,
	conversations,
	registration,
	messages,
	users,
	alert,
	posts,
});

const rootReducer = (state, action) => {
	if (action.type === userConstants.LOGOUT) {
		state = undefined;
	}

	return appReducer(state, action);
};

export default rootReducer;
