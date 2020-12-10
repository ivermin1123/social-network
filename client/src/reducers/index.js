import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { routerReducer } from "react-router-redux";

import authentication from "./authentication.reducer";
import registration from "./registration.reducer";
import users from "./users.reducer";
import conversations from "./conversation.reducer";
import messages from "./messages.reducer";
import alert from "./alert.reducer";
import socket from "./socket.reducer";
import posts from "./posts.reducer";

export default combineReducers({
	routing: routerReducer,
	authentication,
	conversations,
	registration,
	socket,
	messages,
	users,
	alert,
	form,
	posts,
});
