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
const paymentsTable = document.getElementById("payments-table").getElementsByTagName("tbody")[0];
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


//////////////////////// edit merchant,,,,,,,,,,,
const editMerchantName = document.getElementById('edit-merchant-name').value;
  const editMerchantEmail = document.getElementById('edit-merchant-email').value;
  const editMerchantRemain = document.getElementById('edit-new-remain').value;
  const editMerchantID = document.getElementById('edit-merChantId').value;


  const  tableClaim = document.getElementById('claim-table').getElementsByTagName('tbody')[0];

  const merchantSearchInput9 = document.getElementById('merchant-search');





// Global Variables
let currentUserId = "user123"; // Replace with actual user authentication logic
let editPaymentId = null; // Store the ID of the payment being edited



// xxxxxxxxxxxxxxxxxxxxxxxx SIDEBAR XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


 sidebar.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
  
    const pageId = event.target.dataset.page;
  
    // Hide all pages and the edit form
    pages.forEach(page => page.classList.add('hidden'));
    editPaymentForm.classList.add('hidden');
  
    document.getElementById(pageId).classList.remove('hidden');
  }
  }); 

/////////////////side bar ends here ////////////////////////////
/////////////////side bar ends here ////////////////////////////
/////////////////side bar ends here ////////////////////////////



//const dateInput = document.getElementById('date');
  const today = new Date();

  // Format the date as YYYY-MM-DD (required for input type="date")
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + today.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;

  dateInput.value = formattedDate; 


//Function to Load and Display Payments

function loadPayments() {
  paymentsTable.innerHTML = ""; // Clear existing data

  paymentsRef.orderByChild("timestamp").on("value", (snapshot) => {
      let totalToday = 0;
      let totalNewToday = 0;
      let totalClaimedToday = 0;
      let totalThisMonth = 0;
      const today = format.Date(new Date());
      const currentMonth = today.substring(0, 7); 
  
  });
} 

  //cancel to hide add editform
cancelEditButtonMerchant.addEventListener('click', () => {
  editMerchantForm.style.display = 'none'; 
  });


/////////////////////// SAVING NEW PAYMENT ///////////////////////////////////////
/////////////////////// SAVING NEW PAYMENT ///////////////////////////////////////
/////////////////////// SAVING NEW PAYMENT ///////////////////////////////////////
/////////////////////// SAVING NEW PAYMENT ///////////////////////////////////////

submitNewPayment.addEventListener('click', () => {
  const refNumber = refNumberInput.value;
  const amount = amountInput.value;

  // Check if refNumber has exactly 4 digits
  if (refNumber.length !== 4 || isNaN(refNumber)) {
      alert("Reference Number must be exactly 4 digits and contain only numbers.");
      refNumberInput.focus();
      return; // Stop further execution
  }

  // Check if refNumber and amount already exist in the database
  const paymentsRef = firebase.database().ref('payments');
  paymentsRef.orderByChild('refNumber').equalTo(refNumber).once('value', snapshot => {
      if (snapshot.exists()) {
          let duplicate = false;
          snapshot.forEach(paymentSnapshot => {
              if (paymentSnapshot.val().amount == amount) {
                  duplicate = true;
                  return true; // Exit forEach loop early
              }
          });

          if (duplicate) {
              alert("A payment with this Reference Number and Amount already exists.");
              refNumberInput.focus();
              return; // Prevent saving if duplicate
          } else {
              savePayment(refNumber, amount); // Save only if refNumber exists but amount is different
          }
      } else {
          savePayment(refNumber, amount); // Save if refNumber doesn't exist
      }
  });
});

function savePayment(refNumber, amount) {  // Correctly placed *inside* the callback
  const newPayment = {
      amount: amount, // Use the validated amount
      refNumber: refNumber, // Use the validated refNumber
      paymentType: paymentType.value,
      time: timeInput.value,
      date: dateInput.value,
      user: userInput.value,
      merchantP: merchantInputPay.value,
      merchantKey: "",
      status: 'new'
  };

  const newPaymentRef = firebase.database().ref('payments').push();
  const newPaymentKey = newPaymentRef.key;

  const updatesNewPay = {};
  updatesNewPay['/payments/' + newPaymentKey] = newPayment;

  return firebase.database().ref().update(updatesNewPay) // Important: Return the promise
      .then(() => {
          console.log('New payment added successfully!');
          // Clear the form fields after successful submission (optional)
          amountInput.value = '';
          refNumberInput.value = '';
          paymentType.value = ''; // Or reset to default value
          timeInput.value = '';
          dateInput.value = '';
          userInput.value = '';
          merchantInputPay.value = '';
      })
      .catch((error) => {
          console.error("Error adding payment:", error);
          alert("An error occurred while adding the payment. Please try again."); // User-friendly error message
      });
}



/////////////////////////// POPULATE MERCHANT NAME? ////////////////////////
/////////////////////////// POPULATE MERCHANT NAME ////////////////////////
/////////////////////////// POPULATE MERCHANT NAME //////////////////////// 

const merchantInputP = document.getElementById('merchant-pay');
const suggestionsListMP = document.getElementById('suggestionsListMP');

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

//////////////////////// END OF ADDING NEW PAYMENT ////////////////////////
//////////////////////// END OF ADDING NEW PAYMENT ////////////////////////
//////////////////////// END OF ADDING NEW PAYMENT ////////////////////////

