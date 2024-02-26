const bcrypt = require("bcryptjs");

const adminLoginService = (req, res) => {
  try {
    let { hash } = req.body;
    if (bcrypt.compareSync(process.env.ADMIN_PASSWORD, hash)) {
      res.status(200);
      return "SUCCESS";
    } else {
      res.status(403);
      return "DENIED";
    }
  } catch (error) {
    res.status(503).send("Internal Server Error");
  }
};

module.exports = { adminLoginService };
