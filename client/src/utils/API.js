import axios from "axios";

export default {
    // Login user
    loginUser: function (userInfo) {
        return axios.post("/api/user/login", userInfo);
    },
    // Get user information from database to render in account page
    getUser: function (id) {
        return axios.get("/api/user/" + id);
    },
    getTrending: function () {
        return axios.get("/api/post");
    },
    // Get all posts by specific user
    getAllUserPosts: function (id) {
        return axios.get("/api/post/" + id);
    },
    // Logout user
    logoutUser: function () {
        return axios.post("/api/user/logout");
    }
};
