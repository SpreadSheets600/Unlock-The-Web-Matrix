const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashed });
  await user.save();
  res.status(201).json({
    message: "User registered",
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      error: "User not found",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({
      error: "Wrong password",
    });

  const token = jwt.sign(
    {
      id: user._id,
    },
    "your_secret_key"
  );
  res.json({ token });
};
