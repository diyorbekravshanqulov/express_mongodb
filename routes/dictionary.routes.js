const { Router } = require("express");

const {
  addTerm,
  getTerm,
  getTermByLetter,
  getTermByTerm,
  updateTermByTerm,
  deleteTermByTerm,
} = require("../controllers/dict.controller");

const router = Router();

router.post("/", addTerm);
router.get("/", getTerm);
router.get("/letter/:letter", getTermByLetter);
router.get("/term/:term", getTermByTerm);
router.put("/:term", updateTermByTerm);
router.delete("/:term", deleteTermByTerm);

module.exports = router;
