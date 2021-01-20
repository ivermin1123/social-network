import React, { useEffect, Suspense, lazy, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { clearAlert } from "./actions/alert.actions";
import history from "./helpers/history";
import PrivateRoute from "./components";
import MessageCheck from "./components/MessageCheck";

const SideBar = lazy(() => import("./components/SideBar/SideBar"));
const Header = lazy(() => import("./components/MainContent/Header"));
const MessagePage = lazy(() => import("./pages/MessagePage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const FriendRequestPage = lazy(() => import("./pages/FriendRequestPage"));
const SinglePostPage = lazy(() => import("./pages/SinglePostPage"));
const _404Page = lazy(() => import("./pages/_404Page"));

function App(props) {
	const dispatch = useDispatch();
	const { authentication } = props;
	const [isOpen, setOpen] = useState(false);

	const handleOpen = () => {
		console.log("TRUURUR");
		setOpen(!isOpen);
	};

	useEffect(() => {
		history.listen(() => {
			dispatch(clearAlert());
		});
	}, [dispatch]);

	return (
		<Router history={history}>
			<Suspense fallback={<h2>Loading...</h2>}>
				<div
					className={`${authentication.isLoggedIn ? "page" : ""}${
						isOpen ? " toggle" : ""
					} `}
				>
					{authentication.isLoggedIn ? (
						<SideBar
							isOpen={isOpen}
							handleOpen={handleOpen}
							user={authentication.user.user}
						/>
					) : null}
					<div
						className={`${
							authentication.isLoggedIn ? "page__wrapper" : ""
						}`}
					>
						{authentication.isLoggedIn ? (
							<Header handleOpen={handleOpen} />
						) : null}
						<Switch>
							<PrivateRoute exact path="/" component={HomePage} />
							<PrivateRoute
								exact
								path="/account/:accountId"
								component={AccountPage}
							/>
							<PrivateRoute
								exact
								path="/post/:postId"
								component={SinglePostPage}
							/>
							<PrivateRoute
								exact
								path="/message/:userId"
								component={MessageCheck}
							/>
							<PrivateRoute
								exact
								path="/message/t/:conversationId"
								component={MessagePage}
							/>
							<PrivateRoute
								exact
								path="/friend-request"
								component={FriendRequestPage}
							/>
							<Route path="/login" component={LoginPage} />
							<Route path="/register" component={RegisterPage} />
							<Route path="*" exact component={_404Page} />
						</Switch>
					</div>
				</div>
			</Suspense>
		</Router>
	);
}

const mapStateToProps = (state) => ({
	authentication: state.authentication,
});

const connectedApp = connect(mapStateToProps, null, null, {
	pure: false,
})(App);

export { connectedApp as default };
