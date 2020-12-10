import { Row, Col } from "react-bootstrap";
import React from "react";
import { NewsFeed } from "../components/_components";
import PostForm from "../components/Post/PostForm";
import ChatBar from "../components/ChatBar";
import ChatBox from "../components/ChatBar/ChatBox";
import "../assets/styles/_postForm.scss";

function HomePage() {
	const [open, setOpen] = React.useState(false);
	const [current, setCurrent] = React.useState({});
	const openChat = (user) => {
		setOpen(true);
		setCurrent(user);
	};
	const closeChat = () => {
		setOpen(false);
	};
	return (
		<Row className="Home">
			<Col>{/* <SideBar /> */}</Col>
			<Col>
				<PostForm />
				<NewsFeed />
			</Col>
			<Col>
				<ChatBar openChat={openChat} />
				<ChatBox open={open} current={current} closeChat={closeChat} />
			</Col>
		</Row>
	);
}

export default HomePage;
