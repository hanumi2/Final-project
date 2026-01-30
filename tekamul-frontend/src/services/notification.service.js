import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notifications/';

const getMyNotifications = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}my`, {
        headers: {
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const markAsRead = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.put(`${API_URL}${id}/read`, {}, {
        headers: {
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const NotificationService = {
    getMyNotifications,
    markAsRead,
};

export default NotificationService;
