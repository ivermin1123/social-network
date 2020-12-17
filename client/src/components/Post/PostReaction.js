import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Reaction from "./Reaction";
import ReactionsWrapper from "./ReactionWrapper";

import thumUp from "../../assets/icons/thumb-up.svg";
import like from "../../assets/icons/like.svg";
import love from "../../assets/icons/love.svg";
import haha from "../../assets/icons/haha.svg";
import wow from "../../assets/icons/wow.svg";
import sad from "../../assets/icons/sad.svg";
import angry from "../../assets/icons/angry.svg";

import reactionActions from "../../actions/reaction.actions";

const LikeButton = styled.div`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;

	text-align: center;
	font-weight: 600;
	// color: #606770;
	// fill: #606770;

	padding: 15px 20px;
	// border-radius: 100px;
	// box-shadow: 0 0px 20px -2px rgba(0, 0, 0, 0.2);

	cursor: pointer;
	&:after {
		position: absolute;
		content: "";
		padding: 0;
	}
`;

export const list = {
	visible: {
		opacity: 1,
		y: 0,
		transformOrigin: "50%",
		scale: 1,
		transition: {
			staggerChildren: 0.04,
			delayChildren: 0,
		},
	},
	hidden: {
		opacity: 0,
		y: 50,
		transformOrigin: "50%",
		scale: 0,
	},
};

function setReactionPost(type, setReactIcon, setReactName) {
	switch (type) {
		case 1:
			setReactIcon(like);
			setReactName("Thích");
			break;
		case 2:
			setReactIcon(love);
			setReactName("Yêu thích");
			break;
		case 3:
			setReactIcon(haha);
			setReactName("Haha");
			break;
		case 4:
			setReactIcon(wow);
			setReactName("Wow");
			break;
		case 5:
			setReactIcon(sad);
			setReactName("Buồn");
			break;
		case 6:
			setReactIcon(angry);
			setReactName("Phẫn nộ");
			break;
		default:
			break;
	}
}

function PostReaction(props) {
	const { postN, setPostN } = props;
	const dispatch = useDispatch();
	const { infoUser } = useSelector((state) => state.users);
	const [isHover, setIsHover] = useState(false);
	const [reactName, setReactName] = useState("Thích");
	const [reactIcon, setReactIcon] = useState(thumUp);
	const handleLike = (type) => {
		setIsHover(false);
		setReactionPost(type, setReactIcon, setReactName);
		dispatch(reactionActions.likePost(postN._id, type)).then((res) => {
			setPostN(res.data);
		});
	};

	// hover for reaction
	let isLike = 0;
	useEffect(() => {
		postN.reactions.forEach((reaction) => {
			if (reaction.author[0]._id === infoUser._id) {
				isLike = reaction.type;
			}
		});
		if (isLike) {
			setReactionPost(isLike, setReactIcon, setReactName);
		} else {
			setReactIcon(thumUp);
			setReactName("Thích");
		}
	}, [postN]);

	return (
		<LikeButton
			type="button"
			className="post-body__interact-option reactions"
			onMouseOver={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			// onClick={() => handleLike(1)}
		>
			<Reaction
				name={reactName}
				icon={reactIcon}
				className="reactions-show"
			/>
			<span>{reactName}</span>
			<ReactionsWrapper
				initial="hidden"
				animate={isHover ? "visible" : "hidden"}
				variants={list}
			>
				<Reaction name={1} icon={like} handleLike={handleLike} />
				<Reaction name={2} icon={love} handleLike={handleLike} />
				<Reaction name={3} icon={haha} handleLike={handleLike} />
				<Reaction name={4} icon={wow} handleLike={handleLike} />
				<Reaction name={5} icon={sad} handleLike={handleLike} />
				<Reaction name={6} icon={angry} handleLike={handleLike} />
			</ReactionsWrapper>
		</LikeButton>
	);
}

export default PostReaction;
