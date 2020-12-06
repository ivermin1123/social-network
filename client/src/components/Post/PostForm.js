import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import postActions from "../../actions/post.actions";
import { MAX_POST_IMAGE_SIZE } from "../../constants/ImageSize";
import "react-toastify/dist/ReactToastify.css";

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
	const [show, setShow] = useState(false);
	const [files, setFiles] = useState(null);
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();

	const handleReset = () => {
		setDescription("");
		setFiles(null);
	};

	const handleFile = (e) => {
		const { files } = e.target;
		console.log("e.target:", e.target);
		console.log("FILE LIST:", files);

		const error = [];
		if (files && files.length) {
			const arrFile = Array.from(files);
			arrFile.forEach((file) => {
				if (file.size >= MAX_POST_IMAGE_SIZE) {
					error.push({
						message: `🦄 File size should be less then ${
							MAX_POST_IMAGE_SIZE / 1000000
						}MB`,
					});
				}
			});
			if (error.length) {
				toast(error[0].message, configToast);
			}
			setFiles(arrFile);
		}

		// e.target.value = null;
	};

	const handleClick = (e) => {
		e.preventDefault();
		try {
			// Prepare data
			// const fd = new FormData();
			const arrFile = Array.from(files);
			// arrFile.forEach((file) => {
			// 	fd.append("images", file);
			// });
			// fd.append("data", JSON.stringify({ description }));
			const data = { description, path: "post" };
			const dataSaveServer = {
				url: "POST",
				method: "POST",
				data: { description },
			};
			// Redux call
			dispatch(postActions.createPost(arrFile, data, dataSaveServer))
				.then((data) => {
					toast(`🦄 Upload Success`);
					console.log(data);
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
					<img
						src="https://i.pinimg.com/736x/ae/c4/53/aec453161b2f33ffc6219d8a758307a9.jpg"
						alt=""
						className="post-form-top__avt"
					/>
					<button
						type="button"
						className="post-form-top__btn"
						onClick={() => setShow(true)}
					>
						Bạn mình ơi, bạn hang nghĩ gì vậy nè?
					</button>
				</div>
				<div className="post-form-bot">
					<button type="button" className="post-form-bot__btn">
						Anh
					</button>
					<button type="button" className="post-form-bot__btn">
						Tú
					</button>
					<button type="button" className="post-form-bot__btn">
						Nguyễn
					</button>
				</div>
			</div>
			<Modal
				{...props}
				dialogClassName="post-form-modal"
				centered
				animation={false}
				show={show}
				onHide={() => setShow(false)}
			>
				<Modal.Header bsPrefix="post-form-modal__header" closeButton>
					<Modal.Title bsPrefix="post-form-modal__header-title">
						Tạo bài viết
					</Modal.Title>
				</Modal.Header>
				<Modal.Body bsPrefix="post-form-modal__body">
					<img
						src="https://i.pinimg.com/736x/d3/63/54/d363546caad6e492a4921549f174ae5d.jpg"
						alt=""
						className="post-form-modal__body--avt"
					/>
					<span className="post-form-modal__body--author">
						Tu Nguyen
					</span>
					<br />
					<textarea
						value={description}
						type="text"
						className="post-form-modal__body--content"
						placeholder="Bạn mình ơi, bạn đang nghĩ gì vậy nè"
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div className="post-form-modal__footer">
						<input
							id="post-image"
							type="file"
							name="file"
							onChange={(e) => handleFile(e)}
						/>
					</div>
					{/* <img
						src={image ? URL.createObjectURL(image) : ""}
						alt=""
						className="post-form-top__avt"
					/> */}
					{/* <button type="submit">Đăng</button> */}
				</Modal.Body>
				<Modal.Footer>
					<button
						type="button"
						className="post-form-bot__btn"
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
