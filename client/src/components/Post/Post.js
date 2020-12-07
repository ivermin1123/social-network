import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import Theme from "../../constants/Theme";
import { CommentButton, LikeButton } from "../_components";
import ListLikes from "./ListLikes";
import Reaction from "./Reaction";

const Post = (props) => {
	const [show, setShow] = useState(false);
	const [isShownReaction, setIsShownReaction] = useState(false);
	const { post } = props;
	const { avt, name, created, content, img, likes, comments } = post;

	const handleClick = () => {};
	return (
		<>
			<div className="post">
				<div className="post-header">
					<img src={avt} alt="" className="post-header__avt" />
					<div className="post-header__name">{name}</div>
					<div className="post-header__created">{created}</div>
				</div>
				<div className="post-body">
					<div className="post-body__content">{content}</div>
					<img src={img} alt="" className="post-body__image" />
					<div className="post-body__react">
						<button
							type="button"
							className="post-body__react--likes"
							onClick={() => setShow(true)}
							isShownReaction={isShownReaction}
							onMouseEnter={() => setIsShownReaction(true)}
							onMouseLeave={() => setIsShownReaction(false)}
						>
							<FontAwesomeIcon
								icon={Theme.ICONS.thumbsUp}
								color="blue"
							/>
							{likes}
						</button>
						<Reaction
							isShownReaction={isShownReaction}
							setIsShownReaction={setIsShownReaction}
						/>
						<div className="post-body__react--comments">
							{comments} comments
						</div>
					</div>

					<div className="post-body__interact">
						<LikeButton className="post-body__interact--likes" />
						<CommentButton className="post-body__interact--comments" />
					</div>
				</div>
			</div>
			<Modal
				{...props}
				dialogClassName="list-likes-modal"
				centered
				animation={false}
				show={show}
				onHide={() => setShow(false)}
				onClick={handleClick}
			>
				<Modal.Header bsPrefix="list-likes__header">
					<Modal.Title bsPrefix="list-likes-modal__header-title">
						List Likes
					</Modal.Title>
				</Modal.Header>

				<ListLikes post={post} />
			</Modal>
		</>
	);
};

export default Post;
