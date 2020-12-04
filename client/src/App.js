import React, { useEffect, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { clearAlert } from "./actions/alert.actions";
import history from "./helpers/history";
import PrivateRoute from "./components";

import { HomePage, AccountPage, LoginPage, RegisterPage } from "./pages/_pages";
import { Navbar, NavItem, DropdownMenu } from "./components/_components";
import { BellIcon, MessengerIcon, CaretIcon, PlusIcon } from "./Icons/_icon";

function App() {
	const alert = useSelector((state) => state.alert);

	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state) => state.authentication);

	useEffect(() => {
		history.listen(() => {
			// clear alert on location change
			dispatch(clearAlert());
		});
	}, [dispatch]);

	return (
		<div>
			{alert.message && <div className={`alert `}>{alert.message}</div>}
			<Router history={history}>
				<Suspense fallback={<div>Loading...</div>}>
					<>
						{isLoggedIn ? (
							<>
								<Navbar>
									<NavItem icon={<PlusIcon />} />
									<NavItem icon={<BellIcon />} />
									<NavItem icon={<MessengerIcon />} />
									<NavItem icon={<CaretIcon />}>
										<DropdownMenu />
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
					</>
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
