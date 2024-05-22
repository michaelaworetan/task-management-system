//import the Express module
const express = require('express');
//Create a new router object
const router = express.Router();
// Import the task controller to handle the task-related operations
const taskController = require('../controllers/taskController');

// Define a route to create a new task
// When a POST request is made to the root URL (/tasks), the createTask method from taskController is called
router.post('/', taskController.createTask);

// Define a route to get all tasks
// When a GET request is made to the root URL (/tasks), the getTasks method from taskController is called
router.get('/', taskController.getTasks);

// Define a route to mark a task as completed
// When a PATCH request is made to /tasks/:id/complete, the completeTask method from taskController is called
// The :id part is a route parameter that represents the ID of the task to be completed
router.patch('/:id/complete', taskController.completeTask);

// / Export the router object so it can be used in other parts of the application
module.exports = router;





