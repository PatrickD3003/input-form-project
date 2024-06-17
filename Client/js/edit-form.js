/*
Client-Side Javascript code. Handles a form submission, 
sends the data to the server & processes the server's response.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Get query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);

  // Extract specific parameters
  const name = urlParams.get("name");
  const loanLimit = urlParams.get("loanLimit");
  const ongoingLoan = urlParams.get("ongoingLoan");
  const paymentFrequency = urlParams.get("paymentFrequency");

  // Pre-fill form fields with the extracted parameters
  document.getElementById("name").value = name;
  document.getElementById("loanLimit").value = loanLimit;
  document.getElementById("ongoingLoan").value = ongoingLoan;
  document.getElementById("paymentFrequency").value = paymentFrequency;
});
