import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { list } from "./Post";

const ReactionWrapper = styled.div`
	position: relative;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background-color: white;
	transition: 0.2s;
	transform-origin: center bottom;
	cursor: pointer;

	&:hover {
		transform: scale(1.3);
		transition: 0.2s;
	}

	&:after {
		content: attr(data-reaction-name);
		position: absolute;
		top: 0px;
		left: 0;
		transform: translateX(-50%);

		// padding: 5px;
		// font-size: 12px;
		// background-color: white;
		color: #606770;
		border-radius: 5px;
		text-transform: capitalize;
		font-weight: 400;
	}
`;
const ReactionImage = styled.img`
	width: 100%;
	height: 100%;
`;

const Reaction = ({ name, icon, callback }) => {
	return (
		<motion.div variants={list}>
			<ReactionWrapper>
				<ReactionImage
					name={name}
					src={icon}
					onClick={() => callback(name)}
				/>
			</ReactionWrapper>
		</motion.div>
	);
};

export default Reaction;
