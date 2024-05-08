const {
  addTopic,
  getTopic,
  getTopicByID,
  updatedTopicByID,
  deletedTopicByID,
} = require("../controllers/topic.controllers");

const router = require("express").Router();

router.post("/", addTopic);
router.get("/", getTopic);
router.get("/:id", getTopicByID);
router.put("/:id", updatedTopicByID);
router.delete("/:id", deletedTopicByID);

module.exports = router;
