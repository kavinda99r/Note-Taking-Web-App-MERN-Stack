const router = require("express").Router();
const controller = require("../controllers/note.controller");
const { authenticateSession } = require("../middleware/authenticateSession");
const asyncHandler = require("../middleware/asyncHandler");

router.use(authenticateSession);

router.post("/add-note", asyncHandler(controller.addNote));
router.put("/edit-note/:noteId", asyncHandler(controller.editNote));
router.get("/get-all-notes/", asyncHandler(controller.getAllNotes));
router.delete("/delete-notes/:noteId", asyncHandler(controller.deleteNote));
router.put("/update-note-pinned/:noteId", asyncHandler(controller.updatePinned));
router.get("/search-notes", asyncHandler(controller.searchNotes));

module.exports = router;
