import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../constants/Theme";

const listSearchHistory = [
	{
		name: "Hoàng Yến",
		avt:
			"https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/116914402_2736203649949189_1154568876833054310_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=7TCXTbzyJRgAX-SVqPy&_nc_ht=scontent.fvca1-2.fna&oh=105b0deb407a47101c3a5d4a50b551b5&oe=5FEE854A",
	},
	{
		name: "Quốc Hoàng",
		avt:
			"https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/119006919_2630686663849214_7588642771909915890_o.jpg?_nc_cat=104&ccb=2&_nc_sid=730e14&_nc_ohc=YzS0O2-NZ1sAX-8vQKN&_nc_ht=scontent.fvca1-2.fna&oh=f57df2e9c7c1376df180566d9bccecdd&oe=5FEC1538",
	},
	{
		name: "Anh Tú Nguyễn",
		avt:
			"https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/56364685_942992419237945_2413696436949483520_o.jpg?_nc_cat=101&ccb=2&_nc_sid=84a396&_nc_ohc=75NhG6cM7i4AX-8v8E3&_nc_ht=scontent.fvca1-2.fna&oh=92b0c35ebffc837421cb94224fb1e3bb&oe=5FEB7950",
	},
	{
		name: "Kênh Thông Tin - Sự kiện khoa công nghệ thông tin",
		avt: "",
	},
];
const Navbar = ({ ...props }) => {
	const [display, setDisplay] = useState(false);
	console.log(window.screen.availWidth);
	const { children } = props;
	return (
		<div className="nav-bar">
			<div className="nav-bar-fixed row">
				<div className="nav-bar__left-items col">
					<div className="left-item-content">
						<Link to="/">
							<img
								className="nav-bar__logo"
								src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-square2-512.png"
								alt="logo"
							/>
						</Link>
						<div className="nav-bar__search-bar">
							<button
								type="button"
								className="input-search-field"
								onClick={() => {
									setDisplay(true);
								}}
							>
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.search}
								/>
								<p>Tìm kiếm trên Fakebook</p>
							</button>
						</div>
					</div>
				</div>
				<div className="nav-bar__navigation col">
					<div className="nav-bar__navigation-icon">
						<FontAwesomeIcon
							className="icon"
							icon={Theme.ICONS.home}
						/>
					</div>
					<div className="nav-bar__navigation-icon">
						<FontAwesomeIcon
							className="icon"
							icon={Theme.ICONS.users}
						/>
					</div>
					<div className="nav-bar__navigation-icon">
						<FontAwesomeIcon
							className="icon"
							icon={Theme.ICONS.tv}
						/>
					</div>
				</div>
				<div className="nav-bar__right-items col">
					<ul className="navbar-nav">
						<Link to="/account">
							<div className="nav-bar__info">
								<img
									className="nav-bar__avt"
									src="https://znews-photo.zadn.vn/w660/Uploaded/bpmoqwq1/2014_10_16/con_meo.jpg"
									alt="avt"
								/>
								<div className="nav-bar__name">Tú Vip</div>
							</div>
						</Link>
						{children}
					</ul>
				</div>
			</div>
			<div
				className="nav-bar__search-field"
				style={{ display: display ? "block" : "none" }}
			>
				<div className="search-field">
					<button
						type="button"
						className="search-field-icon"
						onClick={() => {
							setDisplay(false);
						}}
					>
						<FontAwesomeIcon
							className="icon"
							icon={Theme.ICONS.arrowLeft}
						/>
					</button>
					<input
						className="input-search-field"
						type="text"
						placeholder="Tìm kiếm trên Facebook"
					/>
				</div>
				<div className="search-history">
					<div className="search-history-header">
						<span>Tìm kiếm gần đây</span>
						<Link to="/">Chỉnh sửa</Link>
					</div>
					<div className="search-history-content">
						{listSearchHistory
							? listSearchHistory.map((item) => {
									return (
										<button
											className="item-search"
											type="button"
										>
											<div className="">
												{item.avt ? (
													<img
														src={item.avt}
														alt="avata"
													/>
												) : (
													<div className="icon-clock">
														<FontAwesomeIcon
															className="icon"
															icon={
																Theme.ICONS
																	.clock
															}
														/>
													</div>
												)}
												<span>{item.name}</span>
											</div>
											<button type="button">x</button>
										</button>
									);
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  })
							: null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