// ADD MERCHANT BUTTON TO SHOW FORM MODAL
addMerchantButton.addEventListener('click', () => {
  addMerchantForm.style.display = 'block'; 
  }); 
  
  
  
  //cancel to hide add merchant modal
  cancelAddMerchantBtn.addEventListener('click', () => {
  addMerchantForm.style.display = 'none'; 
  });

// When the user clicks anywhere outside of the modal, editform
window.onclick = function(event) {
  if (event.target == editPaymentForm) {
    addMerchantForm.style.display = 'none';
  }
  }


  
/////////////////// ADDING NEW MERCHANT TO DATABASE ////////////////////////
/////////////////// ADDING NEW MERCHANT TO DATABASE ////////////////////////
/////////////////// ADDING NEW MERCHANT TO DATABASE ////////////////////////


submitNewMerchantButton.addEventListener('click', () => {
  const newMerchantName = newMerchantNameInput.value; // Store the name for easier use
  const newMerchantAccount = {
      name: newMerchantName,
      nameLower: newMerchantName.toLowerCase(),
      email: newMerchantEmailInput.value,
      remaining: remainPayment.value,
      barrowed: merchantBarrowed.value
  };

  // 1. Check if the merchant name already exists:
  const merchantsRef = firebase.database().ref('merchants');
  merchantsRef.orderByChild('nameLower').equalTo(newMerchantAccount.nameLower).once('value', (snapshot) => {
      if (snapshot.exists()) {
          // Merchant name already exists, show an alert:
          alert('Merchant name already exists. Please enter a different name.');
          newMerchantNameInput.value = ""; // Optionally clear the input field
          return; // Stop further execution
      } else {
          // 2. If the name is unique, proceed with saving:
          const newMerchantRef = merchantsRef.push();
          const newMerchantKey = newMerchantRef.key;

          const updates2 = {};
          updates2['/merchants/' + newMerchantKey] = newMerchantAccount;

          firebase.database().ref().update(updates2)
              .then(() => {
                  // Optionally, you can add code here to clear the form fields or show a success message
                  newMerchantNameInput.value = "";
                  newMerchantEmailInput.value = "";
                  remainPayment.value = "";
                  merchantBarrowed.value = "";
                  console.log("Merchant added successfully");
              })
              .catch((error) => {
                  console.error("Error adding merchant:", error);
                  alert("An error occurred while adding the merchant. Please try again later.")
              });
      }
  });
});

















/* submitNewMerchantButton.addEventListener('click', () => {

   const newMerchantAccount = {
    name: newMerchantNameInput.value,
    nameLower: newMerchantNameInput.value.toLowerCase(), // Add nameLower
    email: newMerchantEmailInput.value,
    remaining: remainPayment.value,
    barrowed: merchantBarrowed.value
  
  };

  const newMerchantRef = firebase.database().ref('merchants').push(); 
  const newMerchantKey = newMerchantRef.key;
  
  const updates2 = {}; 
  updates2['/merchants/' + newMerchantKey] = newMerchantAccount;

  firebase.database().ref().update(updates2) 
.then(() => { 

  //////////////// unfinished //////////////////////
    });    

}); */


///////////////////////////// end of adding merchant /////////////////////////////
///////////////////////////// end of adding merchant /////////////////////////////




////////////////////////////   PAYMENTS TABLE1 - STARTS  HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE1 - STARTS  HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE1 - STARTS  HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE1 - STARTS  HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE1 - STARTS  HERE  /////////////////////


const table = document.getElementById('payments-table').getElementsByTagName('tbody')[0];
const rowsPerPageSelect = document.getElementById('rows-per-page');
const tableData = [];
let currentPage = 1;
let rowsPerPage = 10; // Initial value

// Fetch data from Firebase and display in the table
let paymentsData = []; // Store the fetched payment data

database.ref('payments').on('value', (snapshot) => {
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
        refNumber: payment.refNumber,
        paymentType: payment.paymentType,
        time: payment.time,
        date: payment.date,
        user: payment.user,
        merchantP: payment.merchantP,
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


  // Create table cells and populate them with data

  // Create a cell for the row index
  const rowIndexCell = row.insertCell();
  rowIndexCell.textContent = rowIndex + 1;

  const amountCell = row.insertCell();
  amountCell.textContent = payment.amount;

  const refNumberCell = row.insertCell();
  refNumberCell.textContent = payment.refNumber;

  const timeCell = row.insertCell();
  timeCell.textContent = payment.time;

  const dateCell = row.insertCell();
  dateCell.textContent = payment.date;

  const paymentTypeCell = row.insertCell();
  paymentTypeCell.textContent = payment.paymentType;

  const userCell = row.insertCell();
  userCell.textContent = payment.user;

  const merchantCell = row.insertCell();
  merchantCell.textContent = payment.merchantP; 


  const statusCell = row.insertCell();
  statusCell.textContent = payment.status;


     //////////////////////////// ALL ABOUT CHECKBOX SELECTION STARTS HERE  /////////////////////////// 
    //////////////////////////// ALL ABOUT CHECKBOX SELECTION STARTS HERE  /////////////////////////// 
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
      console.log("usa claimed" + payment.id);
    } else {
      statusCell.textContent = 'new';
      // Update the status in your Firebase database here
      database.ref('payments/' + payment.id).update({ status: 'new' });
      console.log("usa gebalik" + payment.id);
    }
  });  
  
  checkboxCell.appendChild(checkbox); 
    
  
   //////////////////////////// ALL ABOUT CHECKBOX SELECTION ENDS HERE  /////////////////////////// 
    //////////////////////////// ALL ABOUT CHECKBOX SELECTION ENDS HERE  /////////////////////////// 
     //////////////////////////// ALL ABOUT CHECKBOX SELECTION ENDS HERE  /////////////////////////// 
  


  // Add Edit, Delete, and Status cells (you'll need to implement the functionality)

  // Add Edit button with data-row-index 
  const editCell = row.insertCell();
  editCell.innerHTML = `<button class="edit-button" data-row-index="${payment.id}">Edit</button>`;



  // Add Delete and Status cells (implement their functionality later)
  const deleteCell = row.insertCell();
  deleteCell.innerHTML = `<button class="delete-button" data-row-index="${payment.id}">Delete</button>`; // Add delete button

  
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
/////////////////////////////////// auto add /////////////////////////////
/////////////////////////////////// auto add /////////////////////////////


