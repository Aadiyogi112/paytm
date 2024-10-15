const express = require("express");
const userRouter = require("./user");

const router = express.Router();
router.use("/user", userRouter);

module.exports = router;

// /api/v1/...-----will go to main router
// all the /api/v1/user will go to user router
