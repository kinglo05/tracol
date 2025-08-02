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

    // Check UID or Email
    const allowedUID = "SUILZCLhDWWXJDQxizZKWPDms1a2";
    const allowedEmail = "lohwa@gmail.com";

    if (user.uid !== allowedUID && user.email !== allowedEmail) {
      console.warn("Unauthorized user. Redirecting...");
      window.location.href = "unauthorized.html"; // Or any page you prefer
      return; // Stop further code
    }

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


const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");

const totalTodaySpan = document.getElementById("total-today");
const totalNewTodaySpan = document.getElementById("total-new-today");
const totalClaimedTodaySpan = document.getElementById("total-claimed-today");
const totalThisMonthSpan = document.getElementById("total-this-month");
const closeModalButtons = document.querySelectorAll('.close-modal'); 
const cancelEditButton = document.getElementById('cancel-edit');

const saveEditBtn2 = document.getElementById("save-edit2");
const cancelEditBtn1 = document.getElementById("cancel-edit");

const totalTodaySpan2 = document.getElementById("total-today2");
const totalNewTodaySpan2 = document.getElementById("total-new-today2");
const totalClaimedTodaySpan2 = document.getElementById("total-claimed-today2");
const totalThisMonthSpan2 = document.getElementById("total-this-month2");
const closeModalButtons2 = document.querySelectorAll('.close-modal2'); 
const cancelEditButton2 = document.getElementById('cancel-edit2');
const cancelEditButtonMerchant = document.getElementById('cancel-edit-merchant');


const amountInput = document.getElementById('amount');
const refNumberInput = document.getElementById('ref-number');
const paymentTypeSelect = document.getElementById('payment-type');
const paymentType = document.getElementById('payment-type');
const timeInput = document.getElementById('time');
const dateInput = document.getElementById('date');
const userInput = document.getElementById('user'); 

const amountInput2 = document.getElementById('amount2');
const refNumberInput2 = document.getElementById('ref-number2');
const paymentTypeSelect2 = document.getElementById('payment-type2');
const timeInput2 = document.getElementById('time2');
const dateInput2 = document.getElementById('date2');
const userInput2 = document.getElementById('user2'); 


const paymentSearchInput = document.getElementById('payment-search');
const paymentSearchInput2 = document.getElementById('payment-search2');
const amountCheckbox = document.getElementById('amount-checkbox');
const amountCheckbox2 = document.getElementById('amount-checkbox2');
const refCheckbox = document.getElementById('ref-checkbox');
const timeCheckbox = document.getElementById('time-checkbox');
const dateCheckbox = document.getElementById('date-checkbox');
const merchantCheckbox = document.getElementById('merchant-checkbox');
const statusCheckbox = document.getElementById('status-checkbox');

const refCheckbox2 = document.getElementById('ref-checkbox2');
const timeCheckbox2 = document.getElementById('time-checkbox2');
const dateCheckbox2 = document.getElementById('date-checkbox2');
const merchantCheckbox2 = document.getElementById('merchant-checkbox2');
const statusCheckbox2 = document.getElementById('status-checkbox2');







const editCell = document.getElementById('Edit');
const editCell2 = document.getElementById('Edit2');
const editFireKey = document.getElementById('edit-fireKey');
const fireKey = document.getElementById('fireKey');


const openModalButton = document.getElementById('open-modal-button');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalButton = document.querySelector('.close-modal');
const cancelButton = document.getElementById('cancel-edit');
const editPaymentForm = document.getElementById('edit-payment-form');
const editPaymentForm2 = document.getElementById('edit-payment-form2');

const editUser = document.getElementById('edit-user');
const merchantInputPay = document.getElementById("merchant-pay");
const submitNewPayment = document.getElementById("submit-payment");
const checkboxCellPayment = document.getElementById("payment-sana-all");


const openModalButton2 = document.getElementById('open-modal-button2');
const modalOverlay2 = document.getElementById('modal-overlay2');
const closeModalButton2 = document.querySelector('.close-modal2');
const cancelButton2 = document.getElementById('cancel-edit2');



