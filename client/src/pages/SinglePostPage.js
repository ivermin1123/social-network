import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Post } from "../components/_components";
import postActions from "../actions/post.actions";

function SinglePostPage() {
	const { postId } = useParams();
	const dispatch = useDispatch();
	const [post, setPost] = useState();

	useEffect(() => {
		dispatch(postActions.getPost({ postId })).then((posts) => {
			setPost(posts.data[0]);
		});
	}, []);

	return post ? (
		<div
			style={{
				padding: "40px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Post post={post} key={post._id} isShowComment />
		</div>
	) : null;
}

export default SinglePostPage;
