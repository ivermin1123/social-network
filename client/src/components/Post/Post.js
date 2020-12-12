import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { Theme } from "../../constants/index";
import { CommentButton, LikeButton } from "../_components";
import ListLikes from "./ListLikes";
import img5 from "../../assets/image/avatar-5.png";
import Reaction from "./Reaction";

// import { ThumbUp } from "../../Icons/_icon";
import like from "../../assets/icons/like.svg";
import thumUp from "../../assets/icons/thumb-up.svg";
import love from "../../assets/icons/love.svg";
import haha from "../../assets/icons/haha.svg";
import wow from "../../assets/icons/wow.svg";
import sad from "../../assets/icons/sad.svg";
import angry from "../../assets/icons/angry.svg";
import ReactionsWrapper from "./ReactionWrapper";
import ListComment from "./ListComment";

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
	const [showComment, setShowComment] = useState(false);
	const [reactName, setReactName] = useState("Like");
	const [reactIcon, setReactIcon] = useState(thumUp);
	const { post } = props;
	const { author, comments, createdAt, description, files, reactions } = post;
	// hover for reaction
	const [isHover, setIsHover] = useState(false);

	const handleLike = () => {
		console.log(post._id);
		setIsHover(false);
		setReactName("VL");
		setReactIcon(angry);
	};

	const callback = (name) => {
		console.log(name);
	};
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
							className="post-body__interact-option reactions"
							onMouseOver={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
							onClick={() => handleLike()}
						>
							<Reaction
								name={reactName}
								icon={reactIcon}
								className="reactions-show"
							/>
							<span>Thích</span>
							{/* <ThumbUp />
							&nbsp;Like */}
							<ReactionsWrapper
								initial="hidden"
								animate={isHover ? "visible" : "hidden"}
								variants={list}
							>
								<Reaction
									name="like"
									icon={like}
									callback={callback}
								/>
								<Reaction
									name="love"
									icon={love}
									callback={callback}
								/>
								<Reaction
									name="haha"
									icon={haha}
									callback={callback}
								/>
								<Reaction
									name="wow"
									icon={wow}
									callback={callback}
								/>
								<Reaction
									name="sad"
									icon={sad}
									callback={callback}
								/>
								<Reaction
									name="angry"
									icon={angry}
									callback={callback}
								/>
							</ReactionsWrapper>
						</LikeButton>

						<div className="post-body__interact-option comments">
							<button type="button" onClick={()=> setShowComment(true)}>
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.commentAlt}
								/>
								<span>Comment</span>
							</button>
						</div>
						{/* <CommentButton/> */}
					</div>
					<ListComment show={showComment} />
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
