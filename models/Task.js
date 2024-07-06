const mongoose = require('mongoose');

// Define the schema for a task with validation
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'], // Title is required
    // trim: true, // Trim whitespace
  },
  description: {
    type: String,
    // trim: true, // Trim whitespace
  },
  assignedTo: {
    type: String,
    // trim: true, // Trim whitespace
  },
  deadline: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false, // Default value for completed is false
  },
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Task', TaskSchema); // Export the model
