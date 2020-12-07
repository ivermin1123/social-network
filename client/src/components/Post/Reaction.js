import React, { useState } from "react";

const Reaction = () => {
	const [reaction] = useState([1, 2, 3]);
	return (
		<>
			(
			<div className="reaction-list" IsShownReaction setIsShownReaction>
				{reaction}
			</div>
			)
		</>
	);
};

export default Reaction;
