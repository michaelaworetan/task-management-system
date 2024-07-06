const express = require('express');
const { body } = require('express-validator');  // Import body function from express-validator to validate request body

// Import task controller functions
const { createTask, getAllTasks, updateTask, deleteTask, markTaskAsCompleted } = require('../controllers/taskController');

// Create a new router object
const router = express.Router();

// Define validation rules for task fields
const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('assignedTo').optional().isString(),
  body('deadline').optional().isISO8601().toDate(),  // Validate deadline: it is optional and must be a valid ISO 8601 date if provided
  body('completed').optional().isBoolean(),
];

// Route to create a new task with validation
router.post('/tasks', validateTask, createTask);

// Route to get all tasks
router.get('/tasks', getAllTasks);

// Route to update a task with validation
router.put('/tasks/:id', validateTask, updateTask);

// Route to delete a task
router.delete('/tasks/:id', deleteTask);

// Route to mark a task as completed
router.put('/tasks/:id/complete', markTaskAsCompleted);

// Export the router to be used in other parts of the application
module.exports = router;
