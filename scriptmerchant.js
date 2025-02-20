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




const addMerchantForm = document.getElementById("add-merchant-form");
const newMerchantNameInput = document.getElementById("new-merchant-name");
const newMerchantEmailInput = document.getElementById("new-merchant-email");
const newMerchantAddressInput = document.getElementById("new-merchant-address");
//const cancelAddMerchantBtn = document.getElementById("cancel-add-merchant");
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
const cancelEditMerchant = document.getElementById('cancel-edit-merchant');
const countNoPayments = document.getElementById('num-paymentst');
const totalNewPayment = document.getElementById('new-pay');
const remainPayment = document.getElementById('new-remain');
const merchantBarrowed = document.getElementById('new-borrowed');
const editCountNoPayments = document.getElementById('edit-num-paymentst');
const editTotalNewPayment = document.getElementById('edit-new-pay');
const editRemainPayment = document.getElementById('edit-new-remain');
const editMerchantBarrowed = document.getElementById('edit-new-borrowed');
const merGeneralTotal = document.getElementById('mer-general-total');
const editMerchantName = document.getElementById('edit-merchant-name').value;
  const editMerchantEmail = document.getElementById('edit-merchant-email').value;
  const editMerchantRemain = document.getElementById('edit-new-remain').value;
  const editMerchantID = document.getElementById('edit-merChantId').value;
  const  tableClaim = document.getElementById('claim-table').getElementsByTagName('tbody')[0];
  const merchantSearchInput9 = document.getElementById('merchant-search');

  const tableMerchant = document.getElementById('merchants-table').getElementsByTagName('tbody')[0];
  const editMerchantForm = document.getElementById('edit-merchant-form'); // Get your form element




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
let currentUserId = "user123"; // Replace with actual user authentication logic
let editPaymentId = null; // Store the ID of the payment being edited


//const dateInput = document.getElementById('date');
  const today = new Date();

  // Format the date as YYYY-MM-DD (required for input type="date")
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + today.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;


// ADD MERCHANT BUTTON TO SHOW FORM MODAL
addMerchantButton.addEventListener('click', () => {
  addMerchantForm.style.display = 'block'; 
  }); 
  
  
  
  
  const cancelAddMerchantBtn = document.getElementById("cancel-add-merchant");
  const cancelEditButtonMerchant = document.getElementById('cancel-edit-merchant');



  
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
        //  window.location.href = 'home.html';
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
                  alert('Merchant name successfully saved.');
              })
              .catch((error) => {
                  console.error("Error adding merchant:", error);
                  alert("An error occurred while adding the merchant. Please try again later.")
              });
      }
  });
});


//cancel to hide add merchant modal
cancelAddMerchantBtn.addEventListener('click', () => {
  addMerchantForm.style.display = 'none'; 
  });

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




         let timeoutId;

         merchantSearchInput9.addEventListener('input', () => {
             clearTimeout(timeoutId);
         
             timeoutId = setTimeout(() => {
                 const searchTerm = merchantSearchInput9.value.toLowerCase();
         
                 // Optimization 1: Check if the search term is empty
                 if (!searchTerm) {
                     updateMerchantTable(merchantData, merchantNumPayments, merchantTotalPayments); // Show all merchants
                     return; // Exit early if the search term is empty
                 }
         
                 // Optimization 2: Use a more efficient filtering method if possible
                 // If merchant.id is always a string, avoid toLowerCase() on it.
         
                 const filteredData = merchantData.filter((merchant) => {
                     const merchantName = merchant.name.toLowerCase();
                     const merchantEmail = merchant.email.toLowerCase();
                   
                     return (
                      //   merchantId.includes(searchTerm) || // No toLowerCase() if merchant.id is already a string.
                         merchantName.includes(searchTerm) ||
                         merchantEmail.includes(searchTerm) 
                      //   merchantRemaining.includes(searchTerm) ||
                      //   merchantBorrowed.includes(searchTerm)
                     );
                 });
         
                 updateMerchantTable(filteredData, merchantNumPayments, merchantTotalPayments);
         
             }, 150); // Increased delay to 250ms - a more standard debounce time
         });
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

/////////////////////////////  // Event listener for Edit button //////////////////////////////
































editMerchantCell.addEventListener('click', (event) => {

  updateMerchantTable(data, merchantNumPayments, merchantTotalPayments)

 const button = event.target;
 const firebaseKey = button.dataset.id;

    // Populate form fields
    document.getElementById('edit-id-m').value = merchant.id; 
    document.getElementById('edit-merChantId').value = merchant.merchantKey;
   document.getElementById('edit-num-paymentst').value = ihapPila;
    document.getElementById('edit-new-pay').value ;
    document.getElementById('edit-merchant-name').value = merchant.name;
    document.getElementById('edit-merchant-email').value = merchant.email;
    document.getElementById('edit-new-remain').value =  merchant.remaining;
    document.getElementById('edit-new-borrowed').value = merchant.barrowed;
    document.getElementById('mer-general-total').value = genMerchantTotal22;

    const editNewPayRead = genMerchantTotal22; 
    const editMerchantName = document.getElementById('edit-merchant-name'); // Get the element
    
    if (editNewPayRead >= 1) {
      editMerchantName.setAttribute('readonly', ''); 
    } 
    
    editMerchantForm.style.display = 'block';  


///////////////////// EDIT MERCHANT SAVE BUTTON  ///////////////////////////

// Get the Save button element
const editMerchantBTN = document.getElementById('save-edit-merchant');

editMerchantBTN.addEventListener('click', () => {

 // updateMerchantTable(data,filteredDataM, merchantTotalPayments, merchantNumPayments, payment)
  const editMerchantID = document.getElementById('edit-id-m').value;

  const editMerchant = {

   name: document.getElementById('edit-merchant-name').value, 
   email: document.getElementById('edit-merchant-email').value,
   remaining: document.getElementById('edit-new-remain').value,
   barrowed: document.getElementById('edit-new-borrowed').value,

 };
 
  database.ref(`merchants/${editMerchantID}`).update(editMerchant)
  .then(() => {
     // console.log("Payment data updated successfully.");
      alert("MERCHANT DATA ARE SAVED SUCCESSFULLY"); 
      window.location.reload();
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
    })
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

  
  
  });  
  
  checkboxCellC.appendChild(checkboxC); 
  
 

});

};  

}); ////// END OF EDIT MERCHANCELL BUTTON ///////////////////////////


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
          itemListC.innerHTML = ""; // Clear existing list
            let total = 0;
            const totalPaymentsCell = tableBody.querySelectorAll('td:nth-child(6)');

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
   cancelEditButtonMerchant.addEventListener('click', () => {
    editMerchantForm.style.display = 'none'; 
  });
   
  

  