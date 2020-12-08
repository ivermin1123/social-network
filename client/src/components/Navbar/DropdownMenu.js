import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import userActions from "../../actions/user.actions";
import { ArrowIcon, BoltIcon, ChevronIcon, CogIcon } from "../../Icons/_icon";

function DropdownMenu() {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);
	const dispatch = useDispatch();

	function callback() {
		dispatch(userActions.logout());
	}

	useEffect(() => {
		console.log(dropdownRef.current?.firstChild.offsetHeight);
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 32);
	}, []);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height + 32);
	}

	function DropdownItem(props) {
		const {
			callback: _callback,
			goToMenu,
			leftIcon,
			children,
			rightIcon,
			href,
		} = props;
		return (
			<a
				href={href ? href : "/#"}
				className="menu-item"
				onClick={
					_callback
						? callback
						: () => goToMenu && setActiveMenu(goToMenu)
				}
			>
				<span className="icon-button">{leftIcon}</span>
				{children}
				<span className="icon-right">{rightIcon}</span>
			</a>
		);
	}

	return (
		<div
			className="dropdown"
			style={{ height: menuHeight }}
			ref={dropdownRef}
		>
			<CSSTransition
				in={activeMenu === "main"}
				timeout={500}
				classNames="menu-primary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem>My Profile</DropdownItem>
					<DropdownItem
						leftIcon={<CogIcon />}
						rightIcon={<ChevronIcon />}
						goToMenu="settings"
					>
						Settings
					</DropdownItem>
					<DropdownItem
						leftIcon="🦧"
						rightIcon={<ChevronIcon />}
						goToMenu="animals"
					>
						Animals
					</DropdownItem>
					<DropdownItem href="/changepassword">
						Đổi mật khẩu
					</DropdownItem>
					<DropdownItem callback={callback}>Đăng xuất</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === "settings"}
				timeout={500}
				classNames="menu-secondary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
						<h2>My Tutorial</h2>
					</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>
						JavaScript
					</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>
						Awesome!
					</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === "animals"}
				timeout={500}
				classNames="menu-secondary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
						<h2>Animals</h2>
					</DropdownItem>
					<DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
					<DropdownItem leftIcon="🐸">Frog</DropdownItem>
					<DropdownItem leftIcon="🦋">Horse?</DropdownItem>
					<DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
				</div>
			</CSSTransition>
		</div>
	);
}

export default DropdownMenu;
