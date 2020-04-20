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
    // Get all posts by trending. Will render to dashboard page.
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
    },
    // Create new user post
    createPost: function (id) {
        return axios.post("/api/post/" + id);
    },
    // Get specific user post 
    getUserPost: function (post) {
        return axios.get("/api/post/1/" + post);
    },
    // Delete specific user post
    deleteUserPost: function(id) {
        return axios.delete("/api/post/" + id);
    }
};
