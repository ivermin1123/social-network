import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { Theme } from "../../constants/index";
import { CommentButton, LikeButton } from "../_components";
import ListLikes from "./ListLikes";
import img5 from "../../assets/image/avatar-5.png";

const LINK_S3 = "https://socialawsbucket.s3-ap-southeast-1.amazonaws.com/";

const Post = (props) => {
	const [show, setShow] = useState(false);
	const { post } = props;
	const { author, comments, createdAt, description, files, reactions } = post;

	const handleClick = () => {};
	return (
		<>
			<div className="post">
				<div className="post-header">
					<img
						src={author.avatar || img5}
						alt=""
						className="post-header__avt"
					/>
					<div className="post-header__name">{author.username}</div>
					<div className="post-header__created">
						{moment(createdAt).locale("vi").fromNow()}
					</div>
				</div>
				<div className="post-body">
					<div className="post-body__content">{description}</div>
					<img
						src={files.length ? `${LINK_S3}${files[0].path}` : null}
						alt=""
						className="post-body__image"
					/>
					<div className="post-body__react">
						<button
							type="button"
							className="post-body__react--likes"
							onClick={() => setShow(true)}
						>
							<FontAwesomeIcon
								icon={Theme.ICONS.thumbsUp}
								color="blue"
							/>
							{reactions.length}
						</button>
						<div className="post-body__react--comments">
							{comments.length
								? `${comments.lenght} bình luận`
								: null}
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

				<ListLikes reactions={reactions} />
			</Modal>
		</>
	);
};

export default Post;
