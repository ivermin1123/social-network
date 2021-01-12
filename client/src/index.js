import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReduxToastr from "react-redux-toastr";

import store from "./helpers/store";
import App from "./App";
import "./assets/styles/app.css";
import "./assets/styles/index.scss";
import "antd/dist/antd.css";

const mountPoint = document.getElementById("root");

const renderApp = () => {
	render(
		<Provider store={store}>
			<div>
				<BrowserRouter>
					<App />
				</BrowserRouter>
				<ReduxToastr
					timeOut={4000}
					newestOnTop={false}
					preventDuplicates
					position="top-left"
					getState={(state) => state.toastr} // This is the default
					transitionIn="fadeIn"
					transitionOut="fadeOut"
					progressBar
					closeOnToastrClick
				/>
			</div>
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
