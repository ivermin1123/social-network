import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

import {
	Games,
	Post,
	Introduction,
	Friends,
	Images,
	PostForm,
} from "../_components";
import postActions from "../../actions/post.actions";

const Catalog = ({ ...props }) => {
	const { userData, isMySelf } = props;
	const dispatch = useDispatch();
	const [catalogNav, setCatalogNav] = useState("posts");
	const catalogsNav = [
		{ title: "posts", name: "Bài viết" },
		{ title: "intro", name: "Giới thiệu" },
		{ title: "friends", name: "Bạn bè" },
		// { title: "images", name: "Ảnh" },
		// { title: "games", name: "Trò chơi" },
	];

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [listPosts, setListPosts] = useState();

	useEffect(() => {
		dispatch(
			postActions.getUserPosts({ userId: userData._id, page: 1 })
		).then((posts) => {
			setListPosts(posts.data);
		});
	}, [userData]);

	const fetchMoreData = () => {
		dispatch(
			postActions.getUserPosts({ userId: userData._id, page: page + 1 })
		).then((posts) => {
			if (posts.data.length === 0) {
				setHasMore(false);
			}
			// console.log("LIST POST", posts.data);
			setListPosts(listPosts.concat(posts.data));
		});
		setPage(page + 1);
	};

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
				{catalogNav === "posts" ? (
					<>
						{isMySelf && <PostForm userData={userData} />}

						{listPosts ? (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<InfiniteScroll
									style={{
										overflow: "hidden",
										padding: "1px",
									}}
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
												Yay! Bạn đã xem hết tất cả các
												bài viết rồi. 😛
											</b>
										</p>
									}
								>
									{listPosts.map((post) => (
										<Post
											display={
												catalogNav === "posts"
													? "block"
													: "none"
											}
											post={post}
											key={post._id}
										/>
									))}
								</InfiniteScroll>
							</div>
						) : (
							"Bạn chưa có bài viết nào, hãy chia sẻ trạng thái của bạn với mọi người nhé 😍."
						)}
					</>
				) : null}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userPosts: state.posts.userPosts,
});
export default connect(mapStateToProps)(Catalog);
