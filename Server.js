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
const api_ = require(path.join(__dirname, "/API"));  // imports the module from API directory
app.use("/api", api_);  // sets up middleware to handle requests to the '/api' endpoint using the imported module
// Use express.static middleware to serve static files
app.use("/", express.static(path.join(__dirname, "/Client")));
app.use("/home", express.static(path.join(__dirname, "/Client")));
app.use("/customerData", express.static(path.join(__dirname, "/Client/customerData.html")));
app.use("/inputNew", express.static(path.join(__dirname, "/Client/inputNew.html")));
app.use("*", express.static(path.join(__dirname, "/Client/404.html")));
// Starting the Server
app.listen(PORT, (error) => {
    if (error) {
        console.log("The Server Did not start: ", error);
        return
    }

    console.log(`Server is running on http://localhost:${PORT}`);
    });
