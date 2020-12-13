import React from "react";

import NewsFeed from "../components/NewsFeed";
import sprite from "../assets/icons/sprite.svg";

function HomePage() {
	return (
		<>
			<div className="users">
				<div className="users__container">
					<div className="users__info h6">
						Maybe you know that person ?
					</div>
					<div className="users__list">
						<a className="users__item users__item_add" href="#/">
							<div className="users__add">
								<svg className="icon icon-plus">
									<use href={`${sprite}#icon-plus`} />
								</svg>
							</div>
							<div className="users__title">Add Yours</div>
						</a>
						<a className="users__item" href="#/">
							<div className="ava ava_online">
								<img
									className="ava__pic"
									src="img/ava-1.png"
									alt=""
								/>
							</div>
							<div className="users__title">
								Gabriel Erickson{" "}
							</div>
							<div className="users__time">14m ago</div>
						</a>
					</div>
				</div>
			</div>
			<div className="collection">
				<div className="collection__head">
					<div className="collection__title h5">Recently Post</div>
					<div className="collection__field field">
						<div className="field__wrap">
							<select className="field__select">
								<option>Popular</option>
								<option>New</option>
								<option>Free</option>
							</select>
						</div>
					</div>
				</div>
				<div className="collection__list">
					<NewsFeed />
				</div>
			</div>
		</>
	);
}

export default HomePage;
