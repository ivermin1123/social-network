import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { Theme } from "../../constants/index";
import { CommentButton, LikeButton } from "../_components";
import ListLikes from "./ListLikes";
import img5 from "../../assets/image/avatar-5.png";
import Reaction from "./Reaction";

import { Like } from "../../Icons/_icon";
import like from "../../assets/icons/like.svg";
import love from "../../assets/icons/love.svg";
import haha from "../../assets/icons/haha.svg";
import wow from "../../assets/icons/wow.svg";
import sad from "../../assets/icons/sad.svg";
import angry from "../../assets/icons/angry.svg";
import ReactionsWrapper from "./ReactionWrapper";

const LINK_S3 = "https://socialawsbucket.s3-ap-southeast-1.amazonaws.com/";

export const list = {
	visible: {
		opacity: 1,
		y: 0,
		transformOrigin: "50%",
		scale: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.04,
		},
	},
	hidden: {
		opacity: 0,
		y: 50,
		transformOrigin: "50%",
		scale: 0,
	},
};

const Post = (props) => {
	const [show, setShow] = useState(false);

	const { post } = props;
	const { author, comments, createdAt, description, files, reactions } = post;
	// hover for reaction
	const [isHover, setIsHover] = useState(false);
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
						<LikeButton
							type="button"
							className="post-body__interact--reactions"
							onMouseOver={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
						>
							<Like />
							<ReactionsWrapper
								initial="hidden"
								animate={isHover ? "visible" : "hidden"}
								variants={list}
							>
								<Reaction icon={like} />
								<Reaction icon={love} />
								<Reaction icon={haha} />
								<Reaction icon={wow} />
								<Reaction icon={sad} />
								<Reaction icon={angry} />
							</ReactionsWrapper>
						</LikeButton>

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
			>
				<Modal.Header bsPrefix="list-likes__header">
					<Modal.Title bsPrefix="list-likes-modal__header-title">
						List Likes
					</Modal.Title>
				</Modal.Header>
				<ListLikes reactions={reactions} /> <Reaction />
			</Modal>
		</>
	);
};

export default Post;
