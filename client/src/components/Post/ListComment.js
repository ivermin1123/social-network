import React, { useState, useEffect } from "react";
import { Comment, Tooltip, Avatar, Dropdown, Modal } from "antd";
import { LoadingOutlined, SwapRightOutlined } from "@ant-design/icons";
import moment from "moment";
// import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { useDispatch, connect } from "react-redux";
import commentActions from "../../actions/comment.actions";
import LINK_CONSTANT from "../../constants/link.constants";
import ButtonSVG from "../ButtonSVG";
import CommentReaction from "./CommentReaction";
import MenuOptionComment from "./MenuOptionComment";
import CommentReactionDisplay from "./CommentReactionDisplay";
import ListReactions from "./ListReactions";

function ListComment(props) {
	const { user, post, loadingComment } = props;
	const dispatch = useDispatch();
	const [comments, setComments] = useState([]);
	const [visibleModal, setVisibleModal] = useState(false);
	const [reactions, setReactions] = useState();

	const InputComment = (props) => {
		const { parent } = props;
		const [message, setMessage] = useState("");
		const handleSubmit = (e) => {
			e.preventDefault();
			const dataSendServer = parent
				? { postId: post._id, parent, content: message }
				: { postId: post._id, content: message };
			dispatch(commentActions.commentOnPost(dataSendServer)).then(
				(data) => {
					setComments(data);
				}
			);
			setMessage("");
		};
		return (
			<div className="editor-comment">
				<span className="editor-avatar">
					<Avatar
						src={`${LINK_CONSTANT.LINK_S3}${user.avatar[0].path}`}
						size={32}
						style={{ border: "0.3px solid gray" }}
					/>
				</span>
				<div className="editor__wrap">
					<div className="editor__body">
						<div className="editor__field">
							<form onSubmit={handleSubmit}>
								<input
									className="editor__textarea"
									type="text"
									name="message"
									placeholder="Viết bình luận..."
									onChange={(e) => setMessage(e.target.value)}
									value={message}
									required
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const DropDownOption = (props) => {
		// const [optionShow, setOptionShow] = useState(false);
		const { comment } = props;
		return (
			<Dropdown
				overlay={
					<MenuOptionComment
						setComments={setComments}
						post={post}
						comment={comment}
					/>
				}
				placement="bottomRight"
				// visible={optionShow}
				// onClick={() => setOptionShow(!optionShow)}
			>
				<a
					className="ant-dropdown-link"
					onClick={(e) => e.preventDefault()}
				>
					<ButtonSVG
						icon="icon-menu"
						// onClick={() => setOption(!option)}
					/>
				</a>
			</Dropdown>
		);
	};

	useEffect(() => {
		dispatch(commentActions.getCommentsByPost({ postId: post._id })).then(
			(data) => {
				setComments(data);
			}
		);
	}, []);

	const handleClick = (data, isShow) => {
		setReactions(data);
		setVisibleModal(isShow);
	};
	if (loadingComment) {
		return (
			<div
				style={{
					display: "flex",
					margin: "10px",
					paddingTop: "12px",
					paddingBottom: "5px",
					borderTop: "0.5px solid #cfd0d4",
				}}
			>
				<LoadingOutlined
					style={{ fontSize: "30px", color: "#08c", margin: "auto" }}
				/>
			</div>
		);
	}

	const ListCommentChild = (props) => {
		const { comments, parent, setShowChild } = props;
		return (
			<>
				{comments.length
					? comments.map((comment) => (
							<Comment
								key={comment._id}
								actions={[
									<CommentReaction
										setShowChild={setShowChild}
										comment={comment}
										setComments={setComments}
									/>,
								]}
								author={
									<span style={{ fontWeight: "bold" }}>
										{`${comment.author[0].firstName} ${comment.author[0].lastName}`}
									</span>
								}
								avatar={
									<span>
										<Avatar
											src={`${LINK_CONSTANT.LINK_S3}${comment.author[0].avatar[0].path}`}
											alt={`${comment.author[0].firstName} ${comment.author[0].lastName}`}
											size={32}
											style={{
												border: "0.3px solid gray",
											}}
										/>
									</span>
								}
								content={
									<div className="comment-reaction-high">
										<span>{comment.content}</span>
										<CommentReactionDisplay
											onClick={handleClick}
											reactions={comment.reactions}
										/>
									</div>
								}
								datetime={
									<Tooltip
										title={moment(comment.createdAt)
											.locale("vi")
											.format(
												"dddd[,] DD [Tháng] MM [,] YYYY [lúc] HH:mm"
											)}
									>
										<span>
											{moment(comment.createdAt)
												.locale("vi")
												.fromNow()}
										</span>
									</Tooltip>
								}
							/>
					  ))
					: null}
				<InputComment parent={parent} />
			</>
		);
	};

	const CommentItem = (props) => {
		const { comment } = props;
		const [showChild, setShowChild] = useState(false);
		return (
			<>
				<Comment
					key={comment._id}
					actions={[
						<CommentReaction
							comment={comment}
							setComments={setComments}
						/>,
						<span onClick={() => setShowChild(!showChild)}>
							Trả lời
						</span>,
					]}
					author={
						<span style={{ fontWeight: "bold" }}>
							{`${comment.author[0].firstName} ${comment.author[0].lastName}`}
						</span>
					}
					avatar={
						<span>
							<Avatar
								src={`${LINK_CONSTANT.LINK_S3}${comment.author[0].avatar[0].path}`}
								alt={`${comment.author[0].firstName} ${comment.author[0].lastName}`}
								size={32}
								style={{
									border: "0.3px solid gray",
								}}
							/>
						</span>
					}
					content={
						<div className="comment-reaction-high">
							<span>{comment.content}</span>
							<CommentReactionDisplay
								onClick={handleClick}
								reactions={comment.reactions}
							/>
						</div>
					}
					datetime={
						<Tooltip
							title={moment(comment.createdAt)
								.locale("vi")
								.format(
									"dddd[,] DD [Tháng] MM [,] YYYY [lúc] HH:mm"
								)}
						>
							<span>
								{moment(comment.createdAt)
									.locale("vi")
									.fromNow()}
							</span>
						</Tooltip>
					}
				>
					{comment.children.length && !showChild ? (
						<a onClick={() => setShowChild(true)}>
							<SwapRightOutlined />
							{comment.children.length} trả lời
						</a>
					) : null}
					{showChild ? (
						<ListCommentChild
							setShowChild={setShowChild}
							comments={comment.children}
							parent={comment._id}
						/>
					) : null}
				</Comment>
			</>
		);
	};
	return (
		<div className="comment-area">
			<InputComment />
			{(comments.length &&
				comments.map((comment) => (
					<div className="comment-area__body" key={comment._id}>
						<div className="comment-area__body--left">
							<CommentItem comment={comment} />
						</div>
						<div className="comment-area__body--right">
							<DropDownOption comment={comment} />
						</div>
					</div>
				))) ||
				null}
			<Modal
				// title="Danh sách lượt thích"
				className="list-reactions-modal"
				getContainer={false}
				visible={visibleModal}
				footer={null}
				width="455px"
				closable={false}
				onCancel={() => setVisibleModal(false)}
				headStyle={{
					borderRadius: "10px 10px 0 0",
				}}
				style={{ borderRadius: "10px" }}
			>
				<ListReactions reactions={reactions} />
			</Modal>
		</div>
	);
}

const mapStateToProps = (state) => ({
	loadingComment: state.comments.loadingComment,
});

export default connect(mapStateToProps)(ListComment);
