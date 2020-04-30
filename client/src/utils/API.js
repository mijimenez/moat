import axios from "axios";

export default {
    
    // USER ROUTES
    //
    // Sign up user
    signupUser: function (userInfo) {
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
    // Get all posts by specific user
    getAllUserPosts: function (id) {
        return axios.get("/api/post/" + id);
    },
    getUserCategories: function (id) {
        return axios.get("/api/user/cat/" + id)
    },
    updateUserCategories: function (category) {
        return axios.post("/api/user/cat/1", category)
    },
    removeUserCategory: function (category) {
        return axios.post("/api/user/rcat/", category)
    },
    // Upload user profile picture
    uploadPhoto: function (file) {
        return axios.post("/api/user/updatePhoto", file);
    },
    updateUser: function (id, userInfo) {
        return axios.put("/api/user/" + id, userInfo)
    },
    // Logout user
    logoutUser: function () {
        return axios.post("/api/user/logout");
    },

    // NEW POST routes
    //
    //create a new post
    createPost: function (post) {
        return axios.post("/api/post/1", post);
    },
    // Get all posts by trending. Will render to dashboard page.
    getTrending: function () {
        return axios.get("/api/post");
    },
    // Get trending by selected category
    getPostByCategories: function (category) {
        return axios.get("/api/post/cat/" + category)
    },
    // Get specific user post 
    getUserPost: function (post) {
        return axios.get("/api/post/1/" + post);
    },
    // Delete specific user post
    deleteUserPost: function (id) {
        return axios.delete("/api/post/" + id);
    },

    // COMMENT ROUTES
    //
    // Get comments of each post
    findCommentByPost: function (id) {
        return axios.get("/api/comment/" + id);
    },
    // Create comment
    createComment: function (id, info) {
        return axios.post("/api/comment/" + id, info);
    },
    // Delete comment
    deleteComment: function (id) {
        return axios.delete("/api/comment/" + id);
    }

};
