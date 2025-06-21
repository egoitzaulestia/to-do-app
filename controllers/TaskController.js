const Task = require("../models/Task");

const TaskController = {
  async createTask(req, res) {
    try {
      const { title } = req.body;

      const task = await Task.create({ title });

      res.status(201).json({
        message: "Task created successfully",
        task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error while creating the task",
        error,
      });
    }
  },

  async,
};

module.exports = TaskController;
