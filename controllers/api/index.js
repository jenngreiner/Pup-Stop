const router = require("express").Router();
const userRoutes = require("./userRoutes");
const yardRoutes = require("./yardRoutes");

router.use("/users", userRoutes);
router.use("/yards", yardRoutes);

module.exports = router;
