const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const asyncHandler = require("../middleware/asyncHandler");

router.post("/create-account", asyncHandler(controller.createAccount));
router.post("/login", asyncHandler(controller.login));
router.get("/get-user", authenticateToken, asyncHandler(controller.getUser));

module.exports = router;
