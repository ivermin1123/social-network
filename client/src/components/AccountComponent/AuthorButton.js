import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../constants/index";

const AuthorButton = ({ ...props }) => {
	const { isType } = props;
	const [addFr, setAddfr] = useState(false);
	return (
		<div className="author__btns">
			{isType === 0 ? (
				<button type="button" className="author__btn btn btn_purple">
					Chỉnh sửa trang cá nhân
				</button>
			) : (
				<div>
					<button
						type="button"
						className="author__btn btn btn_purple"
					>
						Message
					</button>
					<button
						type="button"
						className="author__btn btn btn_asphalt btn_square"
						onClick={() => {
							setAddfr(!addFr);
						}}
					>
						{isType === 1 ? (
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.faUserCheck}
							/>
						) : (
							<FontAwesomeIcon
								className="icon"
								icon={
									addFr
										? Theme.ICONS.faUserTimes
										: Theme.ICONS.faUserPlus
								}
							/>
						)}
					</button>
					)
				</div>
			)}
		</div>
	);
};

export default AuthorButton;
