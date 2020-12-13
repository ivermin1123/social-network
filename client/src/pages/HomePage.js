import React from "react";

import NewsFeed from "../components/NewsFeed";
import UserItem from "../components/MainContent/UserItem";
import sprite from "../assets/icons/sprite.svg";

function HomePage() {
	return (
		<div className="page__center">
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
						<UserItem name="Thảo Như" />
						<UserItem name="Thúy Vân" />
						<UserItem name="Như Ngọc" />
						<UserItem name="Yến Nhi" />
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
		</div>
	);
}

export default HomePage;
