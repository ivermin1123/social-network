import React, { useEffect, Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
// import { LoadingOutlined } from "@ant-design/icons";
import { clearAlert } from "./actions/alert.actions";
import history from "./helpers/history";
import PrivateRoute from "./components";
import MessageCheck from "./components/MessageCheck";

const Navigation = lazy(() => import("./pages/Navigation"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const MessagePage = lazy(() => import("./pages/MessagePage"));
const FriendRequestPage = lazy(() => import("./pages/FriendRequestPage"));
const _404Page = lazy(() => import("./pages/_404Page"));

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		history.listen(() => {
			dispatch(clearAlert());
		});
	}, []);

	return (
		<>
			<Router history={history}>
				<Suspense fallback={<></>}>
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
							path="/message/:userId"
							component={() => (
								<Navigation>
									<MessageCheck />
								</Navigation>
							)}
						/>
						<PrivateRoute
							exact
							path="/message/t/:conversationId"
							component={() => (
								<Navigation>
									<MessagePage />
								</Navigation>
							)}
						/>
						<PrivateRoute
							exact
							path="/friend-request"
							component={() => (
								<Navigation>
									<FriendRequestPage />
								</Navigation>
							)}
						/>
						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
						<Route path="*" exact component={_404Page} />
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
