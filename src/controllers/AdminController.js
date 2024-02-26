const AdminServices = require("../services/AdminServices");

const adminLogin = async (req, res) => {
  const login = await AdminServices.adminLoginService(req, res);
  res.json(login);
};

module.exports = {
  adminLogin,
};
