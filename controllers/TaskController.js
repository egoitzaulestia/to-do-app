const Task = require("../models/Task");

const TaskController = {
  async create(req, res) {
    try {
      const taks = await Task.create(req.body);
      res.status(201).json({
        message: "Task created successfully",
        task,
      });
    } catch (error) {
      console.error(error);
      req.status(500).json({
        message: "Server error while creating the task",
        erro,
      });
    }
  },
};

module.exports = TaskController;
