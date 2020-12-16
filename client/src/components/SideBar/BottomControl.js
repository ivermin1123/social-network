import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import sprite from "../../assets/icons/sprite.svg";
import userActions from "../../actions/user.actions";

function BottomControl() {
	const [checked, setChecked] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (localStorage.getItem("darkMode") === "on") {
			document.body.classList.add("dark");
			setChecked(true);
		}
	}, []);

	const handleTheme = () => {
		if (document.body.classList.length) {
			document.body.classList.remove("dark");
			localStorage.setItem("darkMode", "off");
		} else {
			document.body.classList.add("dark");
			localStorage.setItem("darkMode", "on");
		}
	};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(userActions.logout());
	};
	return (
		<div className="sidebar__bottom">
			<label
				className="switch switch_theme js-switch-theme"
				htmlFor="theme"
				onChange={handleTheme}
			>
				<input
					id="theme"
					className="switch__input"
					name="theme"
					type="checkbox"
					checked={checked}
					onChange={() => setChecked(!checked)}
				/>
				<span className="switch__in">
					<span className="switch__box" />
					<span className="switch__icon">
						<svg className="icon icon-moon">
							<use href={`${sprite}#icon-moon`} />
						</svg>
						<svg className="icon icon-sun">
							<use href={`${sprite}#icon-sun`} />
						</svg>
					</span>
				</span>
			</label>
			<a className="sidebar__download" href="#/" onClick={handleLogout}>
				<svg className="icon icon-logout">
					<use href={`${sprite}#icon-logout`} />
				</svg>
			</a>
		</div>
	);
}

export default BottomControl;
