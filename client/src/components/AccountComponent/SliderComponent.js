import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import sprite from "../../assets/icons/sprite.svg";
import mainPic1 from "../../assets/image/main-pic-1.png";
import mainPic2 from "../../assets/image/main-pic-2.jpg";
import mainPic3 from "../../assets/image/main-pic-3.jpg";
import mainPic4 from "../../assets/image/main-pic-4.jpg";
import league from "../../assets/image/league-of-legends.png";

const SliderComponent = ({ ...props }) => {
	const { isSendReq, isFriend } = props;
	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);
	useEffect(() => {});
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
						{isSendReq === false && isFriend === false ? (
							<a className="main__btn btn btn_purple" href="/#">
								Chỉnh sửa ảnh bìa
							</a>
						) : null}
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
		<div className="main__container">
			{list ? (
				<>
					<Slider
						className="main__for"
						{...settings}
						asNavFor={nav2}
						ref={(slider) => {
							setNav1(slider);
						}}
					>
						{list.map((item, index) => {
							return (
								<MainSlide
									key={index.toString()}
									className="main__slide"
									image={item.image}
									title={item.title}
									text={item.text}
								/>
							);
						})}
					</Slider>

					<Slider
						className="main__nav"
						{...settings}
						asNavFor={nav1}
						ref={(slider) => {
							setNav2(slider);
						}}
						slidesToShow={4}
						swipeToSlide="true"
						focusOnSelect="true"
					>
						{list.map((item, index) => {
							return (
								<div
									key={index.toString()}
									className="main__preview"
									style={{
										backgroundImage: `url(${item.image})`,
									}}
								/>
							);
						})}
					</Slider>
				</>
			) : null}
		</div>
	);
};

export default SliderComponent;
