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

const saveEditBtn2 = document.getElementById("save-edit2");
const cancelEditBtn1 = document.getElementById("cancel-edit");
const cancelEditButtonAssign = document.getElementById("cancel-editAssign");
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
//const dateInput = document.getElementById('date');
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

const editPaymentFormAssign = document.getElementById('edit-payment-formAssign');


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
const dateInput = document.getElementById('edit-date');


const merchantInputAssign = document.getElementById('edit-merchantAssign');
const suggestionsListAssign = document.getElementById('suggestionsListAssign');

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



function showAlert(message, duration = 3000) {
  const alertBox = document.getElementById("custom-alert");
  alertBox.textContent = message;
  alertBox.style.display = "block";

  // Auto-close after `duration` milliseconds
  setTimeout(() => {
      alertBox.style.display = "none";
  }, duration);
}




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

  document.getElementById("startDate").value = formatDate(today);
  document.getElementById("endDate").value = formatDate(today);
}

// Run function on page load
window.onload = setDefaultDates;







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





  
/////////////////////////// POPULATE MERCHANT NAME //////////////////////// 

const merchantInputP = document.getElementById('edit-merchant');
const suggestionsListMP = document.getElementById('suggestionsList');

merchantInputP.addEventListener('input', () => {
  const searchTermP = merchantInputP.value.toLowerCase();

  if (searchTermP.length > 0) { 
    database.ref('merchants')
      .orderByChild('nameLower') // Make sure you have an index on the 'name' property in your rules
      .startAt(searchTermP)
      .endAt(searchTermP + '\uf8ff')
      .limitToFirst(5)
      .once('value')
      .then((snapshot) => {
        suggestionsListMP.innerHTML = ''; // Clear previous suggestions

        snapshot.forEach((childSnapshot) => {
          const merchantNameP = childSnapshot.val().name;
          const listItem = document.createElement('li');
          listItem.textContent = merchantNameP;

          listItem.addEventListener('click', () => {
            merchantInputP.value = merchantNameP;
            suggestionsListMP.innerHTML = ''; 
          });

          suggestionsListMP.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error getting data: ", error);
      });
  } else {
    suggestionsListMP.innerHTML = ''; // Clear suggestions if input is short
  }
});



////////////////////////////   PAYMENTS TABLE1 - STARTS  HERE  /////////////////////



const table = document.getElementById('payments-table').getElementsByTagName('tbody')[0];
const tableData = [];


let paymentsData = []; // Store the fetched payment data

function filterPayments() {

database.ref('payments').on('value', (snapshot) => {
  tableData.length = 0; // Clear existing data
  paymentsData = [];
  const currentDate = new Date();

  const selectedStartDate = document.getElementById("startDate").value;
  const selectedEndDate = document.getElementById("endDate").value;

  const startDate = new Date(selectedStartDate); // Example: "2024-03-01"
  const endDate = new Date(selectedEndDate); // Example: "2024-03-25"


  snapshot.forEach((childSnapshot) => {
    const firebaseKey = childSnapshot.key; // Get the Firebase key
    const payment = childSnapshot.val(); // Get the payment data

    const paymentDate = new Date(payment.date); // Ensure payment.date is in a valid format


 


    // Filter for payments with status 'new'
    if (
      payment.status === 'new' &&
      paymentDate >= startDate &&
      paymentDate <= endDate
    
    
    ) {
      paymentsData.push({ id: firebaseKey, ...payment });

      const rowData = {
        firebaseKey: firebaseKey, // Store the key
        amount: payment.amount,
        refNumber: payment.refNumber,
        paymentType: payment.paymentType,
        time: payment.time,
        date: payment.date,
        user: payment.user,
        merchantP: payment.merchantP,
        status: payment.status,
       save: payment.save,
        message: payment.message,
        timestamp: payment.timestamp
      };

      tableData.push(rowData);
    }
  });

  paymentsData.sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeB - dateTimeA; // Newest first
  });
  //console.log("Sorted Payments:", paymentsData.map(p => `${p.date} ${p.time}`));

  updatePaymentsTable(paymentsData); // Initial table population
});
};







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

  const refNumberCell = row.insertCell();
  refNumberCell.textContent = payment.refNumber;

  const timeCell = row.insertCell();
  timeCell.textContent = payment.time;
 