const paymentsTable = document.getElementById('payments-table');

// Check if the table exists before proceeding
if (paymentsTable) {
    const tableBody = paymentsTable.querySelector('tbody');

    // Check if the tbody exists
    if(tableBody){
        const totalAmountSpan = document.getElementById('table-total');

        function calculateTotal() {
          itemList.innerHTML = ""; // Clear existing list
            let total = 0;
            const amountCells = tableBody.querySelectorAll('td:nth-child(2)');

            amountCells.forEach(cell => {
                const amount = parseFloat(cell.textContent) || 0;
                total += amount;
               // console.log("DIRI   " + total);
            });

            if (totalAmountSpan) { // Check if the total amount span exists
                totalAmountSpan.textContent = total.toFixed(2);
            } else {
                console.error("Total amount span element not found!");
            }
        }

        calculateTotal(); // Initial calculation

        const observer = new MutationObserver(calculateTotal);
        const config = { childList: true, subtree: true };

        observer.observe(tableBody, config);
    } else {
        console.error("Table body (tbody) not found!");
    }
  }



////////////////////////// test for checkbox claimed ALL /////////////////////////
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
        console.log(`Payment ${paymentKey} updated to claimed`);
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
/////////////////////////////  // Event listener for Edit button //////////////////////////////
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





///////////////////// EDIT PAYMENT SAVE BUTTON-1  ///////////////////////////
///////////////////// EDIT PAYMENT SAVE BUTTON-1  ///////////////////////////
///////////////////// EDIT PAYMENT SAVE BUTTON-1  ///////////////////////////
///////////////////// EDIT PAYMENT SAVE BUTTON-1  ///////////////////////////


// Get the Save button element
const saveEditBtn = document.getElementById('save-edit');


saveEditBtn.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey9 = button.dataset.rowIndex;
 
  const rowData = tableData.find(data => data.firebaseKey9 === firebaseKey9);

  // 1. Get the merchant name from the input box:
  //const merchantNameInput = document.getElementById('edit-merchant'); // Assuming 'merchantP' is the ID of your merchant name input
  const merchantName = document.getElementById('edit-merchant').value;

  // 2. Function to fetch the merchant's Firebase key based on the name:
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
              console.log("Merchant Firebase Key:", merchantFirebaseKey);
              const newPayKeyPar = document.getElementById('edit-idPay').value;
              const newPayKey = newPayKeyPar;
             
              const updatedPaymentData = {

               // firebasekey: document.getElementById('edit-idPay').value,
                  amount: document.getElementById('edit-amount').value,
                  refNumber: document.getElementById('edit-ref-number').value,
                  paymentType: document.getElementById('edit-payment-type').value,
                  time: document.getElementById('edit-time').value,
                  date: document.getElementById('edit-date').value,
                  user: document.getElementById('edit-user').value,
                  status: document.getElementById('edit-status').value,
                  merchantP: document.getElementById('edit-merchant').value, // Merchant Name */
                  merchantKey: merchantFirebaseKey, // The new merchant Firebase Key
              };

              // Update in Firebase (example)
              firebase.database().ref(`payments/${newPayKey}`).update(updatedPaymentData)
                  .then(() => {
                      console.log("Payment data updated successfully.");
                      console.log("payment key:", newPayKey);
                      // ... any other success handling ...
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

  });    
//////////////////////////sample get merchant key/////////////////////



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


////////////////////// END OF EDIT BUTTON SAVE /////////////////////
////////////////////// END OF EDIT BUTTON SAVE /////////////////////
////////////////////// END OF EDIT BUTTON SAVE /////////////////////


//////////////////////// Event listener for search input in merchant table ////////////////////////
//////////////////////// Event listener for search input in merchant table ////////////////////////
const merchantSearchInput = document.getElementById('merchant-search');

let timeoutId;

paymentSearchInput.addEventListener('input', () => {
  clearTimeout(timeoutId); // Clear any previous timeout

  timeoutId = setTimeout(() => {
    const searchTerm = paymentSearchInput.value.toLowerCase();
const filteredDataP = paymentsData.filter((payment) => {
      return (
       

        (payment.amount.toString().toLowerCase().includes(searchTerm)) ||
        (payment.refNumber.toLowerCase().includes(searchTerm)) ||
        (payment.time.toLowerCase().includes(searchTerm)) ||
        (payment.date.toLowerCase().includes(searchTerm)) ||
        (payment.paymentType.toLowerCase().includes(searchTerm)) ||
        (payment.user.toLowerCase().includes(searchTerm)) ||
        (payment.merchantP.toLowerCase().includes(searchTerm)) 
      );
    });
    updatePaymentsTable(filteredDataP);
  }, 100); // Delay of 250 milliseconds (adjust as needed)
});

  ////////////////////////////// end of merchant search input /////////////////////


