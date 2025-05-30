const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    let { name, email, password, address, role } = req.body;

    if (role === "User") {
      role = "normal-user";
    } else if (role === "Store Owner") {
      role = "store-owner";
    } else {
      return res.status(400).json({
        message: "Role must be either 'User' or 'Store Owner'."
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create user in DB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    // Respond with user info
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "default_secret", 
      { expiresIn: 86400 }
    );

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      accessToken: token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
