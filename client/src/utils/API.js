import axios from "axios";

export default {
    // Get user information from database to render in account page
    getUser: function (id) {
        return axios.get("/api/user/" + id);
    },
};
