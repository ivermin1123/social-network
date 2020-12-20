import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { Popover } from "antd";
import { ToastContainer, toast } from "react-toastify";
import ava from "../../assets/image/ava-1.png";
import LINK_CONSTANT from "../../constants/link.constants";
import { MAX_POST_IMAGE_SIZE } from "../../constants/ImageSize";
import { Theme } from "../../constants/index";
import userAction from "../../actions/user.actions";

const configToast = {
	position: "top-right",
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

const AuthorDetail = ({ ...props }) => {
	const { userData } = props;
	const [show, setShow] = useState(false);
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);
	const dispatch = useDispatch();
	const content = (
		<>
			<div className="item">
				<button type="button" className="item-value">
					<FontAwesomeIcon
						className="icon"
						icon={Theme.ICONS.portrait}
					/>
					Xem ảnh đại diện
				</button>
			</div>
			<div className="item">
				<button
					type="button"
					className="item-value"
					onClick={() => setShow(true)}
				>
					<FontAwesomeIcon
						className="icon"
						icon={Theme.ICONS.images}
					/>
					Cập nhật ảnh đại diện
				</button>
			</div>
		</>
	);
	const handleReset = () => {
		setFile(null);
		setDescription("");
	};

	const handleFile = (e) => {
		const img = e.target.files[0];
		if (img && img.size >= MAX_POST_IMAGE_SIZE) {
			toast(
				`🦄 File size should be less then ${
					MAX_POST_IMAGE_SIZE / 1000000
				}MB`,
				configToast
			);
		}
		if (img && img) {
			setFile(img);
		}
	};
	const handleSave = (e) => {
		e.preventDefault();
		try {
			const data = { path: "user" };
			const dataSaveServer = {
				url: "USER_IMAGE",
				method: "POST",
				data: { description },
			};
			// Redux call
			dispatch(userAction.updateUserImage(file, data, dataSaveServer))
				.then((data) => {
					toast(`🦄 Upload Image Success`);
					console.log(data);
					handleReset();
					setShow(false);
				})
				.catch((err) => {
					toast(`🦄 Upload Image Fail`);
					handleReset();
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};
	return userData ? (
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
			<div className="author__details">
				<Popover
					content={content}
					title={null}
					placement="bottom"
					trigger="click"
					className="ava ava_online"
				>
					{userData.avatar && userData.avatar.length ? (
						<img
							className="ava__pic"
							src={`${LINK_CONSTANT.LINK_S3}${userData.avatar[0].path}`}
							alt=""
						/>
					) : (
						<img className="ava__pic" src={ava} alt="" />
					)}
				</Popover>

				<div className="author__wrap">
					<div className="author__man h2 confirm">
						{userData.firstName ? `${userData.firstName} ` : ""}
						{userData.lastName || ""}
					</div>

					<div className="author__parameters">
						<div className="author__parameter h6">
							{userData.followers
								? `${userData.followers.length} người theo dõi`
								: `${userData.friends.length} bạn bè` || ""}
						</div>
						<div className="author__parameter h6">120 videos</div>
					</div>
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
						<span>Cập nhật ảnh đại diện</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body bsPrefix="post-form-modal__body">
					{!file ? (
						<div className="post-form-modal__body-top">
							<label
								className="btn btn_purple"
								htmlFor="file-upload"
							>
								<div>
									<input
										id="file-upload"
										onChange={(e) => handleFile(e)}
										type="file"
										name="file"
									/>
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.faPlus}
									/>
									Tải ảnh lên
								</div>
							</label>
						</div>
					) : (
						<div className="post-form-modal__body-main">
							<div className="post-form-modal__body-main-top">
								<textarea
									placeholder="Mô tả"
									value={description}
									onChange={(e) => {
										setDescription(e.target.value);
									}}
								/>
								<div className="image-area">
									<img
										key={file}
										className="image-show"
										src={URL.createObjectURL(file)}
										alt="avatar"
									/>
								</div>
								<div className="">
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.globeAsia}
									/>
									<span>
										Ảnh của bạn sẽ được hiển thị công khai
									</span>
								</div>
							</div>
							<div className="post-form-modal__body-main-bottom">
								<button
									type="button"
									className="btn btn_white cancel"
									onClick={() => handleReset()}
								>
									Hủy
								</button>
								<button
									type="button"
									className="btn btn_purple"
									onClick={handleSave}
								>
									Lưu
								</button>
							</div>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	) : null;
};

export default AuthorDetail;
