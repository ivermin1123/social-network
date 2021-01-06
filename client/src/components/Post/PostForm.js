import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FbImageLibrary from "react-fb-image-grid";
import { Avatar } from "antd";

import { Theme } from "../../constants/index";
import postActions from "../../actions/post.actions";
import { MAX_POST_IMAGE_SIZE } from "../../constants/ImageSize";
import LINK_CONSTANT from "../../constants/link.constants";
import "../../assets/styles/_postForm.scss";
import ava from "../../assets/image/ava-1.png";

const configToast = {
	position: "top-right",
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

const PostForm = ({ ...props }) => {
	const userData = useSelector((state) => state.users.infoUser);
	const [show, setShow] = useState(false);
	const [files, setFiles] = useState([]);
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();

	const handleReset = () => {
		setDescription("");
		setFiles([]);
	};

	const handleFile = (e) => {
		let list = [];
		list = [...files];
		const listFile = e.target.files;
		if (listFile && listFile.length) {
			let i = listFile.length;
			while (i >= 0) {
				const img = listFile[i];
				if (img && img.size >= MAX_POST_IMAGE_SIZE) {
					toast(
						`🦄 File size should be less then ${
							MAX_POST_IMAGE_SIZE / 1000000
						}MB`,
						configToast
					);
				}
				if (img && img.size < MAX_POST_IMAGE_SIZE) {
					list.push(img);
				}
				i--;
			}
		}
		setFiles(list);
	};

	const handleClick = (e) => {
		e.preventDefault();
		try {
			// Prepare data
			const arrFile = Array.from(files);
			const data = { path: "post" };
			const dataSaveServer = {
				url: "POST",
				method: "POST",
				data: { description },
			};
			console.log({ arrFile });
			// Redux call
			dispatch(postActions.createPost(arrFile, data, dataSaveServer))
				.then(() => {
					toast(`🦄 Upload Success`);
					handleReset();
					setShow(false);
				})
				.catch((err) => {
					toast(`🦄 Upload Fail`);
					handleReset();
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const ImageGrid = () => {
		const imageArray = [];
		files.forEach((item) => {
			imageArray.push(URL.createObjectURL(item));
		});

		return (
			<>
				{files.length ? (
					<div className="image-area">
						<button type="button" onClick={() => setFiles([])}>
							x
						</button>
						<FbImageLibrary images={imageArray} hideOverlay />
					</div>
				) : null}
			</>
		);
	};
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="post-form">
				<div className="post-form-top">
					{userData.avatar && userData.avatar.length ? (
						<Avatar
							className="img_avt"
							src={`${LINK_CONSTANT.LINK_S3}${userData.avatar[0].path}`}
						/>
					) : (
						<Avatar className="img_avt" src={ava} />
					)}
					<button
						type="button"
						className="post-form-top__btn"
						onClick={() => setShow(true)}
					>
						Bạn ơi, bạn đang nghĩ gì thế?
					</button>
				</div>
				{/* <div className="post-form-bot">
					<button type="button" className="post-form-bot__btn">
						Anh
					</button>
					<button type="button" className="post-form-bot__btn">
						Tú
					</button>
					<button type="button" className="post-form-bot__btn">
						Nguyễn
					</button>
				</div> */}
			</div>
			<Modal
				{...props}
				dialogClassName="post-form-modal"
				centered
				animation={false}
				show={show}
				onHide={() => {
					handleReset();
					setShow(false);
				}}
			>
				<Modal.Header bsPrefix="post-form-modal__header" closeButton>
					<Modal.Title bsPrefix="post-form-modal__header-title">
						Tạo bài viết
					</Modal.Title>
				</Modal.Header>
				<Modal.Body bsPrefix="post-form-modal__body">
					<div className="post-form-modal__body-account">
						{userData.avatar && userData.avatar.length ? (
							<Avatar
								className="img_avt"
								src={`${LINK_CONSTANT.LINK_S3}${userData.avatar[0].path}`}
							/>
						) : (
							<Avatar className="img_avt" src={ava} />
						)}
						<span className="post-form-modal__body-account-author">
							{userData.firstName} {userData.lastName}
						</span>
					</div>
					<div className="post-form-modal__body-content">
						<textarea
							value={description}
							type="text"
							placeholder="Bạn ơi, bạn đang nghĩ gì thế?"
							onChange={(e) => setDescription(e.target.value)}
						/>
						<ImageGrid />
					</div>
					<div className="post-form-modal__footer">
						<label
							className="custom-file-upload"
							htmlFor="file-upload"
						>
							<span>Thêm ảnh vào bài viết</span>
							<input
								id="file-upload"
								onChange={(e) => handleFile(e)}
								type="file"
								name="file"
								multiple
							/>
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.images}
							/>
						</label>
					</div>
				</Modal.Body>
				<Modal.Footer bsPrefix="post-form-modal__post-footer">
					<button
						type="button"
						// disabled={description ? "true" : "false"}
						className="btn btn_purple"
						onClick={handleClick}
					>
						Đăng
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default PostForm;
