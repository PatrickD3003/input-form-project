/*
Client-Side Javascript code. Handles a form submission, 
sends the data to the server & processes the server's response.
 */
document.addEventListener("DOMContentLoaded", function () {
  fetch("/getAllMessages")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched data from server: ", data); // debugging purposes
      data.forEach((customer) => {
        const row = document.createElement("tr");
        console.log(customer);
        row.innerHTML = `
                    <td>${customer.Customer_Name}</td>
                    <td>${customer.Loan_Limit}</td>
                    <td>${customer.Ongoing_Loan}</td>
                    <td>${customer.Payment_frequency}</td>
                    <td>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </td>
                `;
        tableElement.appendChild(row);

        // Add event listener to the delete button
        row.querySelector(".delete").addEventListener("click", function () {
          deleteCustomer(customer.Customer_Name, row);
        });
        // Add event listener to the edit button
        row.querySelector(".edit").addEventListener("click", function () {
          navigateToEditForm(customer);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching customer data:", error);
    });
});

// Function to delete a customer
function deleteCustomer(customerName, row) {
  fetch(`/deleteMessage/${customerName}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Delete response: ", data);
      // Remove the row from the table
      row.remove();
    })
    .catch((error) => {
      console.error("Error deleting customer:", error);
    });
}

// Function to navigate to edit form with customer data
function navigateToEditForm(customer) {
  const urlParams = new URLSearchParams({
    name: customer.Customer_Name,
    loanLimit: customer.Loan_Limit,
    ongoingLoan: customer.Ongoing_Loan,
    paymentFrequency: customer.Payment_Frequency,
  });
  window.location.href = `../edit-form.html?${urlParams.toString()}`;
}
