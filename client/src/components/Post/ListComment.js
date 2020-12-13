import React from "react";

const ListComment = () => {
	return (
		<div className="comment-area">
			<div className="comment-list">
				<div className="comment-list-left">
					<div>
						<img
							src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/37219759_789164267954095_7853071637418082304_o.jpg?_nc_cat=108&ccb=2&_nc_sid=e3f864&_nc_ohc=_gkEKZIIipAAX_IL5wJ&_nc_ht=scontent.fsgn2-3.fna&oh=755c486ebfaac7383ec70bb92ff5211e&oe=5FEB72A8"
							alt=""
						/>
					</div>
				</div>
				<div className="comment-list-right">
					<div className="comment-list-right__content">
						<div>Hoang Yen</div>
						<div>Hay quá</div>
					</div>
					<div className="comment-list-right__option" />
				</div>
			</div>
			<div className="new-comment">
				<div className="new-comment-avatar">
					<img
						src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/37219759_789164267954095_7853071637418082304_o.jpg?_nc_cat=108&ccb=2&_nc_sid=e3f864&_nc_ohc=_gkEKZIIipAAX_IL5wJ&_nc_ht=scontent.fsgn2-3.fna&oh=755c486ebfaac7383ec70bb92ff5211e&oe=5FEB72A8"
						alt=""
					/>
				</div>
				<div className="new-comment-input" />
			</div>
		</div>
	);
};

export default ListComment;
