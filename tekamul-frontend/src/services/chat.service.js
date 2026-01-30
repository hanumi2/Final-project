import axios from 'axios';

const API_URL = 'http://localhost:8080/api/chat/';

const sendMessage = (receiverId, message) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(`${API_URL}send?receiverId=${receiverId}&message=${message}`, {}, {
        headers: {
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const getConversation = (partnerId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}conversation/${partnerId}`, {
        headers: {
            'Authorization': 'Bearer ' + user.token
        },
    });
};

const ChatService = {
    sendMessage,
    getConversation,
};

export default ChatService;
