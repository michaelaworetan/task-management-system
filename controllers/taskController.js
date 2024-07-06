// Import validationResult from express-validator to handle validation results
const { validationResult } = require('express-validator');

// Import the Task model
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  // Check for validation errors in the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 status with the errors
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Destructure the task details from the request body
    const { title, description, assignedTo, deadline } = req.body;
    // Create a new Task instance with the provided details
    const task = new Task({ title, description, assignedTo, deadline });
    // Save the task to the database
    await task.save();
    // Return the created task with a 201 status
    res.status(201).json(task);
  } catch (error) {
    // If an error occurs, return a 400 status with the error message
    res.status(400).json({ error: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();
    // Return the fetched tasks with a 200 status
    res.status(200).json(tasks);
  } catch (error) {
    // If an error occurs, return a 500 status with the error message
    res.status(500).json({ error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  // Check for validation errors in the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 status with the errors
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Destructure the task details from the request body
    const { title, description, assignedTo, deadline, completed } = req.body;
    // Find the task by ID and update it with the new details
    const task = await Task.findByIdAndUpdate(
      req.params.id, // Task ID from the request parameters
      { title, description, assignedTo, deadline, completed }, // New task details
      { new: true, runValidators: true } // Return the updated task and run validators
    );

    if (!task) {
      // If no task is found, return a 404 status with an error message
      return res.status(404).json({ error: 'Task not found' });
    }

    // Return the updated task with a 200 status
    res.status(200).json(task);
  } catch (error) {
    // If an error occurs, return a 400 status with the error message
    res.status(400).json({ error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    // Find the task by ID and delete it
    const task = await Task.findByIdAndDelete(req.params.id); // Task ID from the request parameters

    if (!task) {
      // If no task is found, return a 404 status with an error message
      return res.status(404).json({ error: 'Task not found' });
    }
    // Return a success message with a 200 status
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    // If an error occurs, return a 500 status with the error message
    res.status(500).json({ error: error.message });
  }
};

// Mark a task as completed
exports.markTaskAsCompleted = async (req, res) => {
  try {
    // Find the task by ID and mark it as completed
    const task = await Task.findByIdAndUpdate(
      req.params.id, // Task ID from the request parameters
      { completed: true }, // Set completed to true
      { new: true } // Return the updated task
    );

    if (!task) {
      // If no task is found, return a 404 status with an error message
      return res.status(404).json({ error: 'Task not found' });
    }

    // Return the updated task with a 200 status
    res.status(200).json(task);
  } catch (error) {
    // If an error occurs, return a 400 status with the error message
    res.status(400).json({ error: error.message });
  }
};
