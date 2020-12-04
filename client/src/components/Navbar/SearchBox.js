import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../constants/Theme";
import { Link } from "react-router-dom";

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
const SearchBox = ({ ...props }) => {
	const { showSearch } = props;
	return (
		<div className="nav-bar__search-field">
			<div className="search-field">
				<button
					className="search-field-icon"
					onClick={() => {
						showSearch(false);
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
						? listSearchHistory.map((item, index) => {
								return (
									<button className="item-search">
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
														icon={Theme.ICONS.clock}
													/>
												</div>
											)}
											<span>{item.name}</span>
										</div>
										<button>x</button>
									</button>
								);
						  })
						: null}
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
