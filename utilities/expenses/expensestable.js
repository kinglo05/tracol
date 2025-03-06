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
      window.location.href = "index.html"; // Redirect if not logged in
  } 
});





////////////////////LOGOUT BUTTON //////////////////////
document.getElementById("logoutButton").addEventListener("click", function() {
  firebase.auth().signOut().then(() => {
      console.log("User signed out.");
      window.location.href = "index.html"; // Redirect to login page
  }).catch((error) => {
      console.error("Logout Error:", error);
  });
});





// Firebase Data Paths
const paymentsRef = database.ref("tracollector/payments");
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



const amountInput = document.getElementById('amount');
const refNumberInput = document.getElementById('ref-number');
const paymentTypeSelect = document.getElementById('payment-type');
const paymentType = document.getElementById('payment-type');
const timeInput = document.getElementById('time');
//const dateInput = document.getElementById('date');
const userInput = document.getElementById('user'); 
const paymentSearchInput = document.getElementById('payment-search');
const editPaymentForm = document.getElementById('edit-payment-form');
const monthInput = document.getElementById('monthInput');
const editPaymentFormPaid = document.getElementById('edit-payment-form');

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


const table = document.getElementById('payments-table').getElementsByTagName('tbody')[0];
const rowsPerPageSelect = document.getElementById('rows-per-page');
const tableData = [];
let currentPage = 1;
let rowsPerPage = 10; // Initial value

// Fetch data from Firebase and display in the table
let paymentsData = []; // Store the fetched payment data

database.ref('expenses').on('value', (snapshot) => {
  tableData.length = 0; // Clear existing data
  paymentsData = [];

  snapshot.forEach((childSnapshot) => {
    const payment = childSnapshot.val();
    const firebaseKey = childSnapshot.key; // Get the Firebase key

    // Filter for payments with status 'new'
    if (payment.status === 'new') {
      paymentsData.push({ id: firebaseKey, ...payment });

      const rowData = {
        firebaseKey: firebaseKey, // Store the key
        amount: payment.amount,
      //  refNumber: payment.refNumber,
        paymentType: payment.paymentType,
      //  time: payment.time,
        date: payment.date,
        user: payment.user,
      //  merchantP: payment.merchantP,
        status: payment.status
      };

      tableData.push(rowData);
    }
  });

  updatePaymentsTable(paymentsData); // Initial table population
});





