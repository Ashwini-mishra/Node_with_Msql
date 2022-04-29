const express = require("express");
const router = express.Router();
const validationMiddleware = require("../../middleware/validationMiddleware");
const controller = require("../services/user");
const validateParams = require("../../utils/validation");

/************ create user *********** */
router.post(
    "/createUser",
    validationMiddleware(validateParams.register()),
    controller.create
);

module.exports = router;
