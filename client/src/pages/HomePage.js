import React from "react";
import { connect } from "react-redux";

import NewsFeed from "../components/NewsFeed";
import PostForm from "../components/Post/PostForm";
// import UserItem from "../components/MainContent/UserItem";
// import sprite from "../assets/icons/sprite.svg";

function HomePage(props) {
	const { loadingUser } = props;
	return loadingUser === false ? (
		<div className="page__center">
			{/* <div className="users">
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
			</div> */}
			<div className="collection">
				{/* <div className="collection__head">
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
				</div> */}
				<PostForm />
				<div className="collection__list">
					<NewsFeed />
				</div>
			</div>
		</div>
	) : null;
}

const mapStateToProps = (state) => ({
	loadingUser: state.users.loadingUser,
});

export default connect(mapStateToProps)(HomePage);
// export default HomePage;