function updatePaymentsTable(data) {
table.innerHTML = ''; // Clear the table



data.forEach((payment, rowIndex) => {
  const row = table.insertRow();


  const rowIndexCell = row.insertCell();
  rowIndexCell.textContent = rowIndex + 1;

  const assignCell = row.insertCell();
  assignCell.innerHTML = `<button class="edit-button-assign" data-row-index="${payment.id}">+</button>`;

  const amountCell = row.insertCell();
  amountCell.textContent = payment.amount;

  const dateCell = row.insertCell();
  dateCell.textContent = payment.date;

  const paymentTypeCell = row.insertCell();
  paymentTypeCell.textContent = payment.paymentType;

  const userCell = row.insertCell();
  userCell.textContent = payment.user;

  ////merchant here old /////
  

  const statusCell = row.insertCell();
  statusCell.textContent = payment.status;


    
   //////////////////////////// ALL ABOUT CHECKBOX SELECTION STARTS HERE  /////////////////////////// 
  
  // Add Checkbox cell
  const tablePayments = document.getElementById('payments-table').getElementsByTagName('tbody')[0];
//  const selectAllCheckbox = document.getElementById('payment-sana-all');
  const checkboxCell = row.insertCell();
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  // Set the initial checked state based on the status
  checkbox.checked = payment.status === 'paid'; 
  
  
  
    checkbox.addEventListener('change', (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    if (checkbox.checked) {
      statusCell.textContent = 'paid'; 
      // Update the status in your Firebase database here
      database.ref('expenses/' + payment.id).update({ status: 'paid' });
     
    } else {
      statusCell.textContent = 'new';
      // Update the status in your Firebase database here
      database.ref('expenses/' + payment.id).update({ status: 'new' });
     
    }
  });  
  
  checkboxCell.appendChild(checkbox); 
 

  // Add Edit button with data-row-index 
  const editCell = row.insertCell();
  editCell.innerHTML = `<button class="edit-button" data-row-index="${payment.id}">Edit</button>`;

checkbox.addEventListener('change', (event) => {
  event.stopPropagation(); // Prevent event from bubbling up
  if (checkbox.checked) {

    
     statusCell.textContent = 'paid'; 
    // Update the status in your Firebase database here
    database.ref('expenses/' + payment.id).update({ status: 'paid' });
    checkbox.disabled = true;
    console.log("Status Change to Paid");

  } else {
    statusCell.textContent = 'new';
    // Update the status in your Firebase database here
    database.ref('expenses/' + payment.id).update({ status: 'new' });
  
    console.log("Status change to NEW");

  }


});


/////////////////////////////////// auto add /////////////////////////////


const paymentsTableNew = document.getElementById('payments-table');

// Check if the table exists before proceeding
if (paymentsTableNew) {
    const tableBody = paymentsTableNew.querySelector('tbody');

    // Check if the tbody exists
    if(tableBody){
        const totalAmountSpanNew22 = document.getElementById('table-total');

        function calculateTotalNew() {
          itemList.innerHTML = ""; // Clear existing list
            let totalNew = 0;
            const amountCells = tableBody.querySelectorAll('td:nth-child(3)');

            amountCells.forEach(cell => {
                const amountNew = parseFloat(cell.textContent) || 0;
                totalNew += amountNew;

               // console.log("DIRI   " + amountCells);
            });

            if (totalAmountSpanNew22) { // Check if the total amount span exists
                totalAmountSpanNew22.textContent = totalNew.toFixed(2);
              
            } else {
                console.error("Total amount span element not found!");
            }
        }

        calculateTotalNew(); // Initial calculation

        const observer = new MutationObserver(calculateTotalNew);
        const config = { childList: true, subtree: true };

        observer.observe(tableBody, config);
    } else {
        console.error("Table body (tbody) not found!");
    }
  }

////////////////////////// test for checkbox claimed ALL /////////////////////////

// // Your submit button
const payTable = document.getElementById('payments-table'); // Your table ID
//const checkboxClaimed = document.getElementById('checkboxClaimed');

checkboxClaimed.addEventListener('click', () => {
  const rowsOr = payTable.querySelectorAll('tbody tr'); // Get all rows in the table body

  payTable.forEach(rowsOr, rowIndex => {
    //data.forEach((payment, rowIndex) => {
    const statusCellC = row.querySelector('td:nth-child(9)'); // Get the status cell (replace statusColumnIndex with the actual index)
    const exKey =  rowIndex.id; //// ... get the payment key from the row ... 
   
   
    if (statusCellC.textContent === 'new') { // Check if the status is 'new'
      // Update the status in Firebase
      database.ref(`expenses/${exKey}`).update({
        status: 'paid'
      })
      .then(() => {
        console.log(`expenses ${exKey} updated to Paid`);
        // ... you might want to update the status in the table cell as well ...
        //statusCellC.textContent = 'claimedNO'; 
      })
      .catch(error => {
        console.error(`Error updating expenses ${exKey}:`, error);
        // ... display an error message to the user ...
      });
    }
  });
});


/////////////////////////////  // Event listener for Edit button //////////////////////////////

 editCell.addEventListener('click', (event) => {
 const button = event.target;
 const firebaseKey = button.dataset.rowIndex;
 const rowData = tableData.find(data => data.firebaseKey === firebaseKey);
 const firebaseKey99 = firebaseKey;
 

    document.getElementById('edit-fireKey').value = rowData.firebaseKey;
    document.getElementById('edit-amount').value = rowData.amount;
    
    document.getElementById('edit-payment-type').value = rowData.paymentType;
   
    document.getElementById('edit-date').value = rowData.date;
    document.getElementById('edit-user').value = rowData.user;
    document.getElementById('edit-status').value = rowData.status;
    // document.getElementById('edit-merchant').value = rowData.merchantP; // Populate merchant 

    console.log("mao ni keyyererere" , firebaseKey99);

    // Show the modal display only to collect data in input fields next to save BTN /////
  





   const saveEditBtn = document.getElementById('save-edit');

 
  
   
   
   saveEditBtn.addEventListener('click', () => {
    
   
                
                 const updatedExpensesDetails = {
   
                   //  firebasekey: document.getElementById('edit-idPay').value,
                     amount: document.getElementById('edit-amount').value,
                   //  refNumber: document.getElementById('edit-ref-number').value,
                     paymentType: document.getElementById('edit-payment-type').value,
                   //  time: formattedTime,
                     date: document.getElementById('edit-date').value,
                     user: document.getElementById('edit-user').value,
                     status: document.getElementById('edit-status').value,
                   //  merchantP: document.getElementById('edit-merchant').value, 
                    //erchantKey: merchantFirebaseKey, // The new merchant Firebase Key
                 };
   
                 // Update in Firebase (example)
               
                 database.ref(`expenses/${firebaseKey99}`).update(updatedExpensesDetails)
                     .then(() => {
                       
                    
                   Swal.fire({
                     title: "Success!",
                     text: "New expenses edited successfully!",
                     icon: "success",
                     timer: 3000, // Closes after 3 seconds
                     showConfirmButton: false
                   });
                   
                   editPaymentForm.style.display = 'none'; 
   
   
   
                        // window.location.reload();
                        
                  
                     })
                     .catch(error => {
                         console.error("Error updating expenses data:", error);
                         // ... error handling ...
                     });
                  window.location.reload();
             }

                 // Handle the case where the merchant key was not found.
              
                
         
         //alert("Payment details updated successfully!");
   );




   editPaymentForm.style.display = 'block'; 




 
});




  });    




const merchantInput = document.getElementById('edit-merchant');
const suggestionsList = document.getElementById('suggestionsList');

};




