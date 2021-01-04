import React, { useState, useEffect } from "react";

import like from "../../assets/icons/like.svg";
import love from "../../assets/icons/love.svg";
import haha from "../../assets/icons/haha.svg";
import wow from "../../assets/icons/wow.svg";
import sad from "../../assets/icons/sad.svg";
import angry from "../../assets/icons/angry.svg";

export const sortReact = (a, b) => {
	if (a.amount < b.amount) {
		return 1;
	}
	if (a.amount > b.amount) {
		return -1;
	}
	return 0;
};

export const sortTypeReact = (a, b) => {
	if (a.type < b.type) {
		return -1;
	}
	if (a.type > b.type) {
		return 1;
	}
	return 0;
};

function PostReactionDisplay(props) {
	const { post, onClick } = props;
	const { reactions } = post;
	const [listReact, setListReact] = useState(null);

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
	}, [post]);

	if (!reactions.length || listReact === null || !listReact.length) {
		return null;
	}
	return (
		<div className="react__display-react" onClick={onClick}>
			<span className="react__display-react--reaction">
				<span className="react--reaction-first react--reaction">
					<span>
						<img src={listReact[0].img} alt="" />
					</span>
				</span>
				{listReact[1] && (
					<span className="react--reaction-second react--reaction">
						<span>
							<img src={listReact[1].img} alt="" />
						</span>
					</span>
				)}
				{listReact[2] && (
					<span className="react--reaction-third react--reaction">
						<span>
							<img src={listReact[2].img} alt="" />
						</span>
					</span>
				)}
			</span>
			<div className="react__display-react--amount">
				<span>{reactions.length}</span>
			</div>
		</div>
	);
}

export default PostReactionDisplay;
