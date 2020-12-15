import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import sprite from "../assets/icons/sprite.svg";
import mainPic1 from "../assets/image/main-pic-1.png";
import mainPic2 from "../assets/image/main-pic-2.jpg";
import mainPic3 from "../assets/image/main-pic-3.jpg";
import mainPic4 from "../assets/image/main-pic-4.jpg";
import league from "../assets/image/league-of-legends.png";
import callOfDuty from "../assets/image/call-of-duty.png";
import ava from "../assets/image/ava-1.png";

const AccountPage = () => {
	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);

	let slider1 = [];
	let slider2 = [];
	useEffect(() => {
		setNav1(slider1);
		setNav2(slider2);
	});
	const list = [
		{
			image: mainPic1,
			title: "Renegades vs Chiefs - ESL ProLeague Season 16",
			text: "League of Legends®",
		},
		{
			image: mainPic2,
			title: "Renegades vs Chiefs - ESL ProLeague Season 16",
			text: "League of Legends®",
		},
		{
			image: mainPic3,
			title: "Renegades vs Chiefs - ESL ProLeague Season 16",
			text: "League of Legends®",
		},
		{
			image: mainPic4,
			title: "Renegades vs Chiefs - ESL ProLeague Season 16",
			text: "League of Legends®",
		},
		{
			image: mainPic2,
			title: "Renegades vs Chiefs - ESL ProLeague Season 16",
			text: "League of Legends®",
		},
	];
	const [catalogNav, setCatalogNav] = useState(0);
	const catalogsNav = ["Videos", "About", "Stories", "Schedules"];
	const [catalogTag, setCatalogTag] = useState(0);
	const catalogsTag = ["All", "Stream Videos", "Videos"];
	const ButtonArrow = (props) => {
		const { className, onClick, icon } = props;
		return (
			<button
				type="button"
				className={`${className} slick-arrow`}
				onClick={onClick}
			>
				<svg className={`icon ${icon}`}>
					<use href={`${sprite}#${icon}`} />
				</svg>
			</button>
		);
	};
	const MainSlide = (props) => {
		const { className, image, title, text } = props;
		return (
			<div className={className}>
				<div
					className="main__item"
					style={{
						backgroundImage: `url(${image})`,
					}}
				>
					<div className="main__details">
						<div className="main__live live live_big">Live</div>
						<div className="main__title h4">{title || ""}</div>
						<div className="main__parameters">
							<div className="main__parameter">
								<div className="main__icon">
									<img
										className="main__pic"
										src={league}
										alt=""
									/>
								</div>
								<div className="main__text">{text || ""}</div>
							</div>
							<div className="main__parameter">🇺🇸 English</div>
						</div>
						<a className="main__btn btn btn_purple" href="/#">
							Watch Now
						</a>
					</div>
				</div>
			</div>
		);
	};
	const settings = {
		dotsClass: "main__nav",
		infinite: true,
		nextArrow: (
			<ButtonArrow className="slick-next" icon="icon-arrow-next" />
		),
		prevArrow: (
			<ButtonArrow className="slick-prev" icon="icon-arrow-prev" />
		),
	};
	return (
		<div className="main main_channel js-main">
			<div className="main__container">
				<Slider
					className="main__for"
					{...settings}
					asNavFor={nav2}
					ref={(slider) => {
						slider1 = slider;
					}}
				>
					{list
						? list.map((item) => {
								return (
									<MainSlide
										className="main__slide"
										image={item.image}
										title={item.title}
										text={item.text}
									/>
								);
						  })
						: null}
				</Slider>
				<Slider
					className="main__nav"
					{...settings}
					asNavFor={nav1}
					ref={(slider) => {
						slider2 = slider;
					}}
					slidesToShow={4}
					swipeToSlide="true"
					focusOnSelect="true"
				>
					{list
						? list.map((item) => {
								return (
									<div
										className="main__preview"
										style={{
											backgroundImage: `url(${item.image})`,
										}}
									/>
								);
						  })
						: null}
				</Slider>
			</div>
			<div className="page__center page__center_pt0">
				<div className="author author_big">
					<div className="author__container">
						<div className="author__details">
							<div className="ava ava_online">
								<img
									className="ava__pic"
									src={ava}
									alt=""
								/>
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
											className={`catalog__link ${
												index === catalogNav
													? "active"
													: null
											}`}
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
												className="catalog__tag active"
												href="#"
												onClick={() =>
													setCatalogTag(index)
												}
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
								<label className="checkbox">
									<input
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

export default AccountPage;
