import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

const getByRole = (role) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}role/${role}`, {
        headers: {
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const UserService = {
    getByRole,
    getAllUsers: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return axios.get(`${API_URL}all`, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
        });
    }
};

export default UserService;
