const express = require("express");
const router = express.Router();
const todosRoutes = require("./todosRoutes");
const authRoutes = require("./userRoutes");







router.use("/todos", todosRoutes);
router.use("/", authRoutes);



module.exports = router