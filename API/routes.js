/*
This file defines the routes for handling HTTP requests.
 */
// importing required modules
const express = require("express");
const path = require("path");
const router = express.Router();
const contactFormH = require("./contact-form-handler.js");

// Defining Routes
// Define a POST route for '/inputNew' that uses the 'postMessage' handler to process form submission.
router.post("/inputNew", contactFormH.postMessage);  
// Define a GET route for 'getAllMessages' that uses the 'getAllMessages' handler to retrieve all customer data.
router.get("/getAllMessages", contactFormH.getAllMessages);  

router.get('/inputNew', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/inputNew.html'));
});

router.get('/customerData', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/customerData.html'));
});

router.delete("/deleteMessage/:customerName", contactFormH.deleteMessage);

router.post("/editData", contactFormH.editData);
router.get('/editData/:customerName', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/editData.html'));
});
//  Define a GET route for  '/inputNew' taht uses the 'getMessages' handler to retrieve all messages.
// router.get("/inputNew", contactFormH.getMessages);  
// Defines a GET route for '/inputNew/:id' that uses the 'getMessagesByID' handler to retrieve a message by its ID.
// router.get("/inputNew/:id", contactFormH.getMessageByID);  

module.exports = router;