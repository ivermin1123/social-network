import axios from "axios";
import imageCompression from "browser-image-compression";
import "regenerator-runtime/runtime";
import { CF_ROUTE_PUBLIC, CF_ROUTE_POST } from "../config/route";
import configAxios from "../helpers/auth-header";

/**
 * Name: Lấy danh sách tất cả các link để upload s3
 * Author: HuynhVinh(14/10/2020)
 */
async function ListLinkUploadS3(files, data) {
	try {
		const listLinkupLoadS3 = [];
		let isError = false;
		const promises = [];
		for (let i = 0; i < files.length; i++) {
			const { name, size, type } = files[i];
			data.name = name;
			data.size = size;
			data.type = type;

			promises.push(
				axios({
					url: CF_ROUTE_PUBLIC.GENERATE_LINK_S3,
					method: "POST",
					data,
					headers: configAxios.headers,
				}).then((response) => {
					if (!response.error) {
						const { linkUpload, path, type } = response.data;
						const urlS3 = linkUpload.data.url;
						listLinkupLoadS3.push({
							urlS3,
							file: files[i],
							pathFile: path,
							type,
						});
					}
				})
			);
		}

		await Promise.all(promises).catch((err) => {
			console.log(err);
			isError = true;
		});

		if (isError) return { error: true };

		return { error: false, data: listLinkupLoadS3 };
	} catch (error) {
		return { error: true, message: error.message };
	}
}

/**
 * Name: duyệt mảng các urlS3 để  call ajax tới server aws S3
 * Author: HuynHVinh(15/10/2020)
 * Update:
 * 	- ...
 */
function ClientSendMutilFileToS3({ listLinkupLoadS3, files }) {
	try {
		const processingUploadS3 = [];
		if (!listLinkupLoadS3) {
			return { error: true, message: "array is not define " };
		}
		for (let i = 0; i < listLinkupLoadS3.length; i++) {
			const file = files[i];
			const { urlS3, type } = listLinkupLoadS3[i];

			// upload lên s3
			if (urlS3) {
				// AjaxClientToS3 là function call ajax tới server
				processingUploadS3.push(
					axios({
						url: urlS3,
						method: "PUT",
						data: file,
						headers: {
							"Content-Type": type,
						},
					})
						.then(() => {
							return { message: "upload_sccuess", urlS3 };
						})
						.catch(() => {
							return { message: "upload_fail", error: true };
						})
				);
			} else {
				return { message: "upload_fail", error: true };
			}
		}
		return { error: false, data: processingUploadS3 };
	} catch (error) {
		return { error: true, message: error.message };
	}
}

/* Function tiến tình upload file(progress) */

function ProgressUploadFile(e) {
	if (e.lengthComputable) {
		const max = e.total;
		const current = e.loaded;
		const Percentage = (current * 100) / max;
		console.log(`${parseInt(Percentage, 10)}%`);
	}
}

/**
 * Name: compress image
 * Author: HuynHVinh(15/10/2020)
 * Update:
 * 	- ...
 */
function handleImageUpload(file, maxWidthOrHeight) {
	const { type, name } = file;
	return new Promise((resolve) => {
		if (type.includes("image")) {
			try {
				console.log("----------------->");
				const imageFile = file;
				maxWidthOrHeight = 6240 * 0.7;
				console.log(file.size);
				console.log(
					"originalFile instanceof Blob",
					imageFile instanceof Blob
				); // true
				console.log(
					`originalFile size ${imageFile.size / 1024 / 1024} MB`
				);
				const options = {
					maxSizeMB: 1,
					maxWidthOrHeight,
					useWebWorker: true,
				};
				imageCompression(imageFile, options)
					.then((compressedFile) => {
						console.log(
							"compressedFile instanceof Blob",
							compressedFile
						); // true
						console.log(
							`compressedFile size ${
								compressedFile.size / 1024 / 1024
							} MB`
						); // smaller than maxSizeMB
						compressedFile.lastModifiedDate = new Date();

						// Conver the blob to file
						const convertedBlobFile = new File(
							[compressedFile],
							name,
							{ type, lastModified: Date.now() }
						);

						return resolve({
							error: false,
							message: "compress_Success",
							data: convertedBlobFile,
						});
					})
					.catch((error) => {
						console.log(error.message);
						return resolve({
							message: "compress_fail",
							error: true,
						});
					});
			} catch (error) {
				console.log({ developer: "cant_compress_img_step2" });
				resolve({ message: "compress_fail", error: true });
			}
		} else {
			resolve({ message: "compress_fail", error: true });
		}
	});
}

