import config from "config";

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
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	};

	console.log({ email, password, config });

	return fetch(`${config.apiUrl}/api/user/login`, requestOptions)
		.then(handleResponse)
		.then((res) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem(
				"user",
				JSON.stringify({
					token: res.user.token,
					username: res.user.username,
				})
			);
			return res.user;
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
