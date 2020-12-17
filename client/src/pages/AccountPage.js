import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import sprite from "../assets/icons/sprite.svg";
import callOfDuty from "../assets/image/call-of-duty.png";
import ava from "../assets/image/ava-1.png";
import { SliderComponent } from "../components/_components";
import userActions from "../actions/user.actions";

const AccountPage = (props) => {
	const { accountId } = useParams();
	const dispatch = useDispatch();

	const [userData, setUserData] = useState(null);
	const { loadingUserProfile } = props;
	// console.log("infoUser", accountId);

	const [catalogNav, setCatalogNav] = useState(0);
	const catalogsNav = ["Videos", "About", "Stories", "Schedules"];
	// [
	// 	{ title: "posts", name: "Bài viết" },
	// 	{ title: "intro", name: "Giới thiệu" },
	// 	{ title: "rriends", name: "Bạn bè" },
	// 	{ title: "images", name: "Ảnh" },
	// ];
	// const [catalogTag, setCatalogTag] = useState(0);
	const catalogsTag = ["All", "Stream Videos", "Videos"];

	useEffect(() => {
		dispatch(userActions.getUserProfile(accountId)).then((data) => {
			console.log("data: ", data);
			setUserData(data.data);
		});
	}, []);
	console.log("user: ", userData);

	if (loadingUserProfile) return null;

	return (
		<div className="main main_channel js-main">
			<SliderComponent />
			<div className="page__center page__center_pt0">
				<div className="author author_big">
					<div className="author__container">
						<div className="author__details">
							<div className="ava ava_online">
								<img className="ava__pic" src={ava} alt="" />
							</div>
							<div className="author__wrap">
								<div className="author__man h2 confirm">
									Dylan Hodges
								</div>
								<div className="author__parameters">
									<div className="author__parameter h6">
										536K followers
									</div>
									<div className="author__parameter h6">
										120 videos
									</div>
								</div>
							</div>
						</div>
						<div className="author__btns">
							<button
								type="button"
								className="author__btn btn btn_purple"
							>
								Message
							</button>
							<button
								type="button"
								className="author__btn btn btn_asphalt btn_square"
							>
								<svg className="icon icon-profile-check">
									<use
										href={`${sprite}#icon-profile-check`}
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className="catalog catalog_channel">
					<div className="catalog__nav">
						{catalogsNav
							? catalogsNav.map((item, index) => {
									return (
										<a
											key={index.toString()}
											className={`catalog__link ${
												index === catalogNav
													? "active"
													: null
											}`}
											href="#/"
											onClick={() => setCatalogNav(index)}
										>
											{item}
										</a>
									);
							  })
							: null}
					</div>
					<div className="catalog__sorting">
						<div className="field mobile-show">
							<div className="field__wrap">
								<select className="field__select purple">
									<option>All</option>
									<option>Stream Videos</option>
									<option>Videos</option>
								</select>
							</div>
						</div>
						<div className="catalog__tags mobile-hide">
							{catalogsTag
								? catalogsTag.map((item, index) => {
										return (
											<a
												key={index.toString()}
												className="catalog__tag"
												href="#/"
												// onClick={() =>
												// 	setCatalogTag(index)
												// }
											>
												{item}
											</a>
										);
								  })
								: null}
						</div>
						<div className="field">
							<div className="field__wrap">
								<select className="field__select">
									<option>Popular Videos</option>
									<option>New</option>
									<option>Free</option>
								</select>
							</div>
						</div>
					</div>
					<div className="catalog__list">
						<div className="game">
							<div
								className="game__preview"
								style={{
									backgroundImage: `url(${callOfDuty})`,
								}}
							>
								<label className="checkbox" htmlFor="chk">
									<input
										name="chk"
										className="checkbox__input"
										type="checkbox"
									/>
									<span className="checkbox__in">
										<span className="checkbox__tick" />
									</span>
								</label>
								<div className="game__time">10:42</div>
								<div className="game__line">
									<div
										className="game__progress"
										style={{ width: "65%" }}
									/>
								</div>
							</div>
							<div className="game__details">
								<div className="game__title">
									The Results Are Now – Call of Duty
								</div>
								<div className="game__status">
									<div className="status blue">
										8.1M views
									</div>
									<div className="status green">
										3 months ago
									</div>
								</div>
								<div className="game__name">
									<div className="game__logo">
										<img
											className="game__pic"
											src="img/call-of-duty.png"
											alt=""
										/>
									</div>
									<div className="game__text">
										Call of Duty®
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="catalog__btns">
						<button
							type="button"
							className="catalog__btn btn btn_gray"
						>
							Load More
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	loadingUserProfile: state.users.loadingUserProfile,
});

export default connect(mapStateToProps)(AccountPage);
