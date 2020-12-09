import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, Router } from "react-router-dom";
import { syncHistoryWithStore } from "react-router-redux";

import SocketClient from "./helpers/SocketClient";
import configureStore from "./helpers/store";

import App from "./App";
import "./assets/styles/index.scss";
import "antd/dist/antd.css";

const socketClient = new SocketClient();

const initialState = {};
const store = configureStore(initialState, socketClient);
const history = syncHistoryWithStore(browserHistory, store);

const routes = require("./routes").default;

const mountPoint = document.getElementById("root");

const renderApp = () => {
	render(
		<Provider store={store}>
			<Router history={history}>{routes}</Router>
		</Provider>,
		mountPoint
	);
};

if (module.hot) {
	const reRenderApp = () => {
		try {
			renderApp();
		} catch (error) {
			const RedBox = require("redbox-react").default;

			render(<RedBox error={error} />, mountPoint);
		}
	};

	module.hot.accept("./routes", () => {
		setImmediate(() => {
			// Preventing the hot reloading error from react-router
			unmountComponentAtNode(mountPoint);
			reRenderApp();
		});
	});
}

renderApp();
