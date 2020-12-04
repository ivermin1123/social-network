import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={
			(props) =>
				localStorage.getItem("user") ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				)
			// eslint-disable-next-line react/jsx-curly-newline
		}
	/>
);

export default PrivateRoute;