//cancel to hide add editform
cancelEditButton.addEventListener('click', () => {
editPaymentForm.style.display = 'none'; 
});


//Function to Load and Display Payments

function loadPayments() {
paymentsTable.innerHTML = ""; // Clear existing data

paymentsRef.orderByChild("timestamp").on("value", (snapshot) => {
    let totalToday = 0;
    let totalNewToday = 0;
    let totalClaimedToday = 0;
    let totalThisMonth = 0;
    const today = formatDate(new Date());
    const currentMonth = today.substring(0, 7); 

});
} 

////////////////////////////   PAYMENTS TABLE1 - ENDS HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE1 - ENDS HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE1 - ENDS HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE1 - ENDS HERE  /////////////////////




////////////////////////////   PAYMENTS TABLE2  - STARTS  HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE2  - STARTS  HERE  /////////////////////
////////////////////////////   PAYMENTS TABLE2  - STARTS  HERE  /////////////////////



const table2 = document.getElementById('payments-table2').getElementsByTagName('tbody')[0];
const tableData2 = [];

// Fetch data from Firebase and display in the table
let paymentsData2 = []; // Store the fetched payment data

database.ref('payments').on('value', (snapshot) => {
  tableData2.length = 0; // Clear existing data
  paymentsData2 = [];
  


  snapshot.forEach((childSnapshot) => {
    const payment2 = childSnapshot.val();
    const firebaseKey2 = childSnapshot.key; // Get the Firebase key

    // Filter for payments with status 'new'
    if (payment2.status === 'claimed') {
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

// Add Checkbox cell

 const checkboxCell2 = row2.insertCell();
const checkbox2 = document.createElement('input');
checkbox2.type = 'checkbox';
// Set the initial checked state based on the status
checkbox2.checked = payment2.status === 'claimed';  
//checkbox2.disabled = true;    //////use to freez the checkbox in claimed table


  // Add Edit, Delete, and Status cells (you'll need to implement the functionality)

  // Add Edit button with data-row-index 
  const editCell2 = row2.insertCell();
  editCell2.innerHTML = `<button class="edit-button" data-row-index="${payment2.id}">Edit2</button>`;



  // Add Delete and Status cells (implement their functionality later)
  const deleteCell2 = row2.insertCell();
  deleteCell2.innerHTML = `<button class="delete-button" data-row-index="${payment2.id}">Delete</button>`; // Add delete button


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
          itemList.innerHTML = ""; // Clear existing list
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
console.log("mao ni ang key  " + rowData2.firebaseKey);
   
     amountCheckbox.addEventListener('change', () => {
    paymentSearchInput.dispatchEvent(new Event('input'));
    }); 

  //  populateMerchantDropdown2(); 
  });
});


///////////////////// EDIT PAYMENT SAVE BUTTON-2 starts Here ///////////////////////////
///////////////////// EDIT PAYMENT SAVE BUTTON-2 starts Here ///////////////////////////
///////////////////// EDIT PAYMENT SAVE BUTTON-2 starts Here ///////////////////////////
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

  timeoutId = setTimeout(() => {
    const searchTerm2 = paymentSearchInput22.value.toLowerCase();
   
const filteredDataP = paymentsData2.filter((payment) => {
      return (
        payment.status.toLowerCase() === "claimed" && // Crucial: Status check FIRST
       (

        (payment.amount.toString().toLowerCase().includes(searchTerm2)) ||
        (payment.refNumber.toLowerCase().includes(searchTerm2)) ||
        (payment.time.toLowerCase().includes(searchTerm2)) ||
        (payment.date.toLowerCase().includes(searchTerm2)) ||
        (payment.paymentType.toLowerCase().includes(searchTerm2)) ||
        (payment.user.toLowerCase().includes(searchTerm2)) ||
        (payment.merchantP.toLowerCase().includes(searchTerm2)) 
        
       )
      );
    });
    updatePaymentsTable2(filteredDataP, paymentsData2);
  }, 100); // Delay of 250 milliseconds (adjust as needed)
});

  ////////////////////////////// end of merchant search input /////////////////////


//cancel to hide add editform
cancelEditButton2.addEventListener('click', () => {
editPaymentForm2.style.display = 'none'; 
});


/////////////////////////// END OF TABLE2 SEARCH INPUT //////////////////////
////////////////////////////   PAYMENTS TABLE2 - ENDS HERE  /////////////////////




////////////////////////////   EDIT PAYMENT MERCHANT NAME DROPDOWNLIST /////////////////////
////////////////////////////   EDIT PAYMENT MERCHANT NAME DROPDOWNLIST /////////////////////
////////////////////////////   EDIT PAYMENT MERCHANT NAME DROPDOWNLIST /////////////////////
////////////////////////////   EDIT PAYMENT MERCHANT NAME DROPDOWNLIST /////////////////////


// Function to populate the merchant dropdown
function populateMerchantDropdown() {
  const merchantDropdown = document.getElementById('edit-merchant');
  merchantDropdown.innerHTML = ''; // Clear existing options

  database.ref('merchants').once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const merchantName = childSnapshot.val().name;
      const option = document.createElement('option');
      option.value = merchantName; 
      option.textContent = merchantName;
      merchantDropdown.appendChild(option);
    });
  });
}



////////////////////////// DISPLAY MERCHANTS //////////////////////////////////////////
////////////////////////// DISPLAY MERCHANTS //////////////////////////////////////////
////////////////////////// DISPLAY MERCHANTS //////////////////////////////////////////



