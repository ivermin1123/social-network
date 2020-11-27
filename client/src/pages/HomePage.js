import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage(props) {
	const user = useSelector((state) => state.authentication.user);

	return (
		<div className="col-lg-8 offset-lg-2">
			<h1>Hi {user.username}!</h1>
			<p>You're logged in with React Hooks!!</p>
			<p>
				<Link to="/login">Logout</Link>
			</p>
		</div>
	);
}

export { HomePage };
