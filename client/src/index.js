import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./helpers/store";
import "./styles/index.scss";

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
		document.getElementById("root")
	);
};

render(App);

if (module.hot) {
	module.hot.accept("./App", () => {
		const newApp = require("./App").default;
		render(newApp);
	});
}
