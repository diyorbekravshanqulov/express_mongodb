const { to } = require("../helpers/to_promise");
const myJwt = require("../services/jwt_servives");

module.exports = function (roles) {
  return async function (req, res, next) {
    //   if (req.method == "OPTIONS") {
    //     next();
    //   }
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
      }

      const bearer = authorization.split(" ")[0];
      const token = authorization.split(" ")[1];

      if (bearer != "Bearer" || !token) {
        return res
          .status(403)
          .json({ message: "Avtor ro'yxatdan o'tmagan (token berilmagan)" });
      }

      const [error, decodedToken] = await to(myJwt.verifyAccessToken(token));
      if (error) {
        return res.status(403).json({ message: error.message });
      }

      console.log(decodedToken);
      req.author = decodedToken;

      const { is_expert, authorRoles } = decodedToken;
      let hasRole = false;

      authorRoles.forEach((authorRole) => {
        if (roles.includes(authorRole)) hasRole = true;
      });

      if(!is_expert||!hasRole) {
        return res
            .status(401)
            .send({ message: "Sizga bunday xuquq berilmagan" })
      }

      next();
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .send({ message: "Avtor ro'yxatdan o'tmagan(token noto'g'ri)" });
    }
  };
};
