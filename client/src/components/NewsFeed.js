import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "./_components";
import postActions from "../actions/post.actions";

const NewsFeed = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [listPosts, setListPosts] = useState();

	useEffect(() => {
		dispatch(postActions.getListPosts({ page: 1 })).then((posts) => {
			setListPosts(posts.data);
		});
	}, []);

	const fetchMoreData = () => {
		dispatch(postActions.getListPosts({ page: page + 1 })).then((posts) => {
			if (posts.data.length === 0) {
				setHasMore(false);
			}
			setListPosts(listPosts.concat(posts.data));
		});
		setPage(page + 1);
	};

	const setListPostExceptOne = (idPost) => {
		const newArr = listPosts.filter((post) => post._id !== idPost);
		setListPosts(newArr);
	};

	// if (loadingPost) {
	// 	return (
	// 		<LoadingOutlined
	// 			style={{ fontSize: "50px", color: "#08c", margin: "auto" }}
	// 		/>
	// 	);
	// }
	return (
		<div id="post-list">
			{listPosts && (
				<InfiniteScroll
					style={{ overflow: "hidden", padding: "1px" }}
					dataLength={listPosts.length}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={
						<div style={{ display: "flex" }}>
							<LoadingOutlined
								style={{
									fontSize: "50px",
									color: "#08c",
									margin: "auto",
								}}
							/>
						</div>
					}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>
								Yay! Bạn đã xem hết tất cả các bài viết rồi. 😛
							</b>
						</p>
					}
				>
					{listPosts.map((post) => (
						<Post
							post={post}
							key={post._id}
							setListP={setListPostExceptOne}
						/>
					))}
				</InfiniteScroll>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	posts: state.posts.posts,
	loadingPost: state.posts.loadingPost,
});

export default connect(mapStateToProps)(NewsFeed);
