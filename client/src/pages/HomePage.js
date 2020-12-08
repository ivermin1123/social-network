import { Row, Col } from "react-bootstrap";
import React from "react";
import io from "socket.io-client";
import { NewsFeed } from "../components/_components";
import PostForm from "../components/Post/PostForm";
import "../assets/styles/_postForm.scss";

function HomePage() {
	// let token = localStorage.getItem('trixgo_token');
	const socket = io(`http://localhost:5000`, {
		transports: ["websocket"],
		upgrade: false,
	});
	console.log({ socket });
	socket.once("connect", () => {
		console.log("HUYNHVINH");
		socket.emit("typing", {});

		socket.on("typing_c", () => {
			console.log("hello client");
		});
	});
	// socket.on("connect", () => {
	// 	console.log("HUYNHVINH");
	// 	// gửi tới server
	// 	socket.emit("typing", {});
	// 	// lắng nghe server
	// });

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

export default HomePage;
