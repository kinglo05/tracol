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
            document.getElementById("usernameDisplay").innerText = "Welcome, " + userData.email;
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
              savePayment2(refNumber, amount); // Save only if refNumber exists but amount is different
              //console.log('amount is different!');
              alert("New payment successfully saved!");
          }
      } else {
          savePayment2(refNumber, amount); // Save if refNumber doesn't exist
         // console.log('reference ok!');
         alert("New payment successfully saved!");
      }
  });
});

function savePayment2(refNumber, amount) {  // Correctly placed *inside* the callback
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
         // alert('New payment added successfully!');
          // Clear the form fields after successful submission (optional)
         /*  amountInput.value = '';
          refNumberInput.value = '';
          paymentType.value = ''; // Or reset to default value
          timeInput.value = '';
          dateInput.value = '';
          userInput.value = '';
          merchantInputPay.value = ''; */
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



  



//const table = document.getElementById('payments-table').getElementsByTagName('tbody')[0];
//const rowsPerPageSelect = document.getElementById('rows-per-page');


/* function updatePaymentsTable(data) {
table.innerHTML = ''; // Clear the table



data.forEach((payment, rowIndex) => {
  const row = table.insertRow();


});

}; */

















































  
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

