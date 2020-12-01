import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NewsFeed } from "../components/_components";
import { Row, Col } from "react-bootstrap";
import postActions from "../actions/post.actions";

function HomePage() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(postActions.getPost());
	}, []);
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
