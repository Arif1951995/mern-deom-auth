const express = require("express");
const router = express.Router();
const Todo = require("../models/TodoModel");
const { authenticateToken } = require("../middleware/auth");

router.get("/", authenticateToken, (req, res) => {
  res.send({ msg: req.user });
});

router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