///////// Function to calculate and display total payments for each merchant/////////////
///////// Function to calculate and display total payments for each merchant/////////////
///////// Function to calculate and display total payments for each merchant/////////////

//const merchantsTableBody = document.getElementById('merchants-table').getElementsByTagName('tbody')[0];
//const editMerchantForm = document.getElementById('edit-merchant-form'); // Get your form element
//const editMerchantCell = document.getElementById('EditMerchantF');



/* let merchantData5 = []; // Initialize an empty array
function calculateAndDisplayMerchantPayments(merchantData) {
  database.ref('merchants').once('value', (snapshot) => {

      merchantData5 = []; // ***CRITICAL: Clear the array *before* populating***
      snapshot.forEach((childSnapshot) => {
     

          const merchant = childSnapshot.val();
          const firebaseKey = childSnapshot.key;
          merchantData5.push({ id: firebaseKey, ...merchant }); // No need for firebaseKey.key
       
      });


        // 2. Fetch Payments Data
        database.ref('payments').once('value', (paymentsSnapshot) => {
          const payments = [];
         
          paymentsSnapshot.forEach((paymentSnapshot) => {
              const payment = paymentSnapshot.val();
              //Only add payments with status new
              if (payment.status === 'new') { //This is the added line
                  payments.push(payment);
              }

          });
            // 3. Calculate Total Payments for each merchant
            const merchantPaymentCounts = {};
            const merchantTotalPayments = {};

            payments.forEach((payment) => {
                //if (payment.merchantP && payment.amount) { // Check if merchantP and amount exist
                  if (payment.merchantKey && payment.amount) {
                    const merchantKey = payment.merchantKey;
                    const amount = parseFloat(payment.amount); // Parse amount as float
                   

                   // Count Payments
                   if (!merchantPaymentCounts[merchantKey]) {
                    merchantPaymentCounts[merchantKey] = 0;
                    
                  }
                      merchantPaymentCounts[merchantKey]++;

                    

                    if (!merchantTotalPayments[merchantKey]) {
                        merchantTotalPayments[merchantKey] = 0;
                       

                    }
                    merchantTotalPayments[merchantKey] += amount;

                    console.log("mao ni diri ilabog ang total :",amount);
                 }
              });
              });
             });  
           };
 
          */
   


//////////////////////////////  FOR MECHANT DISPLAY NEW /////////////////////////////////
//////////////////////////////  FOR MECHANT DISPLAY NEW /////////////////////////////////
//////////////////////////////  FOR MECHANT DISPLAY NEW /////////////////////////////////
//////////////////////////////  FOR MECHANT DISPLAY NEW /////////////////////////////////


const tableMerchant = document.getElementById('merchants-table').getElementsByTagName('tbody')[0];
const editMerchantForm = document.getElementById('edit-merchant-form'); // Get your form element
//const editMerchantCell = document.getElementById('EditMerchantF');
const tableDataM = [];

//Fetch data from Firebase and display in the table
let merchantData = []; // Store the fetched payment data

database.ref('merchants').on('value', (snapshot) => {
  
  tableDataM.length = 0; // Clear existing data
  merchantData = [];

  snapshot.forEach((childSnapshot) => {
    const merchant = childSnapshot.val();
    const firebaseKeyM = childSnapshot.key; // Get the Firebase key

    // Filter for payments with status 'new'
   // if (payment.status === 'new') {
      if (merchant.remaining >= 0 ) {
      merchantData.push({ id: firebaseKeyM, ...merchant });

      const rowDataM = {
        firebaseKey: firebaseKeyM, // Store the key
        barrowed: merchant.barrowed,
        email:merchant.email,
        name: merchant.name,
        nameLower: merchant.nameLower,
        remaining: merchant.remaining
        
      };

      tableDataM.push(rowDataM);
    } ///// end of if here

  });

 // updateMerchantTable(merchantData); // Initial table population
 calculateAndDisplayMerchantPayments(merchantData);
});



function calculateAndDisplayMerchantPayments(merchantData) {
  // Create a map to store total payments for each merchant
 /*  const merchantTotalPayments = {};
  const merchantNumPayments = {}; // To store the *number* of payments

   // Fetch payments and calculate totals
   database.ref('payments').once('value').then((paymentsSnapshot) => { // Use 'once' to avoid continuous updates on the payments table.
      paymentsSnapshot.forEach((paymentSnapshot) => {
          const payment = paymentSnapshot.val();

          // Check if the payment has a merchantId and status is "paid"
          if (payment.merchantKey && payment.status === 'new') {
              if (merchantTotalPayments[payment.merchantKey]) {
                  merchantTotalPayments[payment.merchantKey] += parseFloat(payment.amount);
                  merchantNumPayments[payment.merchantKey] += 1;
              } else {
                  merchantTotalPayments[payment.merchantKey] = parseFloat(payment.amount);
                  merchantNumPayments[payment.merchantKey] = 1;
              }
          }
      });

      // Now that we have the totals, update the merchant table
       updateMerchantTable(merchantData, merchantTotalPayments, merchantNumPayments, payments);

  }).catch(error => {
       console.error("Error fetching payments:", error); //  handle errors properly
  }); */

// 2. Fetch Payments Data
database.ref('payments').once('value', (paymentsSnapshot) => {
  const payments = [];
 
  paymentsSnapshot.forEach((paymentSnapshot) => {
      const payment = paymentSnapshot.val();
      //Only add payments with status new
      if (payment.status === 'new') { //This is the added line
          payments.push(payment);
      }

  });
    // 3. Calculate Total Payments for each merchant
    const merchantNumPayments = {};
    const merchantTotalPayments = {};

    payments.forEach((payment) => {
        if (payment.merchantKey && payment.amount) { // Check if merchantP and amount exist
         // if (payment.merchantKey && payment.amount) {
            const merchantKey= payment.merchantKey;
            const amount = parseFloat(payment.amount); // Parse amount as float
           

           // Count Payments
           if (!merchantNumPayments[merchantKey]) {
            merchantNumPayments[merchantKey] = 0;
            
          }
          merchantNumPayments[merchantKey]++;

            if (!merchantTotalPayments[merchantKey]) {
                merchantTotalPayments[merchantKey] = 0;
               

            }
            merchantTotalPayments[merchantKey] += amount;
         
         }
         updateMerchantTable(merchantData, merchantNumPayments, merchantTotalPayments);
      })
    
     
    })

} ///////////////////// end of the function /////////////////////////////////////





