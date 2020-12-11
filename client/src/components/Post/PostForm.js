import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../constants/index";
import postActions from "../../actions/post.actions";
import { MAX_POST_IMAGE_SIZE } from "../../constants/ImageSize";
import "react-toastify/dist/ReactToastify.css";

// const configToast = {
// 	position: "top-right",
// 	autoClose: 1000,
// 	hideProgressBar: false,
// 	closeOnClick: true,
// 	pauseOnHover: true,
// 	draggable: true,
// 	progress: undefined,
// };

const PostForm = ({ ...props }) => {
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
				if (listFile[i] && listFile[i].size < MAX_POST_IMAGE_SIZE) {
					const img = listFile[i];
					list.push(URL.createObjectURL(img));
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
						Bạn mình ơi, bạn đang nghĩ gì vậy nè?
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
						<img
							src="https://i.pinimg.com/736x/d3/63/54/d363546caad6e492a4921549f174ae5d.jpg"
							alt=""
							className="post-form-modal__body-account-avt"
						/>
						<span className="post-form-modal__body-account-author">
							Tu Nguyen
						</span>
					</div>
					<div className="post-form-modal__body--content">
						<textarea
							value={description}
							type="text"
							placeholder="Bạn mình ơi, bạn đang nghĩ gì vậy nè"
							onChange={(e) => setDescription(e.target.value)}
						/>
						{files && files.length > 0 ? (
							<div className="image-area">
								{files.map((item) => {
									return (
										<img
											style={{
												width: "50%",
											}}
											src={item}
											alt="avatar"
										/>
									);
								})}
							</div>
						) : null}
					</div>
					<div className="post-form-modal__footer row">
						<div className="post-form-modal__footer-left col">
							Thêm ảnh vào bài viết
						</div>
						<div className="post-form-modal__footer-right col">
							<label
								className="custom-file-upload"
								htmlFor="file-upload"
							>
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
					</div>
				</Modal.Body>
				<Modal.Footer bsPrefix="post-form-modal__post-footer">
					<button
						style={
							description.length || files
								? {
										backgroundColor: "#1877F2",
										color: "white",
										cursor: "pointer",
								  }
								: null
						}
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
