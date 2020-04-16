const router = require("express").Router();
const userRoutes = require("./user-route");
const postRoutes = require("./post-route")


router.use("/user", userRoutes)
router.use("/post", postRoutes)

module.exports = router;