////////insert name here//////////////
const merchantCell = row.insertCell();
  merchantCell.textContent = payment.merchantP; 

  const dateCell = row.insertCell();
  dateCell.textContent = payment.date;

  const paymentTypeCell = row.insertCell();
  paymentTypeCell.textContent = payment.paymentType;

  const userCell = row.insertCell();
  userCell.textContent = payment.user;

  const textCell = row.insertCell();
  textCell.textContent = payment.message;

  const saveCell = row.insertCell();
  saveCell.textContent = payment.save;
  

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
  checkbox.checked = payment.status === 'claimed'; 
  
  
  
    checkbox.addEventListener('change', (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    if (checkbox.checked) {
      statusCell.textContent = 'claimed'; 
      // Update the status in your Firebase database here
      database.ref('payments/' + payment.id).update({ status: 'claimed' });
     
    } else {
      statusCell.textContent = 'new';
      // Update the status in your Firebase database here
      database.ref('payments/' + payment.id).update({ status: 'new' });
     
    }
  });  
  
  checkboxCell.appendChild(checkbox); 
 

  // Add Edit button with data-row-index 
  const editCell = row.insertCell();
  editCell.innerHTML = `<button class="edit-button" data-row-index="${payment.id}">Edit</button>`;

checkbox.addEventListener('change', (event) => {
  event.stopPropagation(); // Prevent event from bubbling up
  if (checkbox.checked) {

    
     statusCell.textContent = 'claimed'; 
    // Update the status in your Firebase database here
    database.ref('payments/' + payment.id).update({ status: 'claimed' });
    checkbox.disabled = true;
    console.log("Status Change to CLAIMED");

  } else {
    statusCell.textContent = 'new';
    // Update the status in your Firebase database here
    database.ref('payments/' + payment.id).update({ status: 'new' });
  
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
        const totalAmountSpanNew = document.getElementById('table-total');

        function calculateTotalNew() {
          itemList.innerHTML = ""; // Clear existing list
            let totalNew = 0;
            const amountCells = tableBody.querySelectorAll('td:nth-child(3)');

            amountCells.forEach(cell => {
                const amountNew = parseFloat(cell.textContent) || 0;
                totalNew += amountNew;
                 const forOverAllNew = totalNew.toFixed(2);
                
                

                

              // console.log("DIRI   " + forOverAllNew);
            });

            if (totalAmountSpanNew) { // Check if the total amount span exists
                totalAmountSpanNew.textContent = totalNew.toFixed(2);
                /* localStorage.setItem("overAllNew", forOverAllNew); */
             //   console.log("mao ni total: ");
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
    const paymentKey =  rowIndex.id; //// ... get the payment key from the row ... 
   
   
    if (statusCellC.textContent === 'new') { // Check if the status is 'new'
      // Update the status in Firebase
      database.ref(`payments/${paymentKey}`).update({
        status: 'claimed'
      })
      .then(() => {
        console.log(`payments ${paymentKey} updated to claimed`);
        // ... you might want to update the status in the table cell as well ...
        //statusCellC.textContent = 'claimedNO'; 
      })
      .catch(error => {
        console.error(`Error updating payment ${paymentKey}:`, error);
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
 

    document.getElementById('edit-idPay').value = rowData.firebaseKey;
    document.getElementById('edit-amount').value = rowData.amount;
    document.getElementById('edit-ref-number').value = rowData.refNumber;
    document.getElementById('edit-payment-type').value = rowData.paymentType;
    document.getElementById('edit-time').value = rowData.time;
    document.getElementById('edit-date').value = rowData.date;
    document.getElementById('edit-user').value = rowData.user;
    document.getElementById('edit-status').value = rowData.status;
     document.getElementById('edit-merchant').value = rowData.merchantP; // Populate merchant 

    
    // Show the modal display only to collect data in input fields next to save BTN /////
   editPaymentForm.style.display = 'block'; 
 
});


/////////////////////////////  // Event listener for Edit button aSSIGNMENT  //////////////////////////////

assignCell.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey = button.dataset.rowIndex;
  const rowData = tableData.find(data => data.firebaseKey === firebaseKey);
 
  
  document.getElementById('edit-amountAssign').value = rowData.amount;
     document.getElementById('edit-idPayAssign').value = rowData.firebaseKey;
     document.getElementById('edit-ref-numberAssign').value =  rowData.refNumber;
      document.getElementById('edit-merchantAssign').value = rowData.merchantP; // Populate merchant 
    
 
     
     // Show the modal display only to collect data in input fields next to save BTN /////
    editPaymentFormAssign.style.display = 'block'; 
  
 });
 

  });    


//////////////////////////////////  populate merchant name ///////////////////////////////////

const merchantInput = document.getElementById('edit-merchant');
const suggestionsList = document.getElementById('suggestionsList');

merchantInput.addEventListener('input', () => {
  const searchTerm = merchantInput.value.toLowerCase();

  if (searchTerm.length > 0) { 
    database.ref('merchants')
      .orderByChild('nameLower') // Make sure you have an index on the 'name' property in your rules
      .startAt(searchTerm)
      .endAt(searchTerm + '\uf8ff')
      .limitToFirst(5)
      .once('value')
      .then((snapshot) => {
        suggestionsList.innerHTML = ''; // Clear previous suggestions

        snapshot.forEach((childSnapshot) => {
          const merchantName = childSnapshot.val().name;
          const listItem = document.createElement('li');
          listItem.textContent = merchantName;

          listItem.addEventListener('click', () => {
            merchantInput.value = merchantName;
            suggestionsList.innerHTML = ''; 
          });

          suggestionsList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error getting data: ", error);
      });
  } else {
    suggestionsList.innerHTML = ''; // Clear suggestions if input is short
  }
});

};


//////////////////////////////////  populate merchant name for Assignment ///////////////////////////////////

merchantInputAssign.addEventListener('input', () => {
  const searchTerm = merchantInputAssign.value.toLowerCase();

  if (searchTerm.length > 0) { 
    database.ref('merchants')
      .orderByChild('nameLower') // Make sure you have an index on the 'name' property in your rules
      .startAt(searchTerm)
      .endAt(searchTerm + '\uf8ff')
      .limitToFirst(5)
      .once('value')
      .then((snapshot) => {
        suggestionsListAssign.innerHTML = ''; // Clear previous suggestions

        snapshot.forEach((childSnapshot) => {
          const merchantName = childSnapshot.val().name;
          const listItem = document.createElement('li');
          listItem.textContent = merchantName;

          listItem.addEventListener('click', () => {
            merchantInputAssign.value = merchantName;
            suggestionsListAssign.innerHTML = ''; 
          });

          suggestionsListAssign.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error getting data: ", error);
      });
  } else {
    suggestionsListAssign.innerHTML = ''; // Clear suggestions if input is short
  }
});



//////////////////////// Event listener for search input in merchant table ////////////////////////
const merchantSearchInput = document.getElementById('merchant-search');

let timeoutId;

paymentSearchInput.addEventListener('input', () => {
  clearTimeout(timeoutId); // Clear any previous timeout

  timeoutId = setTimeout(() => {
    const searchTerm = paymentSearchInput.value.toLowerCase();

    const filteredDataP = paymentsData.filter((payment) => {
      return (
        payment?.amount?.toString().toLowerCase().includes(searchTerm) ||
        payment?.refNumber?.toLowerCase().includes(searchTerm) ||
        payment?.time?.toLowerCase().includes(searchTerm) ||
        payment?.date?.toLowerCase().includes(searchTerm) ||
        payment?.paymentType?.toLowerCase().includes(searchTerm) ||
        payment?.save?.toLowerCase().includes(searchTerm) ||
        payment?.merchantP?.toLowerCase().includes(searchTerm)
      );
    });

    updatePaymentsTable(filteredDataP);
  }, 250); // Adjust delay to 250ms for better UX
});


  


//cancel to hide add editform
cancelEditButton.addEventListener('click', () => {
editPaymentForm.style.display = 'none'; 
});

cancelEditButtonAssign.addEventListener('click', () => {
  editPaymentFormAssign.style.display = 'none'; 
  });
  


  






const saveEditBtn = document.getElementById('save-edit');
const saveEditBtnAssign = document.getElementById('save-editAssign');


saveEditBtn.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey9 = button.dataset.rowIndex;
 
  const rowData = tableData.find(data => data.firebaseKey9 === firebaseKey9);

  // 1. Get the merchant name from the input box:
  //const merchantNameInput = document.getElementById('edit-merchant'); // Assuming 'merchantP' is the ID of your merchant name input
  const merchantName = document.getElementById('edit-merchant').value;
  async function getMerchantFirebaseKey(merchantName) {
      try {
          const merchantsRef = firebase.database().ref('merchants'); // Replace 'merchants' with your actual Firebase path
          const snapshot = await merchantsRef.orderByChild('name').equalTo(merchantName).once('value'); // Assuming 'name' is the field where you store merchant names

          if (snapshot.exists()) {
              const merchantData = snapshot.val();
              // Get the key (it will be the key of the first merchant found with that name)
              const merchantKey = Object.keys(merchantData)[0];  // Get the first key

              return merchantKey;
          } else {
              console.log("No merchant found with that name.");
              return null; // Or handle the case where the merchant is not found
          }
      } catch (error) {
          console.error("Error fetching merchant key:", error);
          return null; // Or handle the error appropriately
      }
  } 


  // 3. Call the function and save the key:
  getMerchantFirebaseKey(merchantName)
      .then(merchantFirebaseKey => {
          if (merchantFirebaseKey) {
              const newPayKeyPar = document.getElementById('edit-idPay').value;
              const newPayKey = newPayKeyPar;

            //////////// convert time to 12hours format ////////////////////
  function formatTimeTo12Hour(timeString) {
    let [hours, minutes] = timeString.split(":");
    hours = parseInt(hours, 10);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  }
    const timeInput = document.getElementById("edit-time").value;
    let formattedTime = formatTimeTo12Hour(timeInput);



             
              const updatedPaymentData = {

               // firebasekey: document.getElementById('edit-idPay').value,
                  amount: document.getElementById('edit-amount').value,
                  refNumber: document.getElementById('edit-ref-number').value,
                  paymentType: document.getElementById('edit-payment-type').value,
                  time: formattedTime,
                  date: document.getElementById('edit-date').value,
                  user: document.getElementById('edit-user').value,
                  status: document.getElementById('edit-status').value,
                  merchantP: document.getElementById('edit-merchant').value, // Merchant Name */
                  merchantKey: merchantFirebaseKey, // The new merchant Firebase Key
              };

              // Update in Firebase (example)
              firebase.database().ref(`payments/${newPayKey}`).update(updatedPaymentData)
                  .then(() => {
                    
                 
                Swal.fire({
                  title: "Success!",
                  text: "New payment edited successfully!",
                  icon: "success",
                  timer: 3000, // Closes after 3 seconds
                  showConfirmButton: false
                });
                
                editPaymentForm.style.display = 'none'; 



                    //  window.location.reload();
                     
               
                  })
                  .catch(error => {
                      console.error("Error updating payment data:", error);
                      // ... error handling ...
                  });

          } else {
              // Handle the case where the merchant key was not found.
              alert("Merchant not found. Please check the merchant name.");
          }
      });
      //alert("Payment details updated successfully!");
});



saveEditBtnAssign.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey9 = button.dataset.rowIndex;
 
  const rowData = tableData.find(data => data.firebaseKey9 === firebaseKey9);

  const merchantName = document.getElementById('edit-merchantAssign').value;
  async function getMerchantFirebaseKeyA(merchantName) {
      try {
          const merchantsRef = firebase.database().ref('merchants'); // Replace 'merchants' with your actual Firebase path
          const snapshot = await merchantsRef.orderByChild('name').equalTo(merchantName).once('value'); // Assuming 'name' is the field where you store merchant names

          if (snapshot.exists()) {
              const merchantData = snapshot.val();
              // Get the key (it will be the key of the first merchant found with that name)
              const merchantKey = Object.keys(merchantData)[0];  // Get the first key

              return merchantKey;
          } else {
              console.log("No merchant found with that name.");
              return null; // Or handle the case where the merchant is not found
          }
      } catch (error) {
          console.error("Error fetching merchant key:", error);
          return null; // Or handle the error appropriately
      }
  } 


  // 3. Call the function and save the key:
  getMerchantFirebaseKeyA(merchantName)
      .then(merchantFirebaseKey => {
          if (merchantFirebaseKey) {
              const newPayKeyPar = document.getElementById('edit-idPayAssign').value;
              const newPayKey = newPayKeyPar;
             
              const updatedPaymentData = {

               // firebasekey: document.getElementById('edit-idPay').value,
                  amount: document.getElementById('edit-amountAssign').value,
                  refNumber: document.getElementById('edit-ref-numberAssign').value,
                 // paymentType: document.getElementById('edit-payment-type').value,
                  merchantP: document.getElementById('edit-merchantAssign').value, // Merchant Name */
                  merchantKey: merchantFirebaseKey, // The new merchant Firebase Key
              };

              // Update in Firebase (example)
              firebase.database().ref(`payments/${newPayKey}`).update(updatedPaymentData)
                  .then(() => {
                    
                    
                     

                    Swal.fire({
                      title: "Success!",
                      text: "Trader assigned successfully!",
                      icon: "success",
                      timer: 3000, // Closes after 3 seconds
                      showConfirmButton: false
                    });

                    editPaymentFormAssign.style.display = 'none'; 
                   
                     // window.location.reload();
                     
                    
                  })
                  .catch(error => {
                      console.error("Error updating payment data:", error);
                      // ... error handling ...
                  });

          } else {
              // Handle the case where the merchant key was not found.
              alert("Merchant not found. Please check the merchant name.");
          }
      });
     
});



const totalForTheDay = dateInput22.value; 
const displaytodaytotal = document.getElementById('total-today');

function dailypayments() {
  database.ref('payments').once('value', (paymentsSnapshot) => {
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

//localStorage.setItem("todayNew" ,  totalForTheDay);


          })
         
        })
       // localStorage.setItem("todayNew" ,  totalForTheDay);
       // localStorage.setItem("todayResibo" ,  pilakaresibo);
      };
      dailypayments();


      function dailypaymentsGcash() {
        database.ref('payments').once('value', (paymentsSnapshot) => {
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
                
      document.getElementById('total-todayGcash').value = totalForTheDay;
      document.getElementById('total-resiboGcash').value = pilakaresibo;
    /*   document.getElementById('eight').value = eight;
      document.getElementById('eightFive').value = eightPoint;
       */
      //localStorage.setItem("todayNew" ,  totalForTheDay);
      
      
                })
               
              })
             // localStorage.setItem("todayNew" ,  totalForTheDay);
             // localStorage.setItem("todayResibo" ,  pilakaresibo);
            };
            dailypaymentsGcash()















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
                     /*  document.getElementById('eightFiveC').value = eightPoint; */
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







           
