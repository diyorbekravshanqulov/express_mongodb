const { Router } = require("express");
const dictRoute = require("./dictionary.routes");
const authRoute = require("./auth.routes");
const cateRoute = require("./cate.routes");
const adminRoute = require("./admin.routes");
const userRoute = require("./user.routes");
const synRoute = require("./syn.routes.js")

const router = Router();

router.use("/dict", dictRoute);
router.use("/auth", authRoute);
router.use("/cate", cateRoute);
router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/syn", synRoute);

module.exports = router;
