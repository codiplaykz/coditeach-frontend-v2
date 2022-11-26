import axios from 'axios';
import {env} from "../constants";
import {refreshTokens} from "./auth";
import {removeUser} from "../store/slices/userSlice";
import {store} from "../store";

const axiosInstance = axios.create({ baseURL: env.prod_start_point });

axiosInstance.interceptors.request.use(async (config) => {
	const token = await localStorage.getItem('accessToken');
	if (token) {
		console.log('accessToken: ', token);
		config.headers['Authorization'] = `${token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.code === 'ERR_NETWORK') {
		window.location.href = '/500'
	}
	if (401 === error.response?.status) {
		if (error.response.data.error === 'not admin') {
			console.log("not admin")
			store.dispatch(removeUser())
		} else {
			refreshTokens().then(res => {
				localStorage.setItem('accessToken', res?.accessToken);
				localStorage.setItem('refreshToken', res?.refreshToken);
				window.location.reload()
			}).catch( (err) => {
				console.log("refresh token api call error:", err)
				store.dispatch(removeUser())
			});
		}
	}

	return Promise.reject(error)
});

export default axiosInstance;