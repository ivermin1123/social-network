import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Reaction from "./Reaction";
import ReactionsWrapper from "./ReactionWrapper";

import { list } from "./PostReaction";
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

	padding: 0px 5px 0px 0px;
	// border-radius: 100px;
	// box-shadow: 0 0px 20px -2px rgba(0, 0, 0, 0.2);

	cursor: pointer;
	&:after {
		position: absolute;
		content: "";
		padding: 0;
	}
`;

const setReactionPost = (type, setReactName, setTypeR, setColorText) => {
	setTypeR(type);
	switch (type) {
		case 1:
			setColorText("#2078F6");
			setReactName("Thích");
			break;
		case 2:
			setColorText("#F33E58");
			setReactName("Yêu thích");
			break;
		case 3:
			setColorText("#F7B125");
			setReactName("Haha");
			break;
		case 4:
			setColorText("#F7B125");
			setReactName("Wow");
			break;
		case 5:
			setColorText("#F7B125");
			setReactName("Buồn");
			break;
		case 6:
			setColorText("#E9710F");
			setReactName("Phẫn nộ");
			break;
		default:
			break;
	}
};

function CommentReaction(props) {
	const { setPost, post, comment } = props;
	const dispatch = useDispatch();
	const { infoUser } = useSelector((state) => state.users);
	const [isHover, setIsHover] = useState(false);
	const [reactName, setReactName] = useState("Thích");
	// const [reactIcon, setReactIcon] = useState(thumUp);
	const [colorText, setColorText] = useState("#65676B");
	const [typeR, setTypeR] = useState();

	const handleLike = (type) => {
		setIsHover(false);
		setReactionPost(type, setReactName, setTypeR, setColorText);
		dispatch(
			reactionActions.likeComment({
				postId: post._id,
				commentId: comment._id,
				type,
			})
		).then((data) => {
			setPost(data[0]);
		});
	};

	const handleLikeButton = () => {
		setIsHover(false);
		setReactionPost(typeR, setReactName, setTypeR, setColorText);
		dispatch(
			reactionActions.likeComment({
				postId: post._id,
				commentId: comment._id,
				type: typeR,
			})
		).then((data) => {
			setPost(data[0]);
			setTypeR(1);
		});
	};

	// hover for reaction
	let isLike = 0;
	useEffect(() => {
		comment.reactions.forEach((reaction) => {
			if (reaction.author[0]._id === infoUser._id) {
				isLike = reaction.type;
			}
		});
		if (isLike) {
			setReactionPost(isLike, setReactName, setTypeR, setColorText);
		} else {
			// setReactIcon(thumUp);
			setReactName("Thích");
			setColorText("#65676B");
		}
	}, [comment]);

	const styleWrap = {
		width: "35px",
		height: "30px",
	};
	return (
		<>
			<LikeButton
				type="button"
				className="post-body__interact-option reactions"
				onMouseOver={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={() => handleLikeButton()}
			>
				<span style={{ color: colorText }}>{reactName}</span>
			</LikeButton>
			<ReactionsWrapper
				initial="hidden"
				animate={isHover ? "visible" : "hidden"}
				variants={list}
				onMouseOver={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				style={{
					width: "235px",
					bottom: "20px",
					left: "-40px",
					padding: "5px",
				}}
			>
				<Reaction
					styleWrap={styleWrap}
					name={1}
					icon={like}
					handleLike={handleLike}
				/>
				<Reaction
					styleWrap={styleWrap}
					name={2}
					icon={love}
					handleLike={handleLike}
				/>
				<Reaction
					styleWrap={styleWrap}
					name={3}
					icon={haha}
					handleLike={handleLike}
				/>
				<Reaction
					styleWrap={styleWrap}
					name={4}
					icon={wow}
					handleLike={handleLike}
				/>
				<Reaction
					styleWrap={styleWrap}
					name={5}
					icon={sad}
					handleLike={handleLike}
				/>
				<Reaction
					styleWrap={styleWrap}
					name={6}
					icon={angry}
					handleLike={handleLike}
				/>
			</ReactionsWrapper>
		</>
	);
}

export default CommentReaction;
