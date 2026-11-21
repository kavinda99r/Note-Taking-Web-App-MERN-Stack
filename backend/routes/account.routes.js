const router = require("express").Router();
const controller = require("../controllers/account.controller");
const { authenticateSession } = require("../middleware/authenticateSession");
const asyncHandler = require("../middleware/asyncHandler");
router.put("/account/password", authenticateSession, asyncHandler(controller.changePassword));
router.delete("/account", authenticateSession, asyncHandler(controller.deleteAccount));
module.exports = router;
