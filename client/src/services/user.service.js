import config from "config";
import axios from "axios";

const API_URL = config.apiUrl;

function logout() {
	localStorage.removeItem("user");
}

function login(email, password) {
	return axios
		.post(`${API_URL}/api/user/login`, {
			email,
			password,
		})
		.then((response) => {
			if (response.data.user) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}

			return response.data;
		});
}

function register(user) {
	return axios.post(`${API_URL}/api/user/signup`, user).then((response) => {
		return response.data;
	});
}

const userService = {
	login,
	logout,
	register,
};

export default userService;