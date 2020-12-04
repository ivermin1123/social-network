import { combineReducers } from "redux";

import authentication from "./authentication.reducer";
import registration from "./registration.reducer";
import users from "./users.reducer";
import alert from "./alert.reducer";
import { userConstants } from "../constants";
import posts from "./posts.reducer";

const appReducer = combineReducers({
	authentication,
	registration,
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
