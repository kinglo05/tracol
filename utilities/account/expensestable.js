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


const table = document.getElementById('payments-table').getElementsByTagName('tbody')[0];
const rowsPerPageSelect = document.getElementById('rows-per-page');
const tableData = [];
let currentPage = 1;
let rowsPerPage = 10; // Initial value

// Fetch data from Firebase and display in the table
let paymentsData = []; // Store the fetched payment data

database.ref('accounts').on('value', (snapshot) => {
  tableData.length = 0; // Clear existing data
  paymentsData = [];

  snapshot.forEach((childSnapshot) => {
    const payment = childSnapshot.val();
    const firebaseKey = childSnapshot.key; // Get the Firebase key

    // Filter for payments with status 'new'
    if (payment.status === 'active') {
      paymentsData.push({ id: firebaseKey, ...payment });

      const rowData = {
        firebaseKey: firebaseKey,
        accounttype: payment.accountType,
        accountName : payment.name,
        accountnumber: payment.accountNum,
        note : payment.note,   
        status: payment.status,
        pincode: payment.pincode,
        cpInserted: payment.cpInserted,  


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

  const assignCell2 = row.insertCell();
  assignCell2.innerHTML = `<button class="edit-button-assign" data-row-index="${payment.id}">Copy</button>`;

  const amountCell = row.insertCell();
  amountCell.textContent = payment.accountType;

  const dateCell = row.insertCell();
  dateCell.textContent =  payment.name;

  const paymentTypeCell = row.insertCell();
  paymentTypeCell.textContent = payment.accountNum;

  const userCell = row.insertCell();
  userCell.textContent = payment.pincode;

  ////merchant here old /////
  

  const statusCell = row.insertCell();
  statusCell.textContent = payment.status;
  
  const phoneCell = row.insertCell();
  phoneCell.textContent = payment.cpInserted;


  const noteCell = row.insertCell();
  noteCell.textContent = payment.note;





  

    
   //////////////////////////// ALL ABOUT CHECKBOX SELECTION STARTS HERE  /////////////////////////// 
  
  // Add Checkbox cell
  const tablePayments = document.getElementById('payments-table').getElementsByTagName('tbody')[0];
//  const selectAllCheckbox = document.getElementById('payment-sana-all');
  const checkboxCell = row.insertCell();
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  // Set the initial checked state based on the status
  checkbox.checked = payment.status === 'inactive'; 
  
  
  
    checkbox.addEventListener('change', (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    if (checkbox.checked) {
      statusCell.textContent = 'inactive'; 
      // Update the status in your Firebase database here
      database.ref('accounts/' + payment.id).update({ status: 'active' });
     
    } else {
      statusCell.textContent = 'active';
      // Update the status in your Firebase database here
      database.ref('accounts/' + payment.id).update({ status: 'active' });
     
    }
  });  
  
  checkboxCell.appendChild(checkbox); 
 

  // Add Edit button with data-row-index 
  const editCell = row.insertCell();
  editCell.innerHTML = `<button class="edit-button" data-row-index="${payment.id}">Edit-A</button>`;



/////////////////////////////  // Event listener for Edit button //////////////////////////////


editCell.addEventListener('click', (event) => {
  const button = event.target;
  
  const firebaseKey = button.dataset.rowIndex;
  const rowData = tableData.find(data => data.firebaseKey === firebaseKey);
  

  document.getElementById('edit-idPay').value = rowData.firebaseKey;
  document.getElementById('account-type1').value = rowData.accounttype;
  document.getElementById('accountName1').value = rowData.accountName;
   

    
    
    document.getElementById('accountnumberAA').value = rowData.accountnumber;
   
    document.getElementById('phoneInserted').value = rowData.cpInserted;
   
    document.getElementById('pincode2').value = rowData.pincode;
    document.getElementById('status1').value = rowData.status;
    document.getElementById('note').value = rowData.note;
    // document.getElementById('edit-merchant').value = rowData.merchantP; // Populate merchant 
 
  

   // console.log("NGALAN diri sa edit:" ,AB);
    /* console.log("mao ni name" , AB) */;
   

    editPaymentForm.style.display = 'block';

    // Show the modal display only to collect data in input fields next to save BTN /////
  
/////////////////////////////  // Event listener for Edit button aSSIGNMENT  //////////////////////////////





   const saveEditBtn = document.getElementById('save-edit');
   saveEditBtn.addEventListener('click', () => {
    
    const firebaseKey99 =  document.getElementById('edit-idPay').value;
                
                 const updatedExpensesDetails = {
   
                 
                 
                  accountType: document.getElementById('account-type1').value,
                  name: document.getElementById('accountName1').value,
                  accountNum: document.getElementById('accountnumberAA').value,
                  cpInserted: document.getElementById('phoneInserted').value,
                  pincode: document.getElementById('pincode2').value,
                  status: document.getElementById('status1').value,
                  note: document.getElementById('note').value,


                   
                 };
   
                 // Update in Firebase (example)
               
                 database.ref(`accounts/${firebaseKey99}`).update(updatedExpensesDetails)
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
                         console.error("Error updating account data:", error);
                         // ... error handling ...
                     });
                  window.location.reload();
             }

                 // Handle the case where the merchant key was not found.
              
                
         
         //alert("Payment details updated successfully!");
   );



});





assignCell2.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey = button.dataset.rowIndex;
  const rowData = tableData.find(data => data.firebaseKey === firebaseKey);
   
  const accname = rowData.accountName;
  const accnumber = rowData.accountnumber;    
  const accType = rowData.accounttype; 
 
    
     document.getElementById('accountTypeE').innerText = accType;
    document.getElementById('accountNameE').innerText = accname; 
    document.getElementById("accountNumberE").innerText = accnumber;
   
    
     console.log("testor", accType);
   //  document.getElementById('divAmount').value = accType, accname, accnumber;     // Show the modal display only to collect data in input fields next to save BTN /////
    editPaymentFormAssign.style.display = 'block'; 

 });










checkbox.addEventListener('change', (event) => {
  event.stopPropagation(); // Prevent event from bubbling up
  if (checkbox.checked) {

    
     statusCell.textContent = 'inactive'; 
    // Update the status in your Firebase database here
    database.ref('accounts/' + payment.id).update({ status: 'inactive' });
    checkbox.disabled = true;
    console.log("Status Change to Inactive");

  } else {
    statusCell.textContent = 'active';
    // Update the status in your Firebase database here
    database.ref('accounts/' + payment.id).update({ status: 'active' });
  
    console.log("Status change to Active Again");

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
                localStorage.setItem("expensesUnpaid" ,  totalNew);
               
              
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
   
   
    if (statusCellC.textContent === 'active') { // Check if the status is 'new'
      // Update the status in Firebase
      database.ref(`accounts/${exKey}`).update({
        status: 'inactive'
      })
      .then(() => {
        console.log(`accounts ${exKey} updated to Active`);
        // ... you might want to update the status in the table cell as well ...
        //statusCellC.textContent = 'claimedNO'; 
      })
      .catch(error => {
        console.error(`Error updating accounts ${exKey}:`, error);
        // ... display an error message to the user ...
      });
    }
  });
});

/* 
/////////////////////////////  // Event listener for Edit button //////////////////////////////

 editCell.addEventListener('click', (event) => {
  const button = event.target;
  
  const firebaseKey = button.dataset.rowIndex;
  const rowData = tableData.find(data => data.firebaseKey === firebaseKey);
  

  document.getElementById('edit-idPay').value = rowData.firebaseKey;

    document.getElementById('account-type1').value = rowData.accountType;
    
    document.getElementById('accountnumber1').value = rowData.accountNum;
   
    document.getElementById('phoneInserted').value = rowData.cpInserted;
    document.getElementById('accountName1').value = rowData.name;
   
    document.getElementById('pincode2').value = rowData.pincode;
    document.getElementById('status1').value = rowData.status;
    document.getElementById('note').value = rowData.note;
    // document.getElementById('edit-merchant').value = rowData.merchantP; // Populate merchant 
 
    const A =document.getElementById('accountName1').value = rowData.name;

    console.log("mao ni firebase" ,firebaseKey);
    console.log("mao ni name" , A);
   

    editPaymentForm.style.display = 'block';

    // Show the modal display only to collect data in input fields next to save BTN /////
  
/////////////////////////////  // Event listener for Edit button aSSIGNMENT  //////////////////////////////





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
               
                 database.ref(`accounts/${firebaseKey99}`).update(updatedExpensesDetails)
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
                         console.error("Error updating account data:", error);
                         // ... error handling ...
                     });
                  window.location.reload();
             }

                 // Handle the case where the merchant key was not found.
              
                
         
         //alert("Payment details updated successfully!");
   );





   assignCell2.addEventListener('click', (event) => {
    const button = event.target;
    const firebaseKey = button.dataset.rowIndex;
    const rowData = tableData.find(data => data.firebaseKey === firebaseKey);
   
   
       document.getElementById('accountTypeE').value =  rowData.accountType;
       document.getElementById('accountNameE').value = rowData.name;
       document.getElementById('accountNumberE').value = rowData.accountNum;
      
      const teste   = rowData.accountNum;
      
       console.log("testor", teste);
       
       // Show the modal display only to collect data in input fields next to save BTN /////
      editPaymentFormAssign.style.display = 'block'; 
    
   });











}); */


/* assignCell2.addEventListener('click', (event) => {

 
  const button = event.target;
  const firebaseKey = button.dataset.rowIndex;
 
 
     document.getElementById('accountTypeE').value =  rowDataA.accountType;
     document.getElementById('accountNameE').value = rowDataA.name;
     document.getElementById('accountNumberE').value = rowDataA.accountNum;
    
    const teste   = rowDataA.accountNum;
    
     console.log("testor", teste);
     
     // Show the modal display only to collect data in input fields next to save BTN /////
    editPaymentFormAssign.style.display = 'block'; 
  
 }); */









  });    




