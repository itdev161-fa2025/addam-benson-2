import jwt from "jsonwebtoken";
import config from "config";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  const secret = localStorage.getItem("token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Missing authentication token. Authorization failed." });
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken.user;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Missing authentication token. Authorization failed." });
  }
};

export default auth;
