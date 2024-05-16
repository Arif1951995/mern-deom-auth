const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken, generateToken } = require("../middleware/auth");

const User = require("../models/UserModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).send({ msg: "All fields are required!" });

  const nameOrEmailAlreadyInUSe = await User.findOne({
    $or: [{ name }, { email }],
  });
  if (nameOrEmailAlreadyInUSe)
    return res.status(409).send({ msg: "Name or Email ALready in user" });

  // if(!nameOrEmailAlreadyInUSe) return res.status(409).send({nameOrEmailAlreadyInUSe, name, password});

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const response = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const user = response.toObject();
    console.log("1", user.password);
    delete user.password;
    console.log("2");

    res.status(201).send(user);
  } catch (error) {
    // throw new Error(error)
    return res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  console.log("login");
  try {
    if (!req.body.password)
      return res.status(400).send({ msg: "Password required" });

    const response = await User.findOne({ name: req.body.name });
    console.log("1");

    if (!response) res.status(401).send({ msg: "Invalid email or Password" });
    console.log("2");

    const user = response.toObject();
    console.log("3");

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid)
        res.status(401).send({ msg: "Invalid email or Password" });
      if (isPasswordValid) {
        console.log("isPassword Valid", isPasswordValid);

        const token = await generateToken(user);
        delete user.password;
        delete user.__v;
        user.token = token;
        return res.status(200).send(user);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get("/users",  async (req, res) => {  
  // console.log();
  const users = await User.find({})
  res.send(users);
});


router.get("/loggedInUser",  authenticateToken, async (req, res) => {  
  // console.log();
  // const users = await User.find({})
  
  return res.status(200).json(req.user);
});

module.exports = router;
