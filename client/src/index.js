import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./helpers/store";
import App from "./App";
import "./assets/styles/app.css";
import "./assets/styles/index.scss";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

const mountPoint = document.getElementById("root");

const renderApp = () => {
	render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
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

	module.hot.accept("./App", () => {
		unmountComponentAtNode(mountPoint);
		reRenderApp();
	});
}

renderApp();
