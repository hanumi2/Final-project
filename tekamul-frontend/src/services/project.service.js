import axios from 'axios';

const API_URL = 'http://localhost:8080/api/projects/';

const submitRequest = (planOfArgument, lease) => {
    const formData = new FormData();
    formData.append('planOfArgument', planOfArgument);
    if (lease) {
        formData.append('lease', lease);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(API_URL + 'request', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + (user?.token || '')
        },
    });
};

const getMyProjects = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL + 'my', {
        headers: {
            'Authorization': 'Bearer ' + (user?.token || '')
        },
    });
};

const getAllProjects = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL + 'all', {
        headers: {
            'Authorization': 'Bearer ' + (user?.token || '')
        },
    });
};

const updateStatus = (id, status) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.put(`${API_URL}${id}/status?status=${status}`, {}, {
        headers: {
            'Authorization': 'Bearer ' + (user?.token || '')
        },
    });
};

const ProjectService = {
    submitRequest,
    getMyProjects,
    getAllProjects,
    updateStatus,
};

export default ProjectService;
