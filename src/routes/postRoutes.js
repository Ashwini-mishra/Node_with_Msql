const express = require("express");
const router = express.Router();
const validationMiddleware = require("../../middleware/validationMiddleware");
const authFrontendService = require("../services/post");
const validateParams = require("../../utils/validation");
const authValidate = require("../../utils/auth");

/************* create post ********** */
router.post(
    "/uploadPost",
    authValidate.authenticate,
    validationMiddleware(validateParams.post()),
    authFrontendService.createPost
);

/************** get all post ********* */
router.get(
    "/uploadPost",
    authValidate.authenticate,
    authFrontendService.getAllPost
);

/************** update post ********* */
router.put(
    "/uploadPost/:id",
    authValidate.authenticate,
    validationMiddleware(validateParams.post()),
    authFrontendService.updatePost
);

/************** delete post ********* */
router.delete(
    "/uploadPost/:id",
    authValidate.authenticate,
    authFrontendService.deletePost
);

/************** get by id post and its comments ********* */
router.get(
    "/uploadPost/:id",
    authValidate.authenticate,
    authFrontendService.getById
);

module.exports = router;