const editUser2 = document.getElementById('edit-user2');
const merchantInputPay2 = document.getElementById("merchant-pay2");
const submitNewPayment2 = document.getElementById("submit-payment2");
const checkboxCellPayment2 = document.getElementById("payment-sana-all2");

const addMerchantForm = document.getElementById("add-merchant-form");
const newMerchantNameInput = document.getElementById("new-merchant-name");
const newMerchantEmailInput = document.getElementById("new-merchant-email");
const newMerchantAddressInput = document.getElementById("new-merchant-address");
const cancelAddMerchantBtn = document.getElementById("cancel-add-merchant");
const merchantStatusInput = document.getElementById("new-merchant-total");
const submitNewMerchantButton = document.getElementById('submit-merchant');
const addMerchantButton = document.getElementById('add-merchant-button');
const merchantTotalInput = document.getElementById("new-merchant-total");
const newMerchantStatusInput = document.getElementById("new-merchant-status");

const merchantList = document.getElementById("merchant-list");
const merchantDetailsModal = document.getElementById("merchant-details-modal");
const merchantDetailsName = document.getElementById("merchant-details-name");
const merchantDetailsPayments = document.getElementById("merchant-details-payments");
const closeMerchantDetailsBtn = document.getElementById("close-merchant-details");

const editMerchant = document.getElementById('edit-merchant');

//const editMerchantForm = document.getElementById('edit-merchant-form');
const cancelEditMerchant = document.getElementById('cancel-edit-merchant');

const countNoPayments = document.getElementById('num-paymentst');
const totalNewPayment = document.getElementById('new-pay');
const remainPayment = document.getElementById('new-remain');
const merchantBarrowed = document.getElementById('new-borrowed');


const editCountNoPayments = document.getElementById('edit-num-paymentst');
const editTotalNewPayment = document.getElementById('edit-new-pay');
const editRemainPayment = document.getElementById('edit-new-remain');
const editMerchantBarrowed = document.getElementById('edit-new-borrowed');
//const editMerchantID = document.getElementById('edit-id-m');
const merGeneralTotal = document.getElementById('mer-general-total');


// Get the current page URL (or path)
const currentPage2 = window.location.pathname; // Or window.location.href if you need the full URL

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
//let currentUserId = "user123"; // Replace with actual user authentication logic
let editPaymentId = null; // Store the ID of the payment being edited





const dateInput22 = document.getElementById('date-today');
  const today = new Date();

  // Format the date as YYYY-MM-DD (required for input type="date")
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + today.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;

  dateInput22.value = formattedDate; 












//Function to Load and Display Payments

/* function loadPayments() {
  paymentsTable.innerHTML = ""; // Clear existing data

  paymentsRef.orderByChild("timestamp").on("value", (snapshot) => {
      let totalToday = 0;
      let totalNewToday = 0;
      let totalClaimedToday = 0;
      let totalThisMonth = 0;
      const today = format.Date(new Date());
      const currentMonth = today.substring(0, 7); 
  
  });
} ; */


function setDefaultDates() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1); // Get yesterday's date

  // Format dates as YYYY-MM-DD for input fields
  const formatDate = (date) => date.toISOString().split("T")[0];

  document.getElementById("startDate").value = formatDate(yesterday);
  document.getElementById("endDate").value = formatDate(today);
}

// Run function on page load
window.onload = setDefaultDates;










const table2 = document.getElementById('payments-table2').getElementsByTagName('tbody')[0];
const tableData2 = [];

// Fetch data from Firebase and display in the table
let paymentsData2 = []; // Store the fetched payment data

