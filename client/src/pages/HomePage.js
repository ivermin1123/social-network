import React from "react";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../actions/user.actions";

function HomePage(props) {
	const { user } = useSelector((state) => state.authentication.user);
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(userActions.logout());
	}

	return (
		<div className="col-lg-8 offset-lg-2">
			<h1>Hi {user.username}!</h1>
			<p>You're logged in with React Hooks!!</p>
			<button className="btn btn-primary" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
}

export { HomePage };
