/*
Client-Side Javascript code. Handles a form submission, 
sends the data to the server & processes the server's response.
 */
document.addEventListener("DOMContentLoaded", function () {
    // HTML Elements Selection
    const postBtn = document.getElementById("post_");
    const feedbackEl = document.getElementById("feedback-msg");
    const nameEl = document.querySelector("input[name='name']");
    const limitEl = document.querySelector("input[name='loanLimit']");
    const ongoingEl = document.querySelector("input[name='ongoingLoan']");
    const frequencyEl = document.querySelector("input[name='paymentFrequency']");
    // initializes an empty object that will store the form data sent to the server
    const message_ = {};
    if (postBtn) {
    // Button Click Event Handler
    postBtn.onclick = function () {
        // Assign values to message_ object
        message_.Name = nameEl.value;
        message_.Limit = limitEl.value;
        message_.Ongoing = ongoingEl.value;
        message_.Frequency = frequencyEl.value;
        console.log("Our MSG before sending to the server:",message_);  // debugging purpose
        // Sending Data to the Server
        fetch("/api/inputNew",{  // Initiates a network request to the specified URL ('/api/inputNew')
            method: "POST",  // Specifies that this is a POST request.
            body: JSON.stringify(message_),  // Converts the 'message_' object to a JSON string to be sent in the request body.
            headers: {
                "content-type" : "application/json"  // sets the request headers,specifying that the content is 'application/json' so the server knows to expect JSON data.
            }
        })
        // Handling the Server Response
        .then(res => res.json())  // Convert the response from the server to a JavaScript object (assuming the response is JSON)
        .then(data => {  // Processes the parsed response data.
            console.log(data);  // logs the response data
            feedbackEl.innerHTML = data.Message;  // Updates the content of the 'feedbackEl' element with the message from the server's side.
        })
        .catch(err => {
            console.log("the error from post request: ", err);
            feedbackEl.innerHTML = "Something went wrong, please try again.";
        });
    };
    }

    // Fetch and display the customer data in the table when 'customerData.html' is loaded
    const tableElement = document.querySelector('#tableElement tbody');

    if (!tableElement) {
        console.error("Table element not found!");
        return;
    }

    fetch("/api/getAllMessages")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data from server: ", data);  // debugging purposes
            data.forEach(customer => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${customer.Customer_Name}</td>
                    <td>${customer.Loan_Limit}</td>
                    <td>${customer.Ongoing_Loan}</td>
                    <td>${customer.Payment_Frequency}</td>
                `;
                tableElement.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching customer data:", error);
        });
});