function filterPayments() {

database.ref('payments').on('value', (snapshot) => {
  tableData2.length = 0; // Clear existing data
  paymentsData2 = [];
  const currentDate = new Date();
 /*  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based, so add 1
  const currentYear = currentDate.getFullYear(); */
  const selectedStartDate = document.getElementById("startDate").value;
  const selectedEndDate = document.getElementById("endDate").value;

  const startDate = new Date(selectedStartDate); // Example: "2024-03-01"
  const endDate = new Date(selectedEndDate); // Example: "2024-03-25"


  snapshot.forEach((childSnapshot) => {
    const firebaseKey2 = childSnapshot.key; // Get the Firebase key
    const payment2 = childSnapshot.val(); // Get the payment data

    const paymentDate = new Date(payment2.date); // Ensure payment.date is in a valid format
 /*    const paymentMonth = paymentDate.getMonth() + 1;
    const paymentYear = paymentDate.getFullYear(); */

 


    // Filter for payments with status 'new'
    if (
      payment2.status === 'claimed' &&
      paymentDate >= startDate &&
      paymentDate <= endDate
    
    
    ) {
      paymentsData2.push({ id: firebaseKey2, ...payment2 });

      const rowData2 = {
        firebaseKey: firebaseKey2, // Store the key
        amount: payment2.amount,
        refNumber: payment2.refNumber,
        paymentType: payment2.paymentType,
        time: payment2.time,
        date: payment2.date,
        user: payment2.user,
        merchantP: payment2.merchantP,
        status: payment2.status
      };
      tableData2.push(rowData2);
    }
  });
  updatePaymentsTable2(paymentsData2); // Initial table population
});
};




