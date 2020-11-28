import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const initialState = {};
const loggerMiddleware = createLogger();

const middleware = [thunk];

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware, loggerMiddleware)
);