const merchantInput = document.getElementById('edit-merchant');
const suggestionsList = document.getElementById('suggestionsList');

};



const merchantSearchInput = document.getElementById('merchant-search');
let timeoutId;

paymentSearchInput.addEventListener('input', () => {
  clearTimeout(timeoutId); // Clear any previous timeout

  timeoutId = setTimeout(() => {
    const searchTerm = paymentSearchInput.value.toLowerCase();
const filteredData = paymentsData.filter((payment) => {
      return (
       
        (payment?.accountNum?.toString()?.toLowerCase()?.includes(searchTerm)) || // ... other conditions
        (payment.cpInserted.toLowerCase().includes(searchTerm)) ||
        (payment.accountType.toLowerCase().includes(searchTerm)) ||
        (payment.pincode.toLowerCase().includes(searchTerm)) ||
        (payment.name.toLowerCase().includes(searchTerm)) 
     
      );
    });
    updatePaymentsTable(filteredData);
  }, 100); // Delay of 250 milliseconds (adjust as needed)
});

  


//cancel to hide add editform
cancelEditButton.addEventListener('click', () => {
editPaymentForm.style.display = 'none'; 
});

cancelEditButtonAssign.addEventListener('click', () => {
  editPaymentFormAssign.style.display = 'none'; 
  });




const totalForTheDay = dateInput22.value; 
const displaytodaytotal = document.getElementById('total-today');

function dailypayments() {
  database.ref('accounts').once('value', (paymentsSnapshot) => {
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
      }; 
      dailypayments();

      document.getElementById("add-merchant-button").addEventListener("click", function() {
        window.location.href = "addaccount.html";
      });




     


      function copyText() {
        // Create a temporary textarea
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = document.getElementById("divAmount").innerText;
        document.body.appendChild(tempTextArea);
        
        // Select and copy the text
        tempTextArea.select();
        document.execCommand("copy");
        
        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);
        
        alert("Text copied to clipboard!");
    }

