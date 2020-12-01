import React from "react";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../actions/user.actions";
import { NewsFeed } from "../components/_components";
import { Row, Col } from "react-bootstrap";

function HomePage(props) {
	const { user } = useSelector((state) => state.authentication.user);
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(userActions.logout());
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		console.log(position);
	});

	return (
		<Row className="Home">
			<Col>{/* <SideBar /> */}</Col>
			<Col>
				<NewsFeed />
			</Col>
			<Col>{/* <Contacts /> */}</Col>
		</Row>
	);
}

export { HomePage };
