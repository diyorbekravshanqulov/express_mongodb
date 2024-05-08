const {
  addTag,
  getTag,
  getTagByID,
  updatedTagByID,
  deletedTagByID,
} = require("../controllers/tag.controllers");

const router = require("express").Router();

router.post("/", addTag);
router.get("/", getTag);
router.get("/:id", getTagByID);
router.put("/:id", updatedTagByID);
router.delete("/:id", deletedTagByID);

module.exports = router;
