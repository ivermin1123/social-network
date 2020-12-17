import React, { useState } from "react";
import callOfDuty from "../../assets/image/call-of-duty.png";

const Catalog = () => {
	const [catalogNav, setCatalogNav] = useState("posts");
	const catalogsNav = [
		{ title: "posts", name: "Bài viết" },
		{ title: "intro", name: "Giới thiệu" },
		{ title: "friends", name: "Bạn bè" },
		{ title: "images", name: "Ảnh" },
	];
	const catalogsTag = ["All", "Stream Videos", "Videos"];

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
							<div className="status blue">8.1M views</div>
							<div className="status green">3 months ago</div>
						</div>
						<div className="game__name">
							<div className="game__logo">
								<img
									className="game__pic"
									src="img/call-of-duty.png"
									alt=""
								/>
							</div>
							<div className="game__text">Call of Duty®</div>
						</div>
					</div>
				</div>
			</div>
			<div className="catalog__btns">
				<button type="button" className="catalog__btn btn btn_gray">
					Xem thêm
				</button>
			</div>
		</div>
	);
};

export default Catalog;
