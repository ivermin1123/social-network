import React, { useEffect, Fragment, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { clearMessage } from "./actions/message.actions";
import { history } from "./helpers/history";
import { PrivateRoute } from "./components";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
function App() {
	const message = useSelector((state) => state.message);
	const dispatch = useDispatch();

	useEffect(() => {
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(clearMessage());
		});
	}, [dispatch]);

	return (
		<div className="jumbotron">
			<div className="container">
				<div className="col-md-8 offset-md-2">
					{message.message && (
						<div className={`alert `}>{message.message}</div>
					)}
					<Router history={history}>
						<Suspense fallback={<div>Loading...</div>}>
							<Fragment>
								<Switch>
									<PrivateRoute
										exact
										path="/"
										component={HomePage}
									/>
									<Route
										path="/login"
										component={LoginPage}
									/>
									<Route
										path="/register"
										component={RegisterPage}
									/>
								</Switch>
							</Fragment>
						</Suspense>
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
