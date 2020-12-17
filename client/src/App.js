import React, { useEffect, Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
// import { LoadingOutlined } from "@ant-design/icons";
import { clearAlert } from "./actions/alert.actions";
import history from "./helpers/history";
import PrivateRoute from "./components";

const Navigation = lazy(() => import("./pages/Navigation"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const MessagePage = lazy(() => import("./pages/MessagePage"));

function App() {
	const dispatch = useDispatch();
	// const { isLoggedIn } = useSelector((state) => state.authentication);
	useEffect(() => {
		history.listen(() => {
			// clear alert on location change
			dispatch(clearAlert());
		});
	}, []);

	// const Loading = (
	// 	<LoadingOutlined
	// 		style={{
	// 			fontSize: "50px",
	// 			color: "#08c",
	// 			margin: "auto",
	// 		}}
	// 	/>
	// );
	return (
		<>
			<Router history={history}>
				<Suspense fallback={<></>}>
					{/* {isLoggedIn ? <Navigation /> : null} */}
					<Switch>
						<PrivateRoute
							exact
							path="/"
							component={() => (
								<Navigation>
									<HomePage />
								</Navigation>
							)}
						/>
						<PrivateRoute
							exact
							path="/account/:accountId"
							component={() => (
								<Navigation>
									<AccountPage />
								</Navigation>
							)}
						/>
						<PrivateRoute
							exact
							path="/message/:conversationId"
							component={() => (
								<Navigation>
									<MessagePage />
								</Navigation>
							)}
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
