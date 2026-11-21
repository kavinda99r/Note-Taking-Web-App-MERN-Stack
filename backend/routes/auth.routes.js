const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const { authenticateSession } = require("../middleware/authenticateSession");
const asyncHandler = require("../middleware/asyncHandler");

router.post("/create-account", asyncHandler(controller.createAccount));
router.post("/login", asyncHandler(controller.login));
router.post("/logout", asyncHandler(controller.logout));
router.get("/get-user", authenticateSession, asyncHandler(controller.getUser));

module.exports = router;
