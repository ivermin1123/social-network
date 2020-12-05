import React from "react";
import { Post } from "../_components";
import TuAvt from "../../assets/image/Tu.jpg";
import HoangAvt from "../../assets/image/hoang.png";
import YenAvt from "../../assets/image/Yen.jpg";
import TuPost from "../../assets/image/TuPost.jpg";
import HoangPost from "../../assets/image/HoangPost.jpg";
import YenPost from "../../assets/image/YenPost.jpg";

const PostList = () => {
	const posts = [
		{
			avt: TuAvt,
			name: "Tu",
			created: "1 days ago",
			content: "Dzo",
			img: TuPost,
			likes: 100,
			comments: 42,
			listLikes: ["Tu", "Hoang", "Nguyen"],
		},
		{
			avt: HoangAvt,
			name: "Hoang",
			created: "10 days ago",
			content: "Dep trai ko moi nguoi oi!",
			img: HoangPost,
			likes: 200,
			comments: 32,
		},
		{
			avt: YenAvt,
			name: "Yen",
			created: "3 hours ago",
			content: "Dev",
			img: YenPost,
			likes: 2,
			comments: 22,
		},
	];
	return (
		<div>
			{posts.map((post) => (
				<Post post={post} key={Math.floor(Math.random() * 99999) + 1} />
			))}
		</div>
	);
};

export default PostList;
