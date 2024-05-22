const mongoose = require('mongoose')  // Importing the mongoose library for MongoDB and Node.js
const { required } = require('yargs')

// Defining a schema for the "Task" model using the mongoose.Schema constructor
const taskSchema = new mongoose.Schema({
    // Defining a field "title" of type String which is required
    title: {
        type: String,
        required: true
    },
    // Defining a field "description" of type String (optional)
    description: {
        type: String
    },
    // Defining a field "assignedTo" of type String which is required
    assignedTo: {
        type: String,
        required: true
    },
    // Defining a field "deadline" of type Date which is required
    deadline: {
        type: Date,
        required: true,
        // Validate the date format
        validate: {
            validator: function (v) {
            return !isNaN(Date.parse(v));
            },
            message: props => `${props.value} is not a valid date!`
        }
    },
    // Defining a field "status" of type String with a default value of 'pending'
    status: {
        type: String,
        default: 'pending'
    },
});

// Pre-save middleware to handle different date formats
taskSchema.pre('save', function (next) {
    if (this.deadline && typeof this.deadline === 'string') {
      this.deadline = new Date(this.deadline);
    }
    next();
  });

// Creating a model named 'Task' based on the defined schema and exporting it
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;