import axios from "axios";

export default {
    // Sign up user
    signupUser: function(userInfo) {
        return axios.post("/api/user/signup", userInfo);
    },
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
    // createPost: function (id, post) {
    //     return axios.post("/api/post/" + id, post);
    // },
    createPost: function (post) {
        return axios.post("/api/post/1", post);
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
