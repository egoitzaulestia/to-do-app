const Task = require("../models/Task");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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
        error: error.message,
      });
    }
  },

  async getAllTask(req, res) {
    try {
      const tasks = await Task.find();

      res.status(200).json({
        message: "Tasks retrieved successfully",
        total: tasks.length,
        tasks,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Server error while retriving the tasks",
        error: error.message,
      });
    }
  },

  async getTaskById(req, res) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Task ID format" });
      }

      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({
        message: "Task found",
        task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Server error while finding a task by ID",
        error: error.message,
      });
    }
  },

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid Task ID format",
        });
      }

      if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
          message: "`title`is required and must be a non-empty string",
        });
      }

      const taskUpdated = await Task.findByIdAndUpdate(
        id,
        { title: title.trim() },
        { new: true }
      );

      res.status(200).json({
        message: "Task updated",
        taskUpdated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error while updating the task",
      });
    }
  },

  async setTaskCompleted(req, res) {
    try {
      const { id } = req.params;
      const { completed } = req.body; // we send the value by body from the front

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid Task ID format",
        });
      }

      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "`completed` must be true or false",
        });
      }

      const task = await Task.findByIdAndUpdate(
        id,
        { completed, $inc: { __v: 1 } },
        { new: true }
      );

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      res.status(200).json({
        message: `Task marked as ${completed ? "completed" : "uncompleted"}`,
        task,
      });
    } catch (error) {
      console.error(error);
      res.status(200).json({
        message: "Server error while updating completion",
        error: error.message,
      });
    }
  },
};

module.exports = TaskController;
