import React, { useEffect, Fragment, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { clearMessage } from "./actions/message.actions";
import { history } from "./helpers/history";
import { PrivateRoute } from "./components";

import { HomePage, AccountPage, LoginPage, RegisterPage } from "./pages/_pages";
import { Navbar, NavItem, DropdownMenu } from "./components/_components";
import { BellIcon, MessengerIcon, CaretIcon, PlusIcon } from "./Icons/_icon";

function App() {
	const message = useSelector((state) => state.message);
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state) => state.authentication);

	useEffect(() => {
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(clearMessage());
		});
	}, [dispatch]);

	return (
		<div>
			{message.message && (
				<div className={`alert `}>{message.message}</div>
			)}
			<Router history={history}>
				<Suspense fallback={<div>Loading...</div>}>
					<Fragment>
						{isLoggedIn ? (
							<>
								<Navbar>
									<NavItem icon={<PlusIcon />} />
									<NavItem icon={<BellIcon />} />
									<NavItem icon={<MessengerIcon />} />

									<NavItem icon={<CaretIcon />}>
										<DropdownMenu></DropdownMenu>
									</NavItem>
								</Navbar>
							</>
						) : null}
						<div>
							<Switch>
								<PrivateRoute
									exact
									path="/"
									component={HomePage}
								/>
								<PrivateRoute
									exact
									path="/account"
									component={AccountPage}
								/>
								<Route path="/login" component={LoginPage} />
								<Route
									path="/register"
									component={RegisterPage}
								/>
							</Switch>
						</div>
					</Fragment>
				</Suspense>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => ({
	authentication: state.authentication,
});

const connectedApp = connect(mapStateToProps)(App);

export { connectedApp as default };
