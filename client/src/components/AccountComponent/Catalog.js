import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Games, Post, Introduction, Friends, Images } from "../_components";
import postActions from "../../actions/post.actions";

const Catalog = ({ ...props }) => {
	const { userData, userPosts } = props;
	const dispatch = useDispatch();
	const [catalogNav, setCatalogNav] = useState("posts");
	const catalogsNav = [
		{ title: "posts", name: "Bài viết" },
		{ title: "intro", name: "Giới thiệu" },
		{ title: "friends", name: "Bạn bè" },
		{ title: "images", name: "Ảnh" },
		{ title: "games", name: "Trò chơi" },
	];
	useEffect(() => {
		dispatch(postActions.getUserPosts(userData._id));
	}, []);
	console.log("userPosts:", userPosts || null);

	return (
		<div className="catalog catalog_channel">
			<div className="catalog__nav">
				{catalogsNav
					? catalogsNav.map((item) => {
							return (
								<a
									key={item.title}
									className={`catalog__link ${
										item.title === catalogNav
											? "active"
											: null
									}`}
									href="#/"
									onClick={() => setCatalogNav(item.title)}
								>
									{item.name}
								</a>
							);
					  })
					: null}
			</div>
			<Games display={catalogNav === "games" ? "block" : "none"} />
			<Introduction
				userData={userData}
				display={catalogNav === "intro" ? "block" : "none"}
			/>
			<Friends
				userData={userData}
				display={catalogNav === "friends" ? "block" : "none"}
			/>

			<Images display={catalogNav === "images" ? "block" : "none"} />
			<div
				style={{
					display: catalogNav === "posts" ? "block" : "none",
				}}
			>
				{userPosts && userPosts.length ? (
					<Post
						display={catalogNav === "posts" ? "block" : "none"}
						post={userPosts}
					/>
				) : (
					"Chưa bài viết nào"
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userPosts: state.posts.userPosts,
});
export default connect(mapStateToProps)(Catalog);
