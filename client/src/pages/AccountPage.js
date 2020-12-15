import React from "react";
import sprite from "../assets/icons/sprite.svg";
import bgSignIn from "../assets/image/bg-sign-in.png";

const AccountPage = () => {
	return (
		<div className="main main_channel js-main">
			<div className="main__container">
				<div className="main__for___ js-slider js-main-for">
					<div className="main__slide">
						<div
							className="main__item"
							style={{ backgroundImage: `url(${bgSignIn})` }}
						>
							<div className="main__details">
								<div className="main__live live live_big">
									Live
								</div>
								<div className="main__title h4">
									Renegades vs Chiefs - ESL ProLeague Season
									16
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
					<button type="button" className="slick-prev slick-arrow">
						<svg className="icon icon-arrow-prev">
							<use href={`${sprite}#icon-arrow-prev`} />
						</svg>
					</button>
					<button type="button" className="slick-next slick-arrow">
						<svg className="icon icon-arrow-next">
							<use href={`${sprite}#icon-arrow-next`} />
						</svg>
					</button>
				</div>

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
