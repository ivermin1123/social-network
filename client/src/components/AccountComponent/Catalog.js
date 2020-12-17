import React, { useState } from "react";
import { Games, Post } from "../_components";

const Catalog = ({ ...props }) => {
	const { userData } = props;
	const [catalogNav, setCatalogNav] = useState("posts");
	const catalogsNav = [
		{ title: "posts", name: "Bài viết" },
		{ title: "intro", name: "Giới thiệu" },
		{ title: "friends", name: "Bạn bè" },
		{ title: "images", name: "Ảnh" },
		{ title: "games", name: "Trò chơi" },
	];

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
			<div
				style={{
					display: catalogNav === "posts" ? "block" : "none",
				}}
			>
				{userData.infoUser.post ? (
					<Post
						display={catalogNav === "posts" ? "block" : "none"}
						post={userData.infoUser.posts}
					/>
				) : (
					"Chưa bài viết nào"
				)}
			</div>
		</div>
	);
};

export default Catalog;