function updatePaymentsTable2(data2) {
table2.innerHTML = ''; // Clear the table

data2.forEach((payment2, rowIndex) => {
  const row2 = table2.insertRow();


  // Create table cells and populate them with data

  // Create a cell for the row index
  const rowIndexCell2 = row2.insertCell();
  rowIndexCell2.textContent = rowIndex + 1;

  const amountCells2 = row2.insertCell();
  amountCells2.textContent = payment2.amount;

  const refNumberCell2 = row2.insertCell();
  refNumberCell2.textContent = payment2.refNumber;

  const timeCell2 = row2.insertCell();
  timeCell2.textContent = payment2.time;

  const dateCell2 = row2.insertCell();
  dateCell2.textContent = payment2.date;

  const paymentTypeCell2 = row2.insertCell();
  paymentTypeCell2.textContent = payment2.paymentType;

  const userCell2 = row2.insertCell();
  userCell2.textContent = payment2.user;

  const merchantCell2 = row2.insertCell();
  merchantCell2.textContent = payment2.merchantP; 


  const statusCell2 = row2.insertCell();
  statusCell2.textContent = payment2.status;

  const textCell = row2.insertCell();
  textCell.textContent = payment2.message;


 const senderCell = row2.insertCell();
  senderCell.textContent = payment2.sender;
  

// Add Checkbox cell

 const checkboxCell2 = row2.insertCell();
const checkbox2 = document.createElement('input');
checkbox2.type = 'checkbox';
// Set the initial checked state based on the status
checkbox2.checked = payment2.status === 'claimed';  
checkbox2.disabled = true;    //////use to freez the checkbox in claimed table


  // Add Edit, Delete, and Status cells (you'll need to implement the functionality)

  // Add Edit button with data-row-index 
  const editCell2 = row2.insertCell();
  editCell2.innerHTML = `<button class="edit-button" data-row-index="${payment2.id}">Edit2</button>`;



checkbox2.addEventListener('change', (event) => {
  event.stopPropagation(); // Prevent event from bubbling up
  if (checkbox2.checked) {
    statusCell2.textContent = 'claimed'; 
    // Update the status in your Firebase database here
    database.ref('payments/' + payment2.id).update({ status: 'claimed' });
    console.log("Status Change to CLAIMED");
  } else {
    statusCell2.textContent = 'new';
    // Update the status in your Firebase database here
    database.ref('payments/' + payment2.id).update({ status: 'new' });
    console.log("Status change to NEW");
  }
});

checkboxCell2.appendChild(checkbox2); 
  



///////////////////////////////////test auto add /////////////////////////////
///////////////////////////////////test auto add /////////////////////////////
///////////////////////////////////test auto add /////////////////////////////
///////////////////////////////////test auto add /////////////////////////////


const paymentsTable2 = document.getElementById('payments-table2');

// Check if the table exists before proceeding
if (paymentsTable2) {
    const tableBody2 = paymentsTable2.querySelector('tbody');

    // Check if the tbody exists
    if(tableBody2){
        const totalAmountSpan2 = document.getElementById('table-total2');

        function calculateTotal2() {
          itemList2.innerHTML = ""; // Clear existing list
            let total2 = 0;
            const amountCells2 = tableBody2.querySelectorAll('td:nth-child(2)');

            amountCells2.forEach(cell => {
                const amount2 = parseFloat(cell.textContent) || 0;
                total2 += amount2;
               // console.log("DIRI   " + total);
            });

            if (totalAmountSpan2) { // Check if the total amount span exists
                totalAmountSpan2.textContent = total2.toFixed(2);
            } else {
                console.error("Total amount span element not found!");
            }
        }

        calculateTotal2(); // Initial calculation

        const observer2 = new MutationObserver(calculateTotal2);
        const config2 = { childList: true, subtree: true };

        observer2.observe(tableBody2, config2);
    } else {
        console.error("Table body (tbody) not found!");
    }
  }



  ////////////////////////////// Event listener for Edit button2 ////////////////////////////////
  ////////////////////////////// Event listener for Edit button2 ////////////////////////////////
  ////////////////////////////// Event listener for Edit button2 ////////////////////////////////
  ////////////////////////////// Event listener for Edit button2 ////////////////////////////////


  editCell2.addEventListener('click', (event) => {
  
    const button2 = event.target;
    const firebaseKey2 = button2.dataset.rowIndex;

    // Find rowData using firebaseKey
    const rowData2 = tableData2.find(data2 => data2.firebaseKey === firebaseKey2);

    // Populate form fields
    document.getElementById('edit-idPay2').value = rowData2.firebaseKey;
    document.getElementById('edit-amount2').value = rowData2.amount;
    document.getElementById('edit-ref-number2').value = rowData2.refNumber;
    document.getElementById('edit-payment-type2').value = rowData2.paymentType;
    document.getElementById('edit-time2').value = rowData2.time;
    document.getElementById('edit-date2').value =  rowData2.date;
    document.getElementById('edit-user2').value = rowData2.user;
    document.getElementById('edit-status2').value = rowData2.status;
     document.getElementById('edit-merchant2').value = rowData2.merchantP; // Populate merchant
    

    // Show the modal
   // editPaymentForm.classList.remove('hidden');
   editPaymentForm2.style.display = 'block'; 
//console.log("mao ni ang key  " + rowData2.firebaseKey);
   
     amountCheckbox.addEventListener('change', () => {
    paymentSearchInput.dispatchEvent(new Event('input'));
    }); 

  //  populateMerchantDropdown2(); 
  });
});
















///////////////////// EDIT PAYMENT SAVE BUTTON-2 starts Here ///////////////////////////


// Get the Save button element
 const saveEditButton2 = document.getElementById('save-edit2');

saveEditButton2.addEventListener('click', () => {
  // Get the Firebase key from the hidden input field
  const firebaseKey2 = document.getElementById('edit-idPay2').value; 

  // Get the updated values from the form fields
  const updatedAmount2 = document.getElementById('edit-amount2').value;
  const updatedRefNumber2 = document.getElementById('edit-ref-number2').value;
  const updatedPaymentType2 = document.getElementById('edit-payment-type2').value;
  const updatedTime2 = document.getElementById('edit-time2').value;
  const updatedDate2 = document.getElementById('edit-date2').value;
  const updatedUser2 = document.getElementById('edit-user2').value;
  const updatedMerchant2 = document.getElementById('edit-merchant2').value;
  const updatedStatus2 = document.getElementById('edit-status2').value;

  // Update the data in Firebase
  database.ref(`payments/${firebaseKey2}`).update({
    amount: updatedAmount2,
    refNumber: updatedRefNumber2,
    paymentType: updatedPaymentType2,
    time: updatedTime2,
    date: updatedDate2,
    user: updatedUser2,
    merchantP: updatedMerchant2,
    status: updatedStatus2
  })
  .then(() => {
    // Data updated successfully!
    console.log('Payment updated successfully!');
    // You might want to close the modal or update the table here
    editPaymentForm2.style.display = 'none'; 
    // ... any other actions after successful update ...
  })
  .catch(error => {
    // Handle errors
    console.error('Error updating payment:', error);
    // ... display an error message to the user ...
  });
}); 

}

////////////////////// END OF EDIT BUTTON-2  SAVE //////////////////////////////
////////////////////// END OF EDIT BUTTON-2  SAVE //////////////////////////////
////////////////////// END OF EDIT BUTTON-2  SAVE //////////////////////////////




