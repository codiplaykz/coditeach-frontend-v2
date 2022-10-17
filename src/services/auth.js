import axios from "axios";

const baseUrl = `http://localhost:8080`

// SIGN UP
export const sign_up = (data) => {
	const url = `${baseUrl}/api/v1/auth/sign_up`;
	return axios.post(url, data)
		.then(response => { return response.data; })
		.catch(err => console.log(`Sign up error: ${err.response}`));
};

// SIGN IN
export const sign_in = (data) => {
	const url = `${baseUrl}/api/v1/auth/sign_in`;
	return axios.post(url, data)
		.then(response => { return response.data })
};

// REFRESH TOKENS
export const refreshTokens = () => {
	const url = `${baseUrl}/api/v1/auth/refresh`;
	const data = {
		token: localStorage.getItem('refreshToken')
	};
	return axios.post(url, data)
		.then(response => { return response.data; });
};