let timeoutId;

paymentSearchInput.addEventListener('input', () => {
  clearTimeout(timeoutId); // Clear any previous timeout

  timeoutId = setTimeout(() => {
    const searchTerm = paymentSearchInput.value.toLowerCase();
const filteredDataP = paymentsData.filter((payment) => {
      return (
       
        (payment?.amount?.toString()?.toLowerCase()?.includes(searchTerm)) || // ... other conditions
        //(payment.amount.toString().toLowerCase().includes(searchTerm)) ||
      //  (payment.refNumber.toLowerCase().includes(searchTerm)) ||
      //  (payment.time.toLowerCase().includes(searchTerm)) ||
        (payment.date.toLowerCase().includes(searchTerm)) ||
        (payment.paymentType.toLowerCase().includes(searchTerm)) ||
        (payment.user.toLowerCase().includes(searchTerm)) 
      //  (payment.merchantP.toLowerCase().includes(searchTerm)) 
      );
    });
    updatePaymentsTable(filteredDataP);
  }, 100); // Delay of 250 milliseconds (adjust as needed)
});

  


//cancel to hide add editform
cancelEditButton.addEventListener('click', () => {
editPaymentForm.style.display = 'none'; 
});






const totalForTheDay = dateInput22.value; 
const displaytodaytotal = document.getElementById('total-today');

