import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import NavbarLoaded from "./NavbarLoaded";

const Navbar = (props) => {
	const { loadingPost } = props;
	console.log("loadingPost 📸", { loadingPost });
	return <>{loadingPost ? <LoadingOutlined /> : <NavbarLoaded />} </>;
};

const mapStateToProps = (state) => ({
	loadingPost: state.posts.loadingPost,
});

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as default };
