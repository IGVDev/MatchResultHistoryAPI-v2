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
    console.log(error);
  }
};

module.exports = { adminLoginService };
