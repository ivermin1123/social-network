import React, { useState, useEffect } from "react";
import { sortReact, sortTypeReact } from "./PostReactionDisplay";

import like from "../../assets/icons/like.svg";
import love from "../../assets/icons/love.svg";
import haha from "../../assets/icons/haha.svg";
import wow from "../../assets/icons/wow.svg";
import sad from "../../assets/icons/sad.svg";
import angry from "../../assets/icons/angry.svg";

function CommentReactionDisplay(props) {
	const { reactions, onClick } = props;
	const [listReact, setListReact] = useState(reactions);

	useEffect(() => {
		const arrReact = [
			{
				type: 1,
				img: like,
				amount: 0,
			},
			{
				type: 2,
				img: love,
				amount: 0,
			},
			{
				type: 3,
				img: haha,
				amount: 0,
			},
			{
				type: 4,
				img: wow,
				amount: 0,
			},
			{
				type: 5,
				img: sad,
				amount: 0,
			},
			{
				type: 6,
				img: angry,
				amount: 0,
			},
		];
		reactions.forEach((reaction) => {
			arrReact[reaction.type - 1].amount++;
		});
		let arrToShow = arrReact.filter((item) => item.amount > 0);
		arrToShow = arrToShow.sort(sortTypeReact);
		arrToShow = arrToShow.sort(sortReact);
		setListReact(arrToShow);
	}, [reactions]);

	if (!reactions.length || listReact === null) {
		return null;
	}

	return (
		<div
			className="comment-reaction"
			onClick={() => onClick(reactions, true)}
		>
			<span className="comment-reaction__icon">
				<span className="comment-reaction__icon--first ">
					<span>
						<img src={listReact[0].img} alt="" />
					</span>
				</span>
				{listReact[1] && (
					<span className="comment-reaction__icon--second">
						<span>
							<img src={listReact[1].img} alt="" />
						</span>
					</span>
				)}
				{listReact[2] && (
					<span className="comment-reaction__icon--third">
						<span>
							<img src={listReact[2].img} alt="" />
						</span>
					</span>
				)}
			</span>
			<div className="comment-reaction__amout">
				<span>{reactions.length}</span>
			</div>
		</div>
	);
}

export default CommentReactionDisplay;
