const db = require("../models");
const User = db.User;

exports.getAllUsers = async (req, res) => {
  try {
    const { role, name, email, address } = req.query;
    let filters = {};
    if (role) filters.role = role;
    if (name) filters.name = name;
    if (email) filters.email = email;
    if (address) filters.address = address;

    const users = await User.findAll({ where: filters });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const { newPassword } = req.body;

    user.password = require("bcryptjs").hashSync(newPassword, 8);
    await user.save();

    res.send({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
