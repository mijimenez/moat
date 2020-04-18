import axios from "axios";

export default {
    // Login user
    loginUser: function(userInfo) {
        return axios.post("/api/user/login", userInfo);
    },
    // Get user information from database to render in account page
    getUser: function (id) {
        return axios.get("/api/user/" + id);
    },
};
