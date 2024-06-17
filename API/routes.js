/*
This file defines the routes for handling HTTP requests.
 */
// importing required modules
const express = require("express");
const router = express.Router();
const contactFormH = require("./ContactFormHandler.js");
// Defining Routes
// Define a POST route for '/inputNew' that uses the 'postMessage' handler to process form submission.
router.post("/inputNew", contactFormH.postMessage);  
// Define a GET route for 'getAllMessages' that uses the 'getAllMessages' handler to retrieve all customer data.
router.get("/getAllMessages", contactFormH.getAllMessages);  
//  Define a GET route for  '/inputNew' taht uses the 'getMessages' handler to retrieve all messages.
// router.get("/inputNew", contactFormH.getMessages);  
// Defines a GET route for '/inputNew/:id' that uses the 'getMessagesByID' handler to retrieve a message by its ID.
// router.get("/inputNew/:id", contactFormH.getMessageByID);  

module.exports = router;