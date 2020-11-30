import React from "react";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../actions/user.actions";
import NewsFeed from "../components/NewsFeed";
import { Row, Col } from "react-bootstrap";

function HomePage(props) {
	const { user } = useSelector((state) => state.authentication.user);
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(userActions.logout());
	}

	return (
		<Row className="Home">
			<Col>{/* <SideBar /> */}</Col>
			<Col>
				<NewsFeed />
			</Col>
			<Col>{/* <Contacts /> */}</Col>
		</Row>
		// <div className="col-lg-8 offset-lg-2">
		// 	<h1>Hi {user.username}!</h1>
		// 	<p>You're logged in with React Hooks!!</p>
		// 	<button className="btn btn-primary" onClick={handleLogout}>
		// 		Logout
		// 	</button>
		// </div>
	);
}

export { HomePage };