//////////////////////// Event listener for search input in merchant table ////////////////////////
//////////////////////// Event listener for search input in merchant table ////////////////////////
const paymentSearchInput22 = document.getElementById('payment-search2');

let timeoutId22;

paymentSearchInput22.addEventListener('input', () => {
  clearTimeout(timeoutId22); // Clear any previous timeout

  timeoutId22 = setTimeout(() => {
    const searchTerm2 = paymentSearchInput22.value.toLowerCase();
   
const filteredDataP = paymentsData2.filter((payment) => {
      return (
      //  payment.status.toLowerCase() === "claimed" && // Crucial: Status check FIRST
     //  (

        //(payment.amount.toString().toLowerCase().includes(searchTerm2)) ||
        payment?.amount?.toString().toLowerCase().includes(searchTerm2) ||
        payment?.sender?.toString().toLowerCase().includes(searchTerm2) ||
        payment?.refNumber?.toLowerCase().includes(searchTerm2) ||
        payment?.time?.toLowerCase().includes(searchTerm2) ||
        payment?.date?.toLowerCase().includes(searchTerm2) ||
        payment?.paymentType?.toLowerCase().includes(searchTerm2) ||
        payment?.save?.toLowerCase().includes(searchTerm2) ||
        payment?.merchantP?.toLowerCase().includes(searchTerm2)
        
       
      );
    });
    updatePaymentsTable2(filteredDataP);
  }, 250); // Delay of 250 milliseconds (adjust as needed)
});

  ////////////////////////////// end of merchant search input /////////////////////


//cancel to hide add editform
cancelEditButton2.addEventListener('click', () => {
editPaymentForm2.style.display = 'none'; 
});

const displaytodayTrade = document.getElementById('total-claimed');
const displayTotalResiboClaimed = document.getElementById('total-resiboClaimed');
const displayEight = document.getElementById('eight');
const displayEightFive = document.getElementById('eightFive');

function calculateDailyTrades() {
  
  database.ref('payments').once('value', (paymentsSnapshot) => {
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
  //  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
   // const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime();
  


    payments.forEach((payment) => {
      if (payment.status && payment.amount && payment.date) {
        const paymentStatus = payment.status;
        const amount = parseFloat(payment.amount);
        const paymentDate = payment.date; // Assuming payment.date is a timestamp

       // console.log("date testing  sud na    :" ,paymentStatus, amount);


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

           document.getElementById('eightCnew').value = eight2;
          document.getElementById('eightFiveCnew').value = eightPoint;
          document.getElementById('total-claimedCnew').value = totalForTheDayTrade;
          document.getElementById('total-resiboClaimedCnew').value = pilakaresiboClaimed;
         // console.log(eight); 
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



let ascendingDate = true; // Track sorting order for date
let ascendingTime = true; // Track sorting order for time

function sortTableByDate() {
    const table = document.getElementById("payments-table2");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.rows);

    rows.sort((a, b) => {
        const dateA = new Date(a.cells[4].innerText.trim()); // Date column index
        const dateB = new Date(b.cells[4].innerText.trim());

        return ascendingDate ? dateA - dateB : dateB - dateA; // Toggle sorting order
    });

    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));

    ascendingDate = !ascendingDate; // Toggle order
}

function sortTableByTime() {
    const table = document.getElementById("payments-table2");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.rows);

    rows.sort((a, b) => {
        const timeA = parseTime(a.cells[3].innerText.trim()); // Time column index
        const timeB = parseTime(b.cells[3].innerText.trim());

        return ascendingTime ? timeA - timeB : timeB - timeA; // Toggle sorting order
    });

    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));

    ascendingTime = !ascendingTime; // Toggle order
}

// Function to convert "HH:MM AM/PM" to a Date object for sorting
function parseTime(timeStr) {
    const [time, modifier] = timeStr.split(" "); // Split time and AM/PM
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    } else if (modifier === "AM" && hours === 12) {
        hours = 0;
    }

    return new Date(0, 0, 0, hours, minutes); // Use a fixed date with time
}


filterPayments();
