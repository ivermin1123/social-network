import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Post } from "./_components";
import postActions from "../actions/post.actions";

const NewsFeed = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(postActions.getListPosts());
	}, []);

	const { posts } = props;

	return (
		<div id="post-list">
			{posts
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
});

export default connect(mapStateToProps)(NewsFeed);
