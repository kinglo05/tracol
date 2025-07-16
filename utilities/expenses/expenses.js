// Firebase Configuration (Replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCYe3m5O6X1-q47u1w1GQ4bT8pAvJ5tzq8",
  authDomain: "tracollector.firebaseapp.com",
  databaseURL: "https://tracollector-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tracollector",
  storageBucket: "tracollector.firebasestorage.app",
  messagingSenderId: "520928034041",
  appId: "1:520928034041:web:1e5facfbe4ddb5e55e7628",
  measurementId: "G-YPW4TB6P51"
};


const app = firebase.initializeApp(firebaseConfig); 
const database = firebase.database();


// Firebase Auth Listener to Check if User is Logged In
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in:", user.uid);

    // Fetch user data from Firebase Database
    firebase.database().ref("users/" + user.uid).once("value")
    .then(snapshot => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById("usernameDisplay").innerText = userData.email;
        } else {
            console.log("No user data found!");
        }
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
    });
     
     
  } else {
      console.log("No user is signed in. Redirecting to login...");
      window.location.href = "index.html"; // Redirect if not logged in
  } 
});












const usersRef = database.ref("tracollector/users");

// Get DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll(".sidebar a");
const pages = document.querySelectorAll(".page");
const paymentForm = document.getElementById("payment-form");

const doneBtn = document.getElementById("done");

const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");


const saveEditBtn2 = document.getElementById("save-edit2");
const cancelEditBtn1 = document.getElementById("cancel-edit");



const amountInput = document.getElementById('amount');
const refNumberInput = document.getElementById('ref-number');
const paymentTypeSelect = document.getElementById('payment-type');
const paymentType = document.getElementById('payment-type');
const timeInput = document.getElementById('time');
const dateInput = document.getElementById('date');
const userInput = document.getElementById('user'); 


const editFireKey = document.getElementById('edit-fireKey');
const fireKey = document.getElementById('fireKey');



const editUser = document.getElementById('edit-user');
const merchantInputPay = document.getElementById("merchant-pay");
const submitNewPayment = document.getElementById("submit-payment");
const alertBox = document.getElementById("customAlert");
const purpose = document.getElementById("purpose");


  

// Get the current page URL (or path)
const currentPage1 = window.location.pathname; // Or window.location.href if you need the full URL

// Get all the <li> elements
const navItems = document.querySelectorAll('ul li');

navItems.forEach(item => {
  const link = item.querySelector('a');
  const linkPath = new URL(link.href, window.location.origin).pathname; // Get the pathname from the href

  if (linkPath === currentPage1) {
    item.classList.add('active');
  }
});




// Global Variables
//let currentUserId = "user123"; // Replace with actual user authentication logic
let editPaymentId = null; // Store the ID of the payment being edited





const tableData = [];
let currentPage = 1;
let rowsPerPage = 10; // Initial value

// Fetch data from Firebase and display in the table
let paymentsData = []; // Store the fetched payment data

database.ref('payments').on('value', (snapshot) => {
  tableData.length = 0; // Clear existing data
  paymentsData = [];

});




const dateInput22 = document.getElementById('date-today');
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + today.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;

  dateInput.value = formattedDate; 
 // dateInput22.value = formattedDate; 



submitNewPayment.addEventListener('click', () => {
  const inputDate = dateInput.value;
  const amount = amountInput.value;

  savePayment2(inputDate,amount);
  Swal.fire({
    title: "Success!",
    text: "New expenses saved successfully!",
    icon: "success",
    timer: 3000, // Closes after 3 seconds
    showConfirmButton: false
  });
  
});


function savePayment2(inputDate, amount) {  // Correctly placed *inside* the callback 
  const newExpenses = {
      amount: amount, // Use the validated amount
      date: inputDate,
      paymentType: paymentType.value,
      user: userInput.value,
      purpose: purpose.value,
      status: 'new',

 
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const newExpensesRef = firebase.database().ref('expenses').push();
const newExpensetKey = newExpensesRef.key;

return firebase.database().ref('expenses/' + newExpensetKey).set(newExpenses)
    .then(() => {

      window.location.href = "expensesTable.html";
      /*  Swal.fire({
        title: "Success!",
        text: "New payment edited successfully!",
        icon: "success",
        timer: 3000, // Closes after 3 seconds
        showConfirmButton: false
      }); 
       */
     
     console.log("The expenses was saved successfully");

       
    })
    .catch((error) => {
        console.error("Error adding payment:", error);
        alert("An error occurred while adding the new expenses. Please try again.");
    });
}



































