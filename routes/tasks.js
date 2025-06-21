const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/create", TaskController.createTask);
router.get("/", TaskController.getAllTask);
router.get("/id/:id", TaskController.getTaskById);

module.exports = router;
