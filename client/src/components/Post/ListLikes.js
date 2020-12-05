import React from "react";

const ListLikes = (props) => {
	const { post } = props;
	const { listLikes } = post;
	return (
		<ul className="list-likes">
			{listLikes
				? listLikes.map((like) => {
						return <li> {like} </li>;
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  })
				: null}
		</ul>
	);
};
export default ListLikes;
