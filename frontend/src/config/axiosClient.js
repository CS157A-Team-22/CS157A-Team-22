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
            return axiosClient.get('/items');
        },
        getWishListItems(body) {
            return axiosClient.get('/wish-list', body);
        },
        getReadingHistory(body) {
            return axiosClient.get('/reading-history', body);
        },
        getHolds(body) {
            return axiosClient.get('/holds', body);
        }
    },
    update: {
        addToWishList(body) {
            return axiosClient.post('/wish-list', body);
        },
        addToHold(body) {
            return axiosClient.post('/holds', body);
        },
        checkIn(body) {
            return axiosClient.post('/check-in', body);
        },
        checkOut(body) {
            return axiosClient.post('/check-out', body);
        }
    }
}