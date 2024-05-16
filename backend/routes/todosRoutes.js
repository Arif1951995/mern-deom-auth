const express = require("express");
const router = express.Router();
const Todo = require("../models/TodoModel");
const { authenticateToken } = require("../middleware/auth");

router.get("/", authenticateToken, async (req, res) => {  
  // console.log();
  const userId = req.user.id;
  const todos = await Todo.find({user: userId}).populate("user", "name email")
  res.send(todos);
});

router.post("/", authenticateToken, async (req, res) => {
  console.log("user",  req.user)
  req.body.user = req.user.id;
  console.log("req.body", req.body)
  try {
    const todo = await Todo.create(req.body);
    res.status(201).send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
