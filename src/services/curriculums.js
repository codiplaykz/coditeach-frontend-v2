import axiosInstance from "./axiosInstance";

export const composeCurriculum = (data) => {
    const url = '/api/v1/curriculum/compose ';
    return axiosInstance.post(url, data,).then(response => { return response.data; });
};

// export const getAllProjects = () => {
//     const url = '/api/v1/project/getAll';
//     return axiosInstance.get(url)
//         .then(response => { return response.data; });
// };
//
// export const getProjectById = (id) => {
//     const url = `/api/v1/project/get?id=${id}`;
//     return axiosInstance.get(url)
//         .then(response => { return response.data; });
// }