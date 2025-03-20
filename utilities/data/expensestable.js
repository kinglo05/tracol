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
            document.getElementById("usernameDisplay").innerText =  userData.email;
        } else {
            console.log("No user data found!");
        }
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
    });
     
     
  } else {
      console.log("No user is signed in. Redirecting to login...");
      window.location.href = "../../index.html"; // Redirect if not logged in
  } 
});



// Firebase Data Paths

const merchantsRef = database.ref("tracollector/merchants");
const usersRef = database.ref("tracollector/users");
const paymentTypesRef = database.ref("tracollector/paymentTypes");

// Get DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll(".sidebar a");
const pages = document.querySelectorAll(".page");
const paymentForm = document.getElementById("payment-form");
const paymentConfirmation = document.getElementById("payment-confirmation");
const confirmationMessage = document.getElementById("confirmation-message");
const addAnotherPaymentBtn = document.getElementById("add-another-payment");
const doneBtn = document.getElementById("done");
//const paymentsTable = document.getElementById("payments-table").getElementsByTagName("tbody")[0];
const editMerchantBTN= document.getElementById("save-edit-merchant");


//const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");

const totalTodaySpan = document.getElementById("total-today");
const totalNewTodaySpan = document.getElementById("total-new-today");
const totalClaimedTodaySpan = document.getElementById("total-claimed-today");
const totalThisMonthSpan = document.getElementById("total-this-month");
const closeModalButtons = document.querySelectorAll('.close-modal'); 
const cancelEditButton = document.getElementById('cancel-edit');

const editPaymentFormAssign = document.getElementById('edit-payment-formAssign');

const amountInput = document.getElementById('amount');
const refNumberInput = document.getElementById('ref-number');
const paymentTypeSelect = document.getElementById('payment-type');
const paymentType = document.getElementById('payment-type');
const timeInput = document.getElementById('time');
//const dateInput = document.getElementById('date');
const userInput = document.getElementById('user'); 
const paymentSearchInput = document.getElementById('payment-search');
const editPaymentForm = document.getElementById('edit-payment-formE');
const monthInput = document.getElementById('monthInput');
const editPaymentFormPaid = document.getElementById('edit-payment-form');
const cancelEditButtonAssign = document.getElementById("cancel-editAssign");
// Get the current page URL (or path)
const currentPage2 = window.location.pathname; // Or window.location.href if you need the full URL



document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("monthInput");
  const now = new Date();
  
  const year = now.getFullYear(); // Get current year (e.g., 2025)
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Get month (01-12)

  inputField.value = `${year}-${month}`; // Example output: "2025-03"
});


const now = new Date();
const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`; // Example: "2025-03"






// Get all the <li> elements
const navItems = document.querySelectorAll('ul li');

navItems.forEach(item => {
const link = item.querySelector('a');
const linkPath = new URL(link.href, window.location.origin).pathname; // Get the pathname from the href

if (linkPath === currentPage2) {
    item.classList.add('active');
  }
});






// Global Variables
//let currentUserId = user.uid; // Replace with actual user authentication logic
let editPaymentId = null; // Store the ID of the payment being edited

const dateInput22 = document.getElementById('date-today');
  const today = new Date();

  // Format the date as YYYY-MM-DD (required for input type="date")
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + today.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate2 = `${year}-${month}-${day}`;

  dateInput22.value = formattedDate2; 




  



////////////////////////////   PAYMENTS TABLE1 - STARTS  HERE  /////////////////////



const paymentsRef = database.ref("payments");
let merchantData = []; // Store merchant sums

function fetchAndDisplaySums() {
    const paymentsRef2 = database.ref("payments");

    paymentsRef2.on("value", (snapshot) => {
        let merchantSums = {};
        let totalSumAll = 0;

        snapshot.forEach((childSnapshot) => {
            const payment = childSnapshot.val();

            if (payment.status === "new") {
                const merchant = payment.merchantP;
                const amount = parseFloat(payment.amount) || 0;

                if (!merchantSums[merchant]) {
                    merchantSums[merchant] = 0;
                }
                merchantSums[merchant] += amount;
                totalSumAll += amount;
            }
        });

        // Convert object to array
        merchantData = Object.entries(merchantSums).map(([name, amount]) => ({
            name,
            amount
        }));

        document.getElementById("totalSum").innerText = totalSumAll.toFixed(2);
        localStorage.setItem("totalSumAll" , totalSumAll);

        // Default sorting
        sortTable("amount", true);
    });
}

function sortTable(type, initial = false) {
    let sortOrder = 1; // 1 = ascending, -1 = descending

    if (!initial) {
        const header = document.querySelector(`th[onclick="sortTable('${type}')"]`);
        const currentText = header.innerText;

        if (currentText.includes("▲")) {
            sortOrder = -1;
            header.innerText = header.innerText.replace("▲", "▼");
        } else {
            sortOrder = 1;
            header.innerText = header.innerText.replace("▼", "▲");
        }
    }

    merchantData.sort((a, b) => {
        return type === "amount"
            ? (b.amount - a.amount) * sortOrder
            : a.name.localeCompare(b.name) * sortOrder;
    });

    filterTable(); // Apply filter after sorting
}

function filterTable() {
    const searchQuery = document.getElementById("payment-search").value.toLowerCase();
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    merchantData
        .filter((merchant) => merchant.name.toLowerCase().includes(searchQuery))
        .forEach((merchant) => {
            const row = `<tr>
                <td>${merchant.name}</td>
                <td>${merchant.amount.toFixed(2)}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
}

fetchAndDisplaySums();



function fetchAndDisplaySums22() {
    const paymentsRef22 = database.ref("payments");

    paymentsRef22.on("value", (snapshot) => {
        let merchantSums2 = {};
        let totalSumNoname = 0;

        snapshot.forEach((childSnapshot) => {
            const payment = childSnapshot.val();

            if (payment.merchantP === "" && payment.status === "new") {
                const merchant = payment.merchantP;
                const amount = parseFloat(payment.amount) || 0;

                if (!merchantSums2[merchant]) {
                    merchantSums2[merchant] = 0;
                }
                merchantSums2[merchant] += amount;
                totalSumNoname += amount;
            }
        });

        // Convert object to array
        merchantData = Object.entries(merchantSums2).map(([name, amount]) => ({
            name,
            amount
        }));

       // document.getElementById("totalMerchantDeposit").innerText = totalSumNoname.toFixed(2);
      //  const grand = document.getElementById("totalSum").value;
        localStorage.setItem("totalSumNoname" , totalSumNoname);
    

       
        // Default sorting
       // sortTable("amount", true);
    });
}



fetchAndDisplaySums22();





function updateDisplay() {
    let totalSumNoname = localStorage.getItem("totalSumNoname"); ////used
    let totalSumAll = localStorage.getItem("totalSumAll");
     
    const totalDeposit =  Number(totalSumAll - totalSumNoname) || 0;
     
    document.getElementById("totalMerchantDeposit").innerText = totalDeposit.toFixed(2);
  

  }
  
  updateDisplay();
  
  // Listen for storage updates
  window.addEventListener("storage", function(event) {
    if (event.key  === "totalSumNoname","totalSumAll") {
        updateDisplay();
    }
  });
  

  updateDisplay();





