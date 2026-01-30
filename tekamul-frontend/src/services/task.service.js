import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks/';

const getMyTasks = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL + 'my', {
        headers: {
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const updateStatus = (id, status) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.put(`${API_URL}${id}/status?status=${status}`, {}, {
        headers: {
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const uploadResult = (id, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(`${API_URL}${id}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const assignTask = (projectId, userId, title, description, type) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(API_URL + 'assign', {
        projectId,
        userId,
        title,
        description,
        type
    }, {
        headers: {
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const TaskService = {
    getMyTasks,
    updateStatus,
    uploadResult,
    assignTask,
};

export default TaskService;
