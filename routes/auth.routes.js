const { Router } = require("express");

const {
  addAuth,
  getAuth,
  getAuthByID,
  updateAuthByID,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  deleteAuthByID,
  deleteAuthAll,
  authorActivate,
} = require("../controllers/auth.controller");

const authorPolice = require("../middleware/author_police");
const author_roles_police = require("../middleware/author_roles_police");

const express = require("express");

express.Router.prefix = function (path, subRouter) {
  const router = express.Router();
  this.use(path, router);
  subRouter(router);
  return router;
};

const router = Router();

router.prefix("/", (authorRoute) => {
  authorRoute.post("/", addAuth);
  authorRoute.get("/", authorPolice, getAuth);
  authorRoute.get("/:id", author_roles_police(["READ"]), getAuthByID);
  authorRoute.put("/:id", updateAuthByID);
  authorRoute.post("/login", loginAuthor);
  authorRoute.post("/logout", logoutAuthor);
  authorRoute.post("/refresh", refreshAuthorToken);
  authorRoute.delete("/:id", deleteAuthByID);
  authorRoute.delete("/", deleteAuthAll);
  authorRoute.get("/activate/:link", authorActivate);
});

module.exports = router;
