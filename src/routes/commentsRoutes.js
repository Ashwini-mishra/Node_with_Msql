const express = require("express");
const router = express.Router();
const validationMiddleware = require("../../middleware/validationMiddleware");
const authFrontendService = require("../services/comments");
const validateParams = require("../../utils/validation");
const authValidate = require("../../utils/auth");

/*********** create comments ************* */
router.post(
    "/comments/postID/:postId",
    authValidate.authenticate,
    validationMiddleware(validateParams.comments()),
    authFrontendService.createComments
);

/*********** update comments ********* */
router.put(
    "/comments/:id",
    authValidate.authenticate,
    validationMiddleware(validateParams.comments()),
    authFrontendService.update
);

/********** soft delete comments ********** */
router.delete(
    "/comments/:id",
    authValidate.authenticate,
    authFrontendService.deleteComment
);

module.exports = router;
