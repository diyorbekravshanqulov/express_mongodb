const {
  addDescTopic,
  getDescTopic,
  getDescTopicByID,
  updatedDescTopicByID,
  deletedDescTopicByID,
} = require("../controllers/descTopic.controllers");

const router = require("express").Router();

router.post("/", addDescTopic);
router.get("/", getDescTopic);
router.get("/:id", getDescTopicByID);
router.put("/:id", updatedDescTopicByID);
router.delete("/:id", deletedDescTopicByID);

module.exports = router;
