import styled from "styled-components";

const LikeButton = styled.div`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;

	text-align: center;
	font-weight: 600;
	color: #606770;
	fill: #606770;

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

export default LikeButton;