// author: HuynhVinh
// update  : not compress file with size than 400MB
function UploadFileS3(files, data, dataSaveServer) {
	console.log({ files });
	return new Promise((resolve) => {
		if (files) {
			(async () => {
				if (!Array.isArray(files)) {
					files = [files];
				}

				let listLinkupLoadS3 = await ListLinkUploadS3(files, data);
				console.log("listLinkupLoadS3", { listLinkupLoadS3 });
				// Duyet mang link upload s3
				if (listLinkupLoadS3.error) return;

				listLinkupLoadS3 = listLinkupLoadS3.data;
				let maxWidthOrHeight;
				let height = 5000;
				let width = 5000;
				const newListFile = [];
				const promises = [];
				files.forEach(async (file) => {
					// doc chieu cao va chieu rong cua anh
					const img = new Image();
					const objectUrl = URL.createObjectURL(file);
					img.onload = () => {
						height = this.height;
						width = this.width;
						URL.revokeObjectURL(objectUrl);
					};
					img.src = objectUrl;

					const isCompress = file.size / 1024;
					if (isCompress > 400) {
						if (height > width) {
							maxWidthOrHeight = height;
						} else {
							maxWidthOrHeight = width;
						}

						// tien hanh upload
						promises.push(
							handleImageUpload(file, maxWidthOrHeight).then(
								(res) => {
									if (!res.error) {
										newListFile.push(res.data);
									} else {
										newListFile.push(file);
									}
								}
							)
						);
					} else {
						newListFile.push(file);
					}
				});

				await Promise.all(promises).catch((error) => {
					console.log(error.message);
				});

				// console.log({ newListFile });
				// console.log(newListFile);
				// console.log(JSON.stringify(newListFile));
				// console.log(newListFile[1]);
				// console.log(typeof newListFile);
				const arrayFile = [];
				for (let i = 0; i < listLinkupLoadS3.length; i++) {
					const infoFile = {};
					if (listLinkupLoadS3[i].file.name === newListFile[i].name) {
						infoFile.name = newListFile[i].name;
						infoFile.type = newListFile[i].type;
						infoFile.size = newListFile[i].size;
						infoFile.path = listLinkupLoadS3[i].pathFile;

						if (newListFile[i].size > listLinkupLoadS3[i].size) {
							infoFile.size = listLinkupLoadS3[i].size;
						}
						arrayFile.push(infoFile);
					}
				}
				dataSaveServer.data.files = arrayFile;

				// dua anh len S3
				const processingUploadS3 = ClientSendMutilFileToS3({
					listLinkupLoadS3,
					files: newListFile,
				});

				if (!processingUploadS3.error && processingUploadS3.data) {
					// Promise.all sẽ đợi cho đến khi tất cả các promises được giải quyết
					const listPromise = processingUploadS3.data;
					Promise.all(listPromise).then(async (response) => {
						let isUploadFail = false;
						for (let i = 0; i < response.length; i++) {
							if (response[i].error === true) {
								isUploadFail = true;
								break;
							}
						}
						console.log({ isUploadFail });
						if (!isUploadFail) {
							// Upload thành công lưu thông tin về server
							const { url, method, data } = dataSaveServer;
							let urlCall;
							switch (url) {
								case "POST":
									urlCall = CF_ROUTE_POST.CREATE_POST;
									break;
								default:
									urlCall = null;
									break;
							}

							if (urlCall) {
								await axios({
									url: urlCall,
									method,
									data,
									headers: configAxios.headers,
								})
									.then((resp) => {
										return resolve(resp.data);
									})
									.catch((error) => {
										console.log(error);
									});
							} else {
								console.log({
									developer: "fail_URL_CALL",
								});
							}
						} else {
							console.log({
								developer:
									"upload_client_to_s3_fail_fail._step3",
							});
						}
					});
				}
			})();
		} else {
			console.log("file danh sach _ file not define");
		}
	});
}

const uploadFileS3 = {
	ClientSendMutilFileToS3,
	ListLinkUploadS3,
	UploadFileS3,
	ProgressUploadFile,
};
export default uploadFileS3;
