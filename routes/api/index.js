const router = require("express").Router();
const userRoutes = require("./user-route");

// Book routes
router.use("/user", userRoutes);

module.exports = router;
