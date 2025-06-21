const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/create", TaskController.createTask);
router.get("/", TaskController.getAllTask);
router.get("/id/:id", TaskController.getTaskById);
router.put("/:id", TaskController.updateTask);
router.put("/:id/completed", TaskController.setTaskCompleted);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;
