//Contains the logic for handling task-related requests.
const Task = require('../models/Task');

// Create a new task
let createTask = async (req, res) => {
    try {
        // Create a new Task instance with data from the request body
        const task = new Task(req.body);
        // Save the task to the database
        await task.save();
        // Send a 201 status code with the created task as JSON
        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        // Send a 400 status with an error message if something goes wrong
        res.status(400).json({ message: "Creating task error!" })
    }
};

// Get all tasks
let getTasks = async (req, res) => {
    try {
        // Retrieve all tasks from the database
        const task = await Task.find();
        // Send a 200 status with the tasks as JSON
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        // Send a 500 status with an error message if something goes wrong
        res.status(500).json({ message: "Error retriving tasks" })
    }
};

// Mark a task as completed
let completeTask = async (req, res) => {
    try {
        //Find the task by ID and update its status to 'completed'
        const task = await Task.findByIdAndUpdate(req.params.id, {status: 'completed'}, { new: true });
        // If the task is not found, send a 404 status with an error message
        if (!task) {
            return res.status(404).json({ error: 'Task not found'});
        }
        // Send a 200 status with the updated task as JSON
        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        // Send a 400 status with an error message if something goes wrong
        res.status(400).json({ message: "Error!, task not completed" })
    }
};

//export code functionalities
module.exports = { createTask, getTasks, completeTask };