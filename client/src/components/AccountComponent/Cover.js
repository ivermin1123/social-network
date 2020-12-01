import React, { useEffect, useState } from "react";
import tabs from "../../constants/tabs";
const Cover = ({ ...props }) => {
	const { acc } = props;
	const [sumFriend, setSumFriend] = useState(0)
	const [value, setValue] = useState("");
	const [status, setStatus] = useState(false);
	const handleAddProfile = () => {
		status ? setStatus(false) : setStatus(true);
	};
useEffect(()=>{
	setSumFriend(469);
},[])
	return (
		<div className="cover">
			<div className="cover-image"></div>
			<div className="cover-display">
				<div className="cover-display-content">
					<h1>{acc.displayName}</h1>
					<div
						className="button__add-profile"
						style={{ display: status ? "none" : "block" }}
						onClick={handleAddProfile}
					>
						Thêm tiểu sử
					</div>
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
						></textarea>
						<div className="count-char">
							<span>Còn {101 - value.length} ký tự</span>
						</div>
						<div className="cover-bottom row">
							<div className="cover-bottom-left ">
								<span>icon</span>
								<span>Công khai</span>
							</div>
							<div className="cover-bottom-right ">
								<button
									onClick={() => {
										handleAddProfile();
										setValue("");
									}}
								>
									Hủy
								</button>
								<button
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
			<div className="cover-menu row">
				<div className="cover-menu-left">
					{tabs.map((item, index) => {
						return (
							<div className="menu-left-item">
								<span>{item.displayName}</span>
								{item.name == "friends" ? (
									<small>{sumFriend}</small>
								) : null}
							</div>
						);
					})}
				</div>
				<div className="cover-menu-right">
					<button>Chỉnh sửa trang</button>
					<button>Chỉnh </button>
					<button>Chỉnh </button>
					<button>Chỉnh </button>
				</div>
			</div>
		</div>
	);
};

export default Cover;
