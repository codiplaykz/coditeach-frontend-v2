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

export const getAllProjects = () => {
    const url = '/api/v1/project/getAll';
    return axiosInstance.get(url)
        .then(response => { return response.data; });
};

export const getProjectById = (id) => {
    const url = `/api/v1/project/get?id=${id}`;
    return axiosInstance.get(url)
        .then(response => { return response.data; });
}