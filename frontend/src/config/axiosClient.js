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
        getItemDetails(body) {
            return axiosClient.get('/item', body);
        },
        getWishListItems(body) {
            return axiosClient.get('/wish-list', body);
        },
        getReadingHistory(body) {
            return axiosClient.get('/reading-history', body);
        },
        getHolds(body) {
            return axiosClient.get('/holds', body);
        },
        getUserInfo(body) {
            return axiosClient.get('/user-info', body);
        },
        getUserType(body) {
            console.log("body in axios", body);
            return axiosClient.get('/user-type', body);
        },
        getCheckedOut(body) {
            return axiosClient.get('/checked-out', body);
        },
        getFees(body) {
            return axiosClient.get('/fees', body);
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
        },
        addItem(body) {
            console.log(body)
            return axiosClient.post('/add-item', body);
        },
        renewItem(body) {
            return axiosClient.post('/checked-out', body);

        },
        removeItem(body) {
            return axiosClient.post('/remove-item', body);
        }
    }

}