function updateMerchantTable(data, merchantNumPayments, merchantTotalPayments) {
  tableMerchant.innerHTML = ''; // Clear the table
  data.forEach((merchant, rowIndex) => {

  const row = tableMerchant.insertRow();

  // Create table cells and populate them with data

  const rowIndexCell = row.insertCell();
  rowIndexCell.textContent = rowIndex + 1;
  //rowIndexCell.textContent = merchant.id;

  const merchantKeyCell = row.insertCell();
  merchantKeyCell.textContent = merchant.id;
  //fireKeyCell.textContent = payment.merchantKey;

  const nameCell = row.insertCell();
  nameCell.textContent = merchant.name;

  const emailCell = row.insertCell();
  emailCell.textContent = merchant.email;

  const merchantKey = (merchant.id);
  const ihapPila = (merchantNumPayments[merchantKey] || 0);
  
  const numPaymentsCell = row.insertCell(); // New cell for number of payments
  numPaymentsCell.textContent  = (merchantNumPayments[merchantKey] || 0); // Display with 2 decimal places

  const totalPaymentsCell = row.insertCell();
  totalPaymentsCell.textContent = (merchantTotalPayments[merchantKey] || 0).toFixed(2); // Display with 2 decimal places

  const totalPPNEW = (merchantTotalPayments[merchantKey] || 0).toFixed(2);
  const total22 = Number(totalPPNEW);
  const nabilin = Number(merchant.remaining);
  const genMerchantTotal22 = total22 + nabilin ;

  const remainingCell = row.insertCell();
  remainingCell.textContent = merchant.remaining;

  const barrowedCell = row.insertCell();
  barrowedCell.textContent = merchant.barrowed;
 
 const genMerchatTotalCell = row.insertCell();
  genMerchatTotalCell.textContent = genMerchantTotal22.toFixed(2); // Display with 2 decimal places     
  
  // Add Edit button with data-row-index 
  const editMerchantCell = row.insertCell();
  editMerchantCell.innerHTML = `<button class="edit-button-merchant" data-row-index="${merchant.id}">Actions</button>`;



//////////////////////// Event listener for search input in merchant table ////////////////////////
//////////////////////// Event listener for search input in merchant table ////////////////////////
//const merchantSearchInput9 = document.getElementById('merchant-search');

let timeoutId9;

merchantSearchInput9.addEventListener('input', () => {
  clearTimeout(timeoutId9); // Clear any previous timeout
 
  timeoutId9 = setTimeout(() => {
    const searchTerm = merchantSearchInput9.value.toLowerCase();
    const filteredData = merchantData.filter((merchant) => {
      return (
        
      
      // (payment.merchantP.toLowerCase().includes(searchTermM)) ||
        (merchant.id.toLowerCase().includes(searchTerm))  ||
        (merchant.name.toLowerCase().includes(searchTerm))  ||
        (merchant.email.toLowerCase().includes(searchTerm))  ||
        (merchant.remaining.toString().toLowerCase().includes(searchTerm)) ||
        (merchant.barrowed.toString().toLowerCase().includes(searchTerm))
      );
      
    });
   // console.log("Filtered Data:", filteredData); // Add this line

    updateMerchantTable(filteredData,merchantNumPayments,  merchantTotalPayments);
    
  }, 100); // Delay of 250 milliseconds (adjust as needed)
});

  ////////////////////////////// end of merchant search input /////////////////////



/////////////////////////////  // Event listener for Edit button //////////////////////////////
/////////////////////////////  // Event listener for Edit button //////////////////////////////
/////////////////////////////  // Event listener for Edit button //////////////////////////////

editMerchantCell.addEventListener('click', (event) => {

  updateMerchantTable(data, merchantNumPayments, merchantTotalPayments)

  //calculateAndDisplayMerchantPayments();
  //updateMerchantTable();

 const button = event.target;
 const firebaseKey = button.dataset.id;
 const rowData = tableData.find(data => data.firebaseKey === firebaseKey);
 

// console.log("sa profile ni dapita :" , nabilin);
 

    // Populate form fields
    document.getElementById('edit-id-m').value = merchant.id; 
    document.getElementById('edit-merChantId').value = merchant.merchantKey;
   document.getElementById('edit-num-paymentst').value = ihapPila;
    document.getElementById('edit-new-pay').value ;
  // document.getElementById('mer-general-total').value = genMerchantTotal2;
    document.getElementById('edit-merchant-name').value = merchant.name;
    document.getElementById('edit-merchant-email').value = merchant.email;
    document.getElementById('edit-new-remain').value =  merchant.remaining;
    document.getElementById('edit-new-borrowed').value = merchant.barrowed;

    
   // const nabilin = document.getElementById('edit-new-remain').value;
   // const newBayad = document.getElementById('edit-new-pay').value;
    //const sudNewBayad = newBayad;
   
    document.getElementById('mer-general-total').value = genMerchantTotal22;
   // console.log("sa profile ni dapita :" ,sudNewBayad);


    // Show the modal display only to collect data in input fields next to save BTN /////
    editMerchantForm.style.display = 'block';  


///////////////////// EDIT MERCHANT SAVE BUTTON  ///////////////////////////

// Get the Save button element
const editMerchantBTN = document.getElementById('save-edit-merchant');

editMerchantBTN.addEventListener('click', () => {

 // calculateAndDisplayMerchantPayments();
 // updateMerchantTable();

 // updateMerchantTable(data,filteredDataM, merchantTotalPayments, merchantNumPayments, payment)
  const editMerchantID = document.getElementById('edit-id-m').value;

  const editMerchant = {

   name: document.getElementById('edit-merchant-name').value, 
   email: document.getElementById('edit-merchant-email').value,
   remaining: document.getElementById('edit-new-remain').value,
   barrowed: document.getElementById('edit-new-borrowed').value,

 };
 
 console.log("THE LINK KEY SHOULD HERE:", editMerchantID);

  // Update in Firebase (example)
  database.ref(`merchants/${editMerchantID}`).update(editMerchant)
  .then(() => {
      console.log("Payment data updated successfully.");
     // console.log("payment key:", editMerchantNew );
      // ... any other success handling ...
  })
  .catch(error => {
      console.error("Error updating payment data:", error);
      // ... error handling ...
  });
}); ///////// MERCHANT SAVE BUTTON ENDS HERE //////////////






//////////////////////FOR MERCHANT TRADING TABLE //////////////////////////
//////////////////////FOR MERCHANT TRADING TABLE //////////////////////////
//////////////////////FOR MERCHANT TRADING TABLE //////////////////////////

const merTag = document.getElementById('edit-id-m').value = merchant.id;
const tableC = document.getElementById('claim-table').getElementsByTagName('tbody')[0];
const tableDataC = [];

// Fetch data from Firebase and display in the table
let paymentsDataC = []; // Store the fetched payment data

 database.ref('payments').on('value', (snapshot) => {

  
  tableDataC.length = 0; // Clear existing data
  paymentsDataC = [];
  const merTag = document.getElementById('edit-id-m').value = merchant.id;  ////ERROR HERE ---->


  snapshot.forEach((childSnapshot) => {
    const paymentC = childSnapshot.val();
    const firebaseKeyC = childSnapshot.key; // Get the Firebase key

    // Filter for payments with status 'new'
    if (paymentC.status === 'new' && paymentC.merchantKey == merTag) {
      paymentsDataC.push({ id: firebaseKeyC, ...paymentC });
     
      const rowDataC = {
        firebaseKey: firebaseKeyC, // Store the key
        amount: paymentC.amount,
        refNumber: paymentC.refNumber,
        paymentType: paymentC.paymentType,
        time: paymentC.time,
        date: paymentC.date,
        user: paymentC.user,
        merchantP: paymentC.merchantP,
        status: paymentC.status
      };

      tableDataC.push(rowDataC);
      
    }
  });
  //console.log("ge balik" + fireKey);
  updatePaymentsTableC(paymentsDataC); // Initial table population
 // calculateAndDisplayTotalPayments()
 //console.log(merTag);
}); 



 function updatePaymentsTableC(data) {
tableC.innerHTML = ''; // Clear the table

data.forEach((paymentC, rowIndex) => {
  const row = tableC.insertRow();


  // Create table cells and populate them with data

  // Create a cell for the row index
  const rowIndexCellC = row.insertCell();
  rowIndexCellC.textContent = rowIndex + 1;

  const amountCellC = row.insertCell();
  amountCellC.textContent = paymentC.amount;

  const refNumberCellC= row.insertCell();
  refNumberCellC.textContent = paymentC.refNumber;

  const timeCellC = row.insertCell();
  timeCellC.textContent = paymentC.time;

  const statusCellC = row.insertCell();
  statusCellC.textContent = paymentC.status;
 

    
   
  ///////////////// ALL ABOUT CHECKBOX trading table SELECTION STARTS HERE  /////////////////
  
  // Add Checkbox cell
 
  const checkboxCellC= row.insertCell();
  const checkboxC = document.createElement('input');
  checkboxC.type = 'checkbox';
  // Set the initial checked state based on the status
  checkboxC.checked = paymentC.status === 'claimed'; 
  
  // ... your existing code ...
  const selectAllCheckboxC = document.getElementById('payment-sana-allC');
  selectAllCheckboxC.addEventListener('change', () => {
   
    const checkboxesC = tableC.querySelectorAll('input[type="checkbox"]'); 
    checkboxesC.forEach(checkboxC => {
      checkboxC.checked = selectAllCheckboxC.checked; 
  
      // Update the status in your Firebase database here for each checkbox
      const row = checkboxC.closest('tr'); // Get the row containing the checkbox
     // const paymentId = row.querySelector('.delete-button').dataset.rowIndex; // Assuming you have a delete button with data-row-index as in your previous code
  
      if (selectAllCheckboxC.checked) {

        
        statusCellC.textContent = 'claimed'; 
      // Update the status in your Firebase database here
      database.ref('payments/' + paymentC.id).update({ status: 'claimed' });
      console.log("ge claimed na" + paymentC.id);
 
      } else {
        statusCellC.textContent = 'new';
      // Update the status in your Firebase database here
      database.ref('payments/' + paymentC.id).update({ status: 'new' });
      console.log("ge balik" + paymentC.id);
      }

    });
    
  });
  

 
///////////////////////// checbox trading table /////////////////
  
  
   checkboxC.addEventListener('change', (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    if (checkboxC.checked) {
      statusCellC.textContent = 'claimed'; 
      // Update the status in your Firebase database here
      database.ref('payments/' + paymentC.id).update({ status: 'claimed' });
      console.log("usa claimed DIRI SA TABLE TRADE" + paymentC.id);
     

    } else {
      statusCellC.textContent = 'new';
      // Update the status in your Firebase database here
      database.ref('payments/' + paymentC.id).update({ status: 'new' });
      console.log("usa gebalik " + paymentC.id);
    }

   // calculateAndDisplayTotalPayments()

  }); 
  
  checkboxCellC.appendChild(checkboxC); 
    
 

});

};  

//////// end of trading table /////////////////////////////////////////////
//////// end of trading table /////////////////////////////////////////////
//////// end of trading table /////////////////////////////////////////////
//////// end of trading table /////////////////////////////////////////////
 
}); ////// END OF EDIT MERCHANCELL BUTTON ///////////////////////////


















/////////////////////////////////// auto add /////////////////////////////
/////////////////////////////////// auto add /////////////////////////////
/////////////////////////////////// auto add /////////////////////////////

const tableBody = document.getElementById('merchants-table').getElementsByTagName('tbody')[0];
//const paymentsTable = document.getElementById('merchants-table');
// Check if the table exists before proceeding
if (tableBody) {
   // const tableBody = merchant
    const tableBody = document.getElementById('merchants-table');

    // Check if the tbody exists
    if(tableBody){
        const totalAmountSpanM = document.getElementById('table-totalM');

        function calculateTotalMerchantTable() {
          itemList.innerHTML = ""; // Clear existing list
            let total = 0;
            const totalPaymentsCell = tableBody.querySelectorAll('td:nth-child(7)');

            totalPaymentsCell.forEach(cell => {
                const amount = parseFloat(cell.textContent) || 0;
                total += amount;
              // console.log("DIRI   " + total);
            });

            if (totalAmountSpanM) { // Check if the total amount span exists
                totalAmountSpanM.textContent = total.toFixed(2);
            } else {
                console.error("Total amount span element not found!");
            }
        }

        calculateTotalMerchantTable(); // Initial calculation

        const observer = new MutationObserver(calculateTotalMerchantTable);
        const config = { childList: true, subtree: true };

        observer.observe(tableBody, config);
    } else {
        console.error("Table body (tbody) not found!");
    }
  }









  });
 

}; ///////////////end of display merchant  table new  ///////////////////
  ///////////////end of display merchant  table new  ///////////////////
  ///////////////end of display merchant  table new  ///////////////////



