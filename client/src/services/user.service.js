import config from "config";
import axios from "axios";

const API_URL = config.apiUrl;

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem("user");
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				window.location.reload();
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
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
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	};
	return fetch("/api/user/signup/", requestOptions).then(handleResponse);
}

const userService = {
	login,
	logout,
	register,
};

export default userService;
