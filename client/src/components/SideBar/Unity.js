import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import sprite from "../../assets/icons/sprite.svg";

function App(props) {
	const { conversationOpen } = props;
	const conversationId = conversationOpen.id || "notFound";

	const UnityItem = (props) => {
		const { icon, name, counter, href } = props;
		return (
			<Link className="sidebar__item" to={href || "#/"}>
				<div className="sidebar__icon">
					<svg className={`icon ${icon}`}>
						<use href={`${sprite}#${icon}`} />
					</svg>
				</div>
				<div className="sidebar__text">{name}</div>
				{counter ? (
					<div className="sidebar__counter">{counter}</div>
				) : null}
			</Link>
		);
	};

	return (
		<div className="sidebar__group">
			<div className="sidebar__caption caption-sm">Unity</div>
			<div className="sidebar__menu">
				<UnityItem
					icon="icon-chat"
					name="Chat"
					counter={10}
					href={`/message/${conversationId}`}
				/>
				<UnityItem icon="icon-settings" name="Setting" />
				<UnityItem icon="icon-chart" name="Analytics" />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	conversationOpen: state.conversations.conversationOpen,
});

export default connect(mapStateToProps)(App);
