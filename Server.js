// Import the express module
const express = require('express');
// Create an instance of an Express applicaton
const app = express();
// Define a port to listen on
const PORT = 3000;
// imports the path module
const path = require("path");
// Middleware for Parsing Request Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// Setting up API Routes
const apiRoutes = require(path.join(__dirname, "/api/routes"));  // imports the module from API directory
app.use("/", apiRoutes);  // sets up middleware to handle requests to the '/api' endpoint using the imported module
// Use express.static middleware to serve static files
app.use(express.static(path.join(__dirname, 'client')));

// Starting the Server
app.listen(PORT, (error) => {
    if (error) {
        console.log("The Server Did not start: ", error);
        return
    }

    console.log(`Server is running on http://localhost:${PORT}`);
    });
