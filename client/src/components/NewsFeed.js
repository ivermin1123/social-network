import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Post } from "./_components";
import postActions from "../actions/post.actions";

const NewsFeed = (props) => {
	const dispatch = useDispatch();
	const { posts, loadingPost } = props;

	useEffect(() => {
		dispatch(postActions.getListPosts());
	}, []);

	if (loadingPost) {
		return (
			<LoadingOutlined
				style={{ fontSize: "50px", color: "#08c", margin: "auto" }}
			/>
		);
	}
	return (
		<div id="post-list">
			{posts.data
				? posts.data.map((post) => {
						const { _id: id } = post;
						return <Post post={post} key={id} />;
				  })
				: null}
		</div>
	);
};

const mapStateToProps = (state) => ({
	posts: state.posts.posts,
	loadingPost: state.posts.loadingPost,
});

export default connect(mapStateToProps)(NewsFeed);
