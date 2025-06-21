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

  async getAllTask(req, res) {
    try {
      const tasks = await Task.find();

      res.status(200).json({ tasks });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Server error while retriving the tasks",
        error,
      });
    }
  },

  async getTaskById(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      res.status(200).json({
        message: "Task found",
        task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Server error while finding a task by ID",
        error,
      });
    }
  },
};

module.exports = TaskController;
