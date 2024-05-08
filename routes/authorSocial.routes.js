const {
  addAuthorSocial,
  getAuthorSocial,
  getAuthorSocialByID,
  updatedAuthorSocialByID,
  deletedAuthorSocialByID,
} = require("../controllers/authorSocial.controllers");

const router = require("express").Router();

router.post("/", addAuthorSocial);
router.get("/", getAuthorSocial);
router.get("/:id", getAuthorSocialByID);
router.put("/:id", updatedAuthorSocialByID);
router.delete("/:id", deletedAuthorSocialByID);

module.exports = router;
