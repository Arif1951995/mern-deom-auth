const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {authenticateToken, generateToken} = require("../middleware/auth")

const User = require("../models/UserModel");

router.post("/register", async (req, res) => {

  if (!req.body.password)
    return res.status(400).send({ msg: "Password required" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {

  try {
    if (!req.body.password)
      return res.status(400).send({ msg: "Password required" });

    const user = await User.findOne({ name: req.body.name });
    if(!user) res.status(401).send({msg: "Invalid email or Password"});

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if(!isPasswordValid) res.status(401).send({msg: "Invalid email or Password"});
      if (isPasswordValid) {
        const token =  await  generateToken(user);

        return res.status(200).send({user, token});
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
