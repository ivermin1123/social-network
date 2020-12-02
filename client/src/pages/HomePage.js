import React from "react";
import { NewsFeed } from "../components/_components";
import { Row, Col } from "react-bootstrap";

function HomePage() {
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
