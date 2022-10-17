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
	if (401 === error.response.status) {
		if (error.response.data.error === 'invalid auth user') {
			store.dispatch(removeUser())
		} else {
			refreshTokens().then(res => {
				localStorage.setItem('accessToken', res?.accessToken);
				localStorage.setItem('refreshToken"', res?.refreshToken);
			}).catch( () => {
				store.dispatch(removeUser())
			});
		}
	}

	return Promise.reject(error)
});

export default axiosInstance;