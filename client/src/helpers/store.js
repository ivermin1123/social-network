import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";

import socketMiddleware from "../middleware/socketMiddleware";
import reducer from "../reducers";

const nextRootReducer = require("../reducers").default;

export default function configureStore(initialState, socketClient) {
	// Create middleware
	const loggerMiddleware = createLogger();
	const middleware = [
		thunkMiddleware,
		socketMiddleware(socketClient),
		loggerMiddleware,
	];

	const store = createStore(
		reducer,
		initialState,
		applyMiddleware(...middleware)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("./modules/reducer", () => {
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
