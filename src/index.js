//importing dependencies
const express = require('express');  // Importing the Express.js framework
const mongoose = require('mongoose'); // Importing Mongoose library for MongoDB integration
const bodyParser = require('body-parser'); // Importing bodyParser middleware for parsing request bodies
const cors = require('cors'); // Importing CORS middleware for enabling cross-origin resource sharing
const path = require('path');  // Importing path module for working with file and directory paths
require('dotenv').config();  // Loading environment variables from a .env file into process.env
// const taskRoutes = require('./routes/tasks') // Importing routes for handling tasks

const app = express();  // Creating an instance of the Express application
const port = process.env.PORT || 3000; // Defining the port on which the server will run, using environment variable if provided, otherwise defaulting to 3000

mongoose.connect(process.env.MONGODB_URI).then(() => { //ensure compatibility with the latest versions of MongoDB
    console.log('mongodb connected!') 
}); 

//defining middlewares
app.use(cors()); // Using CORS middleware to enable cross-origin requests
app.use(bodyParser.json());  // Using bodyParser middleware to parse JSON request bodies

//routes middleware
// app.use('/tasks', taskRoutes); //Mounting task routes under the '/tasks' path

app.use(express.static(path.join(__dirname, 'public'))); // Serving static files from the 'public' directory

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});