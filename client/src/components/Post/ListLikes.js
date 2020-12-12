import React from "react";

const ListLikes = (props) => {
	const { post } = props;
	const { listLikes } = post;
	return (
		<ul className="list-likes">
			{listLikes
				? listLikes.map((like) => {
					return <li key={like}> {like} </li>;
				})
				: null}
		</ul>
	);
};
export default ListLikes;