///////////////// start of trading table calculate //////////////////////////

const paymentsTableE = document.getElementById('claim-table');
//const editMerchantForm = document.getElementById('edit-merchant-form');
    // Check if the tbody exists
    if (paymentsTableE) {
      const tableBodyE = paymentsTableE.querySelector('tbody');
    
      // Check if the tbody exists
      if(tableBodyE){
          const totalAmountSpanE = document.getElementById('edit-new-pay');
          const totalAmountSpanC = document.getElementById('table-totalC');
        
  
          function calculateTotalE() { 
            itemListC.innerHTML = ""; // Clear existing list
              let sum = 0;
              const amountCellsE = tableBodyE.querySelectorAll('td:nth-child(2)');
              amountCellsE.forEach(cell => {
                const amountE = parseFloat(cell.textContent) || 0;
                sum += amountE;
              });
              totalAmountSpanE.value = sum.toFixed(2);
              totalAmountSpanC.textContent = sum.toFixed(2);
               return sum;
              };

        
          calculateTotalE(); // Initial calculation

        const observerE = new MutationObserver(calculateTotalE);
        const configE = { childList: true, subtree: true };

        observerE.observe(tableBodyE, configE);
    } else {
        console.error("Table body (tbody) not found!");
    };
  
    };  ////////////////// end of trading table calculate /////////////////////
         ////////////////// end of trading table calculate /////////////////////















  
  //cancel to hide add editform
  cancelEditButton.addEventListener('click', () => {
  editPaymentForm.style.display = 'none'; 
  });
  
  
  //Function to Load and Display Payments
  
  function loadPayments() {
  paymentsTable.innerHTML = ""; // Clear existing data
  
  paymentsRef.orderByChild("timestamp").on("value", (snapshot) => {
      let totalToday = 0;
      let totalNewToday = 0;
      let totalClaimedToday = 0;
      let totalThisMonth = 0;
      const today = formatDate(new Date());
      const currentMonth = today.substring(0, 7); 
  
  });
  } 
  
  








////////////////////// END OF EDIT BUTTON SAVE /////////////////////
////////////////////// END OF EDIT BUTTON SAVE /////////////////////
////////////////////// END OF EDIT BUTTON SAVE /////////////////////





//////////////////////////// NEW MERCHANT DISPLAY ENDS HERE /////////////////////////////
//////////////////////////// NEW MERCHANT DISPLAY ENDS HERE /////////////////////////////
//////////////////////////// NEW MERCHANT DISPLAY ENDS HERE /////////////////////////////

