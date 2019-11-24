import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api/'
});

export default {
    auth: {
        login(body) {
            return axiosClient.post('/login', body);
        },
        signup(body) {
            return axiosClient.post('/submit-new-user', body);
        }
    },
    fetch: {
        getItems() {
            debugger;
            return axiosClient.get('/items');
        },
        get(url, body) {
            return axiosClient.get(`/${url}`, body);
        }
    }
}