/* function dailypayments() {
  database.ref('expenses').once('value', (paymentsSnapshot) => {
    const payments = [];
    paymentsSnapshot.forEach((paymentSnapshot) => {
        const payment = paymentSnapshot.val();
        //Only add payments with status new
        if (payment.date === totalForTheDay) { //This is the added line
            payments.push(payment);
        }
    });
     
     const todatNumberPayments = {};
      const todayTotal = {};
  
      payments.forEach((payment) => {
          if (payment.date && payment.amount) { // Check if merchantP and amount exist
          
              const paymentdate= payment.date;
              const amount = parseFloat(payment.amount); // Parse amount as float
  
             if (!todatNumberPayments[paymentdate]) {
              todatNumberPayments[paymentdate] = 0;
              
            }
            todatNumberPayments[paymentdate]++;
  
              if (!todayTotal[paymentdate]) {
                todayTotal[paymentdate] = 0;
                 
  
              }
              todayTotal[paymentdate] += amount;
           
           }


           const paymentdate = (payment.date);
           const totalForTheDay = (todayTotal[paymentdate] || 0).toFixed(2);
           const pilakaresibo = (todatNumberPayments[paymentdate] || 0);
           const eight1 = (totalForTheDay * 0.08).toFixed(2);
           const eightPoint1 = (totalForTheDay * 0.085).toFixed(2);
           const eight = (eight1 - 500).toFixed(2);
           const eightPoint = (eightPoint1 - 500).toFixed(2);
          
document.getElementById('total-today').value = totalForTheDay;
document.getElementById('total-resibo').value = pilakaresibo;
document.getElementById('eight').value = eight;
document.getElementById('eightFive').value = eightPoint;
          })
        })
      }; */
   //   dailypayments();



            const displaytodayTrade = document.getElementById('total-claimed');
            const displayTotalResiboClaimed = document.getElementById('total-resiboClaimed');
            const displayEight = document.getElementById('eight');
            const displayEightFive = document.getElementById('eightFive');
            
          function calculateDailyTrades() {
              
              database.ref('expenses').once('value', (paymentsSnapshot) => {
                const payments = [];
                paymentsSnapshot.forEach((paymentSnapshot) => {
                  const payment = paymentSnapshot.val();
                  if (payment.status === "claimed") {
                    payments.push(payment);
                  }
                });
            
                const totalnoClaimed = {};
                const todayTotalTrade = {};
            
                const today = dateInput22.value;  // new Date();
         

                payments.forEach((payment) => {
                  if (payment.status && payment.amount && payment.date) {
                    const paymentStatus = payment.status;
                    const amount = parseFloat(payment.amount);
                    const paymentDate = payment.date; // Assuming payment.date is a timestamp
        
                    // Check if the payment date is within today's range
                    if (paymentDate == today ) {
                      if (!totalnoClaimed[paymentStatus]) {
                        totalnoClaimed[paymentStatus] = 0;
                      }
                      totalnoClaimed[paymentStatus]++;
            
                      if (!todayTotalTrade[paymentStatus]) {
                        todayTotalTrade[paymentStatus] = 0;
                      }
                      todayTotalTrade[paymentStatus] += amount;
            
                      const paymentStatusClaimed = (payment.status);
                      const totalForTheDayTrade = (todayTotalTrade[paymentStatusClaimed] || 0).toFixed(2);
                      const pilakaresiboClaimed = (totalnoClaimed[paymentStatusClaimed] || 0);
                      const eight = (totalForTheDayTrade * 0.08).toFixed(2);
                      const eightPoint = (totalForTheDayTrade * 0.085).toFixed(2);
                      const eight2 = (totalForTheDayTrade * 0.08).toFixed(2);
            
                      document.getElementById('eightC').value = eight;
                      document.getElementById('eightFiveC').value = eightPoint;
                      document.getElementById('total-claimed').value = totalForTheDayTrade;
                      document.getElementById('total-resiboClaimed').value = pilakaresiboClaimed;

                     
                    }
                    
                  }
                });
              })
            .catch(error => {
                console.error("Error fetching data from Firebase:", error);
                // Handle the error appropriately (e.g., display an error message to the user)
              });
            };
            
            calculateDailyTrades();


            document.getElementById("add-merchant-button").addEventListener("click", function() {
              window.location.href = "expenses.html";
            });











