import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar } from "antd";

import { LINK } from "../../constants";
import img from "../../assets/image/ava-1.png";
import userActions from "../../actions/user.actions";

function SearchBar(props) {
	const { sprite } = props;
	const dispatch = useDispatch();
	const [text, setText] = useState("");
	const [listSearch, setListSearch] = useState([]);

	const handleChange = (e) => {
		setText(e.target.value);
		if (e.target.value.length) {
			const keyToSearch = e.target.value.split(" ");
			dispatch(userActions.searchUser({ key: keyToSearch })).then(
				(data) => {
					setListSearch(data.data);
				}
			);
		}
	};

	const SearchItem = (props) => {
		const { user } = props;
		return (
			<Link
				className="player__game"
				to={`account/${user._id}`}
				style={{ height: "80px" }}
			>
				<div
					className="player__ava"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Avatar
						size={54}
						className="player__photo"
						src={
							user.avatar
								? `${LINK.LINK_S3}${user.avatar.path}`
								: img
						}
						alt=""
					/>
				</div>
				<div className="player__text">
					{user.firstName} {user.lastName}
				</div>
			</Link>
		);
	};
	return (
		<div>
			<form className="header__search" style={{ display: "none" }}>
				<input
					className="header__input"
					type="text"
					value={text}
					onChange={handleChange}
					placeholder="Tìm kiếm ..."
				/>
				<button type="button" className="header__btn-search">
					<svg className="icon icon-search">
						<use href={`${sprite}#icon-search`} />
					</svg>
				</button>
			</form>
			<div className={`player__playlist${text.length ? " show" : ""}`}>
				<div
					className="player__wrap"
					style={{ display: listSearch ? null : "none" }}
				>
					<p />
					<div className="player__group">
						{listSearch.length ? (
							listSearch.map((user) => (
								<SearchItem user={user} key={user._id} />
							))
						) : (
							<h4>Không có kết quả.</h4>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchBar;
