const {
  addQuestionAnswer,
  getQuestionAnswerByID,
  updatedQuestionAnswerByID,
  deletedQuestionAnswerByID,
} = require("../controllers/questionAnswer.controllers");

const router = require("express").Router();

router.post("/", addQuestionAnswer);
router.get("/", getQuestionAnswerByID);
router.get("/:id", getQuestionAnswerByID);
router.put("/:id", updatedQuestionAnswerByID);
router.delete("/:id", deletedQuestionAnswerByID);

module.exports = router;
