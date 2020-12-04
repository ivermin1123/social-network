import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tabs from "../../constants/tabs";
import Theme from "../../constants/Theme";

const Cover = ({ ...props }) => {
	const { acc } = props;
	const [sumFriend, setSumFriend] = useState(0);
	const [value, setValue] = useState("");
	const [status, setStatus] = useState(false);
	const [state, setState] = useState();
	const handleAddProfile = () => {
		setStatus(!status);
	};
	const handleClickMenu = (value) => {
		setState(value);
	};
	useEffect(() => {
		setSumFriend(469);
	}, []);
	return (
		<div className="cover">
			<div className="cover-image">
				<img
					src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/37219759_789164267954095_7853071637418082304_o.jpg?_nc_cat=108&ccb=2&_nc_sid=e3f864&_nc_ohc=_gkEKZIIipAAX_IL5wJ&_nc_ht=scontent.fsgn2-3.fna&oh=755c486ebfaac7383ec70bb92ff5211e&oe=5FEB72A8"
					alt=""
					className="cover-image"
				/>
			</div>
			<div className="cover-display">
				<div className="cover-display-content">
					<h1>{acc.displayName}</h1>
					<button
						type="button"
						className="button__add-profile"
						style={{ display: status ? "none" : "block" }}
						onClick={handleAddProfile}
					>
						Thêm tiểu sử
					</button>
					<div
						className="cover-display-add"
						style={{ display: !status ? "none" : "block" }}
					>
						<textarea
							maxLength="101"
							rows="3"
							placeholder="Mô tả về bạn"
							value={value}
							onChange={(e) => {
								setValue(e.target.value);
							}}
						/>
						<div className="count-char">
							<span>Còn {101 - value.length} ký tự</span>
						</div>
						<div className="cover-bottom row">
							<div className="cover-bottom-left">
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.globeAsia}
								/>
								<span>Công khai</span>
							</div>
							<div className="cover-bottom-right ">
								<button
									type="button"
									onClick={() => {
										handleAddProfile();
										setValue("");
									}}
								>
									Hủy
								</button>
								<button
									type="button"
									disabled={
										!(
											value.length > 0 &&
											value.length <= 101
										)
									}
									style={{
										cursor:
											value.length > 0 &&
											value.length <= 101
												? null
												: "not-allowed",
									}}
								>
									Lưu
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="cover-menu">
				<div className="menu-content row">
					<div className="menu-content-left">
						{tabs.map((item, index) => {
							return (
								<button
									type="button"
									className={`menu-left-item ${
										state === index ? "active" : ""
									}`}
									onClick={(index) => {
										handleClickMenu(index);
									}}
								>
									<span>{item.displayName}</span>
									{item.name === "friends" ? (
										<span className="item-sumfriend">
											{sumFriend}
										</span>
									) : null}
								</button>
							);
						})}
					</div>
					<div className="menu-content-right">
						<button type="button">
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.pen}
							/>
							<span>Chỉnh sửa trang ...</span>
						</button>
						<button type="button">
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.eye}
							/>
						</button>
						<button type="button">
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.search}
							/>
						</button>
						<button type="button">
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.ellipsisH}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cover;
