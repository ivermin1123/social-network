import React from "react";
import { Tabs, Avatar } from "antd";

import LINK_CONSTANT from "../../constants/link.constants";
import img5 from "../../assets/image/avatar-5.png";
import like from "../../assets/icons/like.svg";
import love from "../../assets/icons/love.svg";
import haha from "../../assets/icons/haha.svg";
import wow from "../../assets/icons/wow.svg";
import sad from "../../assets/icons/sad.svg";
import angry from "../../assets/icons/angry.svg";

const ListReactions = (props) => {
	const { reactions } = props;
	const { TabPane } = Tabs;

	const getListReactionByType = (type) => {
		const arrReaction = reactions.filter(
			(reaction) => reaction.type === type
		);
		if (arrReaction.length <= 0) {
			return null;
		}
		return arrReaction.map((reaction) => (
			<div className="reaction-item" key={reaction._id}>
				<div className="reaction-item__left">
					<Avatar
						size={40}
						className="reaction-item__left--avatar"
						src={
							reaction.author[0].avatar.length
								? `${LINK_CONSTANT.LINK_S3}${reaction.author[0].avatar[0].path}`
								: img5
						}
					/>
					<span className="reaction-item__left--name">
						{reaction.author[0].firstName}{" "}
						{reaction.author[0].lastName}
					</span>
				</div>
				<div className="reaction-item__right" />
			</div>
		));
	};

	return (
		<Tabs defaultActiveKey="1">
			<TabPane tab={<span>Tất cả</span>} key="1">
				{reactions.map((reaction) => (
					<div className="reaction-item" key={reaction._id}>
						<div className="reaction-item__left">
							<Avatar
								size={40}
								className="reaction-item__left--avatar"
								src={
									reaction.author[0].avatar.length
										? `${LINK_CONSTANT.LINK_S3}${reaction.author[0].avatar[0].path}`
										: img5
								}
							/>
							<span className="reaction-item__left--name">
								{reaction.author[0].firstName}{" "}
								{reaction.author[0].lastName}
							</span>
						</div>
						<div className="reaction-item__right" />
					</div>
				))}
			</TabPane>
			{reactions.filter((reaction) => reaction.type === 1).length ? (
				<TabPane
					tab={
						<span className="list-reaction-icon">
							<img src={like} alt="" />
							&nbsp;{" "}
							{
								reactions.filter(
									(reaction) => reaction.type === 1
								).length
							}
						</span>
					}
					key="2"
				>
					{getListReactionByType(1)}
				</TabPane>
			) : null}
			{reactions.filter((reaction) => reaction.type === 2).length ? (
				<TabPane
					tab={
						<span className="list-reaction-icon">
							<img src={love} alt="" />
							&nbsp;
							{
								reactions.filter(
									(reaction) => reaction.type === 2
								).length
							}
						</span>
					}
					key="3"
				>
					{getListReactionByType(2)}
				</TabPane>
			) : null}
			{reactions.filter((reaction) => reaction.type === 3).length ? (
				<TabPane
					tab={
						<span className="list-reaction-icon">
							<img src={haha} alt="" />
							&nbsp;
							{
								reactions.filter(
									(reaction) => reaction.type === 3
								).length
							}
						</span>
					}
					key="4"
				>
					{getListReactionByType(3)}
				</TabPane>
			) : null}
			{reactions.filter((reaction) => reaction.type === 4).length ? (
				<TabPane
					tab={
						<span className="list-reaction-icon">
							<img src={wow} alt="" />
							&nbsp;
							{
								reactions.filter(
									(reaction) => reaction.type === 4
								).length
							}
						</span>
					}
					key="5"
				>
					{getListReactionByType(4)}
				</TabPane>
			) : null}
			{reactions.filter((reaction) => reaction.type === 5).length ? (
				<TabPane
					tab={
						<span className="list-reaction-icon">
							<img src={sad} alt="" />
							&nbsp;
							{
								reactions.filter(
									(reaction) => reaction.type === 5
								).length
							}
						</span>
					}
					key="6"
				>
					{getListReactionByType(5)}
				</TabPane>
			) : null}
			{reactions.filter((reaction) => reaction.type === 6).length ? (
				<TabPane
					tab={
						<span className="list-reaction-icon">
							<img src={angry} alt="" />
							&nbsp;
							{
								reactions.filter(
									(reaction) => reaction.type === 6
								).length
							}
						</span>
					}
					key="7"
				>
					{getListReactionByType(6)}
				</TabPane>
			) : null}
		</Tabs>
	);
};
export default ListReactions;
