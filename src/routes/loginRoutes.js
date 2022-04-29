const express = require("express");
const router = express.Router();
const validationMiddleware = require("../../middleware/validationMiddleware");
const authFrontendService = require("../services/login");
const validateParams = require("../../utils/validation");

/************* login *********** */
router.post(
    "/login",
    validationMiddleware(validateParams.login()),
    authFrontendService.login
);

module.exports = router;
