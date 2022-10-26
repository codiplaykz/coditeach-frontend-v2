import axiosInstance from "./axiosInstance";

export const createProject = (data) => {
    const url = '/api/v1/project/create';
    return axiosInstance.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => { return response.data; });
};