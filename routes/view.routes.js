const { Router } = require("express");

const { createViewPath } = require("../helpers/create_view_path");

const router = Router();

router.get("/", (req, res) => {
  console.log(createViewPath("index"));
  res.render(createViewPath("index"), {
    title: "Asosiy sahifa",
    isHome: true,
  });
});

router.get("/dictionary", (req, res) => {
  res.render(createViewPath("dictionary"), {
    title: "Lugatlar",
    isHome: true,
  });
});

router.get("/topics", (req, res) => {
  res.render(createViewPath("topics"), {
    title: "Maqolalar",
    isHome: true,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPath("login"), {
    title: "Login",
    isHome: true,
  });
});

module.exports = router;
