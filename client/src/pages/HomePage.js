import React from "react";
import { NewsFeed } from "../components/_components";
import { Row, Col } from "react-bootstrap";
import PostForm from "./../components/Post/PostForm";
import "../styles/_postForm.scss";

function HomePage() {
	return (
		<Row className="Home">
			<Col>{/* <SideBar /> */}</Col>
			<Col>
				<PostForm />
				<NewsFeed />
			</Col>
			<Col>{/* <Contacts /> */}</Col>
		</Row>
	);
}

export { HomePage };
