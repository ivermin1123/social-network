import React from "react";
import Slider from "react-slick";
import sprite from "../assets/icons/sprite.svg";
import bgSignIn from "../assets/image/bg-sign-in.png";

const AccountPage = () => {
	const list = [1, 2, 3];
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
	const settings = {
		dots: true,
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
				<Slider className="main__for" {...settings}>
					{list
						? list.map((item) => {
								return (
									<div className="main__slide" key={item}>
										<div
											className="main__item"
											style={{
												backgroundImage: `url(${bgSignIn})`,
											}}
										>
											<div className="main__details">
												<div className="main__live live live_big">
													Live
												</div>
												<div className="main__title h4">
													Renegades vs Chiefs - ESL
													ProLeague Season 16
												</div>
												<div className="main__parameters">
													<div className="main__parameter">
														<div className="main__icon">
															<img
																className="main__pic"
																src="img/league-of-legends.png"
																alt=""
															/>
														</div>
														<div className="main__text">
															League of Legends®
														</div>
													</div>
													<div className="main__parameter">
														🇺🇸 English
													</div>
												</div>
												<a
													className="main__btn btn btn_purple"
													href="/#"
												>
													Watch Now
												</a>
											</div>
										</div>
									</div>
								);
						  })
						: null}
				</Slider>

				<div className="main__nav js-main-nav">
					<div
						className="main__preview"
						style={{ backgroundImage: `url(${bgSignIn})` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
