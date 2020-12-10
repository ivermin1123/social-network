import axios from "axios";
import { CF_ROUTE_USER } from "../config/route";
import configAxios from "../helpers/auth-header";

function logout() {
	localStorage.removeItem("user");
	localStorage.setItem("logout", Date.now());
}

function login(email, password) {
	return axios
		.post(CF_ROUTE_USER.LOGIN, {
			email,
			password,
		})
		.then((response) => {
			if (response.data.user) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			console.log(response.data);
			return response.data;
		});
}

function changePassword(password, newPassword) {
	return axios
		.post(
			CF_ROUTE_USER.CHANGE_PASSWORD,
			{
				password,
				newPassword,
			},
			configAxios
		)
		.then((response) => {
			return response.data;
		});
}

function updateUserImage(avatar) {
	return axios
		.post(
			CF_ROUTE_USER.UPDATE_USER_IMAGE,
			{
				avatar,
			},
		)
		.then((response) => {
			return response.data;
		});
}

function register(user) {
	return axios.post(CF_ROUTE_USER.REGISTER, user).then((response) => {
		return response.data;
	});
}

function getUserDate(userId) {
	return axios
		.post(
			CF_ROUTE_USER.GET_USER,
			{
				userId,
			},
			configAxios
		)
		.then((response) => {
			if (response.data.user) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}

			return response.data;
		});
}

const userService = {
	login,
	logout,
	register,
	getUserDate,
	changePassword,
	updateUserImage,
};

export default userService;
