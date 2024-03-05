// // Get the modal element
// const modal = document.getElementById("expenseModal");

// // Get the button that opens the modal
// const openModalBtn = document.getElementById("openModalBtn");

// // Get the close button (span) inside the modal
// const closeBtn = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// openModalBtn.onclick = function () {
//   modal.style.display = "block";
// };

// // When the user clicks the close button, close the modal
// closeBtn.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside the modal, close it
// window.onclick = function (event) {
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// };

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
  expenseForm.reset(); // Reset the form fields when closing the popup
}

// script.js
// Get form, expense list, and total amount elements
const expenseForm = document.getElementById("add-expense-form");

const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

// Initialize expenses array from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render expenses in tabular form
function renderExpenses() {
  // Clear expense list
  expenseList.innerHTML = "";

  // Initialize total amount
  let totalAmount = 0;

  // Loop through expenses array and create table rows
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const expenseRow = document.createElement("tr");
    expenseRow.innerHTML = ` 
	<td>${expense.name}</td> 
	<td>$${expense.amount}</td> 
	<td class="delete-btn" data-id="${i}">Delete</td> 
	`;
    expenseList.appendChild(expenseRow);

    // Update total amount
    totalAmount += expense.amount;
  }

  // Update total amount display
  totalAmountElement.textContent = totalAmount.toFixed(2);

  // Save expenses to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

/// Function to add expense
function addExpense(event) {
  event.preventDefault();

  // Get expense details from the form
  const expenseNameInput = document.getElementById("expense-name");
  const expenseDescriptionInput = document.getElementById(
    "expense-description"
  );
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseDateInput = document.getElementById("expense-date");

  // Extract values from the form inputs
  const expenseName = expenseNameInput.value;
  const expenseDescription = expenseDescriptionInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const expenseDate = expenseDateInput.value;

  // Validate inputs
  if (
    expenseName === "" ||
    isNaN(expenseAmount) ||
    expenseDescription === "" ||
    expenseDate === ""
  ) {
    alert("Please enter valid expense details.");
    return;
  }

  // Create a new expense object
  const expense = {
    name: expenseName,
    description: expenseDescription,
    amount: expenseAmount,
    date: expenseDate,
  };

  // Add the expense to the expenses array
  expenses.push(expense);

  // Render the updated expenses
  renderExpenses();

  // Clear the form inputs
  expenseNameInput.value = "";
  expenseDescriptionInput.value = "";
  expenseAmountInput.value = "";
  expenseDateInput.value = "";

  // Close the popup
  closePopup();
}
