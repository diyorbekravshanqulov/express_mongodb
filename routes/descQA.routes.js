const {
  addDescQA,
  getDescQA,
  getDescQAByID,
  updatedDescQAByID,
  deletedDescQAByID,
} = require("../controllers/descQA.controllers");

const router = require("express").Router();

router.post("/", addDescQA);
router.get("/", getDescQA);
router.get("/:id", getDescQAByID);
router.put("/:id", updatedDescQAByID);
router.delete("/:id", deletedDescQAByID);

module.exports = router;
