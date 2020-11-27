import React, { useEffect, Fragment, Suspense, lazy } from "react";
import {
	Redirect,
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import alertActions from "./actions/alert.actions";
import { history } from "./helpers";
import { PrivateRoute } from "./components";

// const HomePage = lazy(() => import("./pages/HomePage"));
// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const RegisterPage = lazy(() => import("./pages/RegisterPage"));

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
function App() {
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();

	useEffect(() => {
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}, [dispatch]);

	return (
		<div className="jumbotron">
			<div className="container">
				<div className="col-md-8 offset-md-2">
					{alert.message && (
						<div className={`alert ${alert.type}`}>
							{alert.message}
						</div>
					)}
					<Router history={history}>
						<Switch>
							<PrivateRoute exact path="/" component={HomePage} />
							<Route path="/login" component={LoginPage} />
							<Route path="/register" component={RegisterPage} />
							<Redirect from="*" to="/" />
						</Switch>
					</Router>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	authentication: state.authentication,
});

const connectedApp = connect(mapStateToProps)(App);

export { connectedApp as default };
