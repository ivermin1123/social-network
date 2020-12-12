import React, { useEffect, Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { clearAlert } from "./actions/alert.actions";
import history from "./helpers/history";
import PrivateRoute from "./components";

const HomePage = lazy(() => import("./pages/HomePage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const MessagePage = lazy(() => import("./pages/MessagePage"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));

function App() {
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state) => state.authentication);

	useEffect(() => {
		history.listen(() => {
			// clear alert on location change
			dispatch(clearAlert());
		});
	}, []);

	return (
		<>
			<Router history={history}>
				<Suspense fallback={<div>Loading...</div>}>
					{isLoggedIn ? <Navbar /> : null}
					<Switch>
						<PrivateRoute exact path="/" component={HomePage} />
						<PrivateRoute
							exact
							path="/account"
							component={AccountPage}
						/>
						<PrivateRoute
							exact
							path="/message/:conversationId"
							component={MessagePage}
						/>
						<PrivateRoute
							exact
							path="/changepassword"
							component={ChangePassword}
						/>
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
					</Switch>
				</Suspense>
			</Router>
		</>
	);
}

const mapStateToProps = (state) => ({
	authentication: state.authentication,
});

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as default };
