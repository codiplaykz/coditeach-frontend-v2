import axiosInstance from "./axiosInstance";

export const composeCurriculum = (data) => {
    const url = '/api/v1/curriculum/compose ';
    return axiosInstance.post(url, data,).then(response => { return response.data; });
};

export const getAllCurriculums = () => {
    const url = '/api/v1/curriculum/getAll';
    return axiosInstance.get(url)
        .then(response => { return response.data; });
};

export const getCurriculumById = (id) => {
    const url = `/api/v1/curriculum/get?id=${id}`;
    return axiosInstance.get(url)
        .then(response => { return response.data; });
}