import React from "react";

import {
	CommentButton,
	CommentCount,
	LikeButton,
	LikeCount,
} from "../_components";
const Post = () => {
	return (
		<div className="post">
			<div className="post-header">
				<img
					src="https://i.pinimg.com/736x/d1/32/64/d132644360376beb74abb10578952888.jpg"
					alt=""
					className="post-header__avt"
				/>
				<div className="post-header__name">Anh Tu Nguyen</div>
				<div className="post-header__created">3 days ago</div>
			</div>
			<div className="post-body">
				<div className="post-body__content">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Alias doloremque accusamus assumenda, velit est voluptatibus
					dolores reprehenderit ipsa quis, fuga aliquam id temporibus
					tempora inventore autem magnam, laudantium placeat illum?c
				</div>
				<img
					src="https://i.ytimg.com/vi/jNy6RW-2lrI/maxresdefault.jpg"
					alt=""
					className="post-body__image"
				/>
				<div className="post-body__react">
					<LikeCount className="post-body__react--likes" />
					<CommentCount className="post-body__react--comments" />
				</div>
				<div className="post-body__interact">
					<LikeButton className="post-body__interact--likes" />
					<CommentButton className="post-body__interact--comments" />
				</div>
			</div>
		</div>
	);
};

export default Post;
