import React, { useEffect, Fragment, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { clearMessage } from "./actions/message.actions";
import { history } from "./helpers/history";
import { PrivateRoute } from "./components";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import NavItem from "./components/NavItem";
import DropdownMenu from "./components/DropdownMenu";

import BellIcon from "./Icons/Bell";
import MessengerIcon from "./Icons/Messenger";
import CaretIcon from "./Icons/Caret";
import PlusIcon from "./Icons/Plus";

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
		<div style={{ overflow: "hidden" }}>
			{message.message && (
				<div className={`alert `}>{message.message}</div>
			)}
			<Router history={history}>
				<Suspense fallback={<div>Loading...</div>}>
					<Fragment>
						{isLoggedIn ? (
							<>
								{" "}
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
						<Switch>
							<PrivateRoute exact path="/" component={HomePage} />
							<Route path="/login" component={LoginPage} />
							<Route path="/register" component={RegisterPage} />
						</Switch>
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
