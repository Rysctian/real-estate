import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "You are Authenticated" });
};

export const shouldBeAdmin = async (req, res) => {
  console.log("shouldBeAdmin called");
  console.log("Cookies: ", req.cookies); // Log cookies

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "You are not Authenticated!",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "You are an Admin!", payload });
  } catch (err) {
    res.status(401).json({ message: "Token is invalid" });
  }
};
