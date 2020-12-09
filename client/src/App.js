import React, { useEffect, Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { clearAlert } from "./actions/alert.actions";
import history from "./helpers/history";
import PrivateRoute from "./components";

const HomePage = lazy(() => import("./pages/HomePage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const MessagePage = lazy(() => import("./pages/MessagePage"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));

const Loading = () => <div className="loading">Loading...</div>;

function App() {
	const alert = useSelector((state) => state.alert);
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
			{alert.message && <div className={`alert `}>{alert.message}</div>}
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
						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
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
