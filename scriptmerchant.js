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

const cancelEditButtonMerchantName = document.getElementById('cancel-edit-merchantName');


const countNoPayments = document.getElementById('num-paymentst');
const totalNewPayment = document.getElementById('new-pay');
const remainPayment = document.getElementById('new-remain');
const merchantBarrowed = document.getElementById('new-borrowed');
const editCountNoPayments = document.getElementById('edit-num-paymentst');
//const editTotalNewPayment = document.getElementById('edit-new-pay');
const editRemainPayment = document.getElementById('edit-new-remain');
const editMerchantBarrowed = document.getElementById('edit-new-borrowed');
const merGeneralTotal = document.getElementById('mer-general-total');
const editMerchantName = document.getElementById('edit-merchant-name').value;
  const editMerchantEmail = document.getElementById('edit-merchant-email').value;
  const editMerchantRemain = document.getElementById('edit-new-remain').value;
  const editMerchantID = document.getElementById('edit-merChantId').value;
  //const  tableClaim = document.getElementById('claim-table').getElementsByTagName('tbody')[0];
  const merchantSearchInput9 = document.getElementById('merchant-search');

  const tableMerchant = document.getElementById('merchants-table').getElementsByTagName('tbody')[0];
  const editMerchantForm = document.getElementById('edit-merchant-form'); // Get your form element
  const editMerchantFormName = document.getElementById('edit-merchant-formName'); // Get your form element
  const editMerchantName2 = document.getElementById('edit-merchant-nameName').value;



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
  
  const merchantnote= document.getElementById('merchantnote');
  const addmerchantnote= document.getElementById('addmerchantnote');



  
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
      note: addmerchantnote.value = "change note",
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
                  addmerchantnote.value = "";
               //  console.log("Merchant added successfully");

               Swal.fire({
                title: "Success!",
                text: "Merchant name successfully saved",
                icon: "success",
                timer: 3000, // Closes after 3 seconds
                showConfirmButton: false
              });
             

                 
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

  updateMerchantTable(merchantData);
  //calculateAndDisplayMerchantPayments(merchantData);
 

});




let timeoutId;
merchantSearchInput9.addEventListener('input', () => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        const searchTerm = merchantSearchInput9.value.toLowerCase();

        // Optimization 1: Check if the search term is empty
        if (!searchTerm) {
         updateMerchantTable(merchantData);
         // updateMerchantTable(merchantData, merchantNumPayments, merchantTotalPayments); // Show all merchants
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
       
       // updateMerchantTable(filteredData, merchantNumPayments, merchantTotalPayments);

       updateMerchantTable(filteredData);

    }, 150); // Increased delay to 250ms - a more standard debounce time
});    /////////search ends here ///////////////





//function updateMerchantTable(data, merchantNumPayments, merchantTotalPayments) {
  function updateMerchantTable(data) {
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


  const editMerchantCell = row.insertCell();
  editMerchantCell.innerHTML = `<button class="edit-button-merchant" data-row-index="${merchant.id}">Actions</button>`;

  editMerchantCell.addEventListener('click', (event) => {

   const button = event.target;
   const firebaseKey = button.dataset.id;
 
      // Populate form fields
      document.getElementById('edit-id-m').value = merchant.id; 
      document.getElementById('edit-merChantId').value = merchant.merchantKey;
     document.getElementById('edit-num-paymentst').value;
     document.getElementById('edit-new-pay').value ;
      document.getElementById('edit-merchant-name').value = merchant.name;
      document.getElementById('edit-merchant-email').value = merchant.email;
      document.getElementById('edit-new-remain').value =  merchant.remaining;
      document.getElementById('edit-new-borrowed').value = merchant.barrowed;
    const editNewPayRead22 = document.getElementById('mer-general-total').value; 
 
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

     Swal.fire({
      title: "Success!",
      text: "MERCHANT DATA ARE SAVED SUCCESSFULLY",
      icon: "success",
      timer: 2000, // Closes after 3 seconds
      showConfirmButton: false 
    });
   
   /*  editMerchantForm.style.display = 'none';  */

  })
  .catch(error => {
      console.error("Error updating payment data:", error);
      // ... error handling ...
  }); 

});


//////////////////////FOR MERCHANT TRADING TABLE //////////////////////////

//const merTag = document.getElementById('edit-id-m');  //.value = merchant.id;
const tableC = document.getElementById('claim-table').getElementsByTagName('tbody')[0];
const tableDataC = [];


let paymentsDataC = []; // Store the fetched payment data
 database.ref('payments').on('value', (snapshot) => {
  tableDataC.length = 0; // Clear existing data
  paymentsDataC = [];
  const merTag = document.getElementById('edit-id-m').value = merchant.id;  
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
  
  updatePaymentsTableC(paymentsDataC); 
 
 
}); 


function updatePaymentsTableC(data) {
  tableC.innerHTML = ''; // Clear the table
  
  data.forEach((paymentC, rowIndex) => {
    const row = tableC.insertRow();
  
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
    
        const row = checkboxC.closest('tr'); 
    
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
  
  };    //////////////END OF UPDATEPAYMETSTABLE-C ///////////////// 


 ///////////////// start of trading table calculate //////////////////////////

const paymentsTableE = document.getElementById('claim-table');    ////.getElementsByTagName('tbody')[0];
//const editMerchantForm = document.getElementById('edit-merchant-form');
    // Check if the tbody exists
    if (paymentsTableE) {
      const tableBodyE = paymentsTableE.querySelector('tbody');
    
      // Check if the tbody exists
      if(tableBodyE){
      
          const totalAmountSpanE = document.getElementById('edit-new-pay');
          const totalAmountSpanC = document.getElementById('table-totalC');
        const TananTanan = document.getElementById('mer-general-total');
       // const editMerchantNameName = document.getElementById('edit-merchant-nameName');
  
          function calculateTotalE() { 
          
        const nanabilin =    document.getElementById('edit-new-remain').value =  merchant.remaining;
            itemListC.innerHTML = ""; // Clear existing list
              let sum = 0;
              const amountCellsE = tableBodyE.querySelectorAll('td:nth-child(2)');
              amountCellsE.forEach(cell => {
                const amountE = parseFloat(cell.textContent) || 0;
                sum += amountE;
              });
              
              totalAmountSpanE.value = sum.toFixed(2);
              totalAmountSpanC.textContent = sum.toFixed(2);
          
              totalAmountSpanC.textContent = sum.toFixed(2);
              const maoni = Number(nanabilin) + sum;
              TananTanan.value = maoni.toFixed(2) ;
                 
             
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


    
    })     /////////////////////////////  // Event listener for EditCell //////////////////////////////
         /////////////////////////////  // Event listener for EditCell //////////////////////////////   
    
      ///////////////////new edit to change name here ////////////////////////////////////////////

      const editMerchantNameCell = row.insertCell();
      editMerchantNameCell.innerHTML = `<button class="edit-button-merchantName" data-row-index="${merchant.id}">Edit</button>`;
    
      editMerchantNameCell.addEventListener('click', (event) => {
    
       const button = event.target;
       const firebaseKey = button.dataset.id;
     
          // Populate form fields
          document.getElementById('edit-id-mName').value = merchant.id; 
          document.getElementById('edit-merChantIdName').value = merchant.merchantKey;
          document.getElementById('edit-merchant-nameName').value = merchant.name;
          document.getElementById('edit-merchant-emailName').value = merchant.email;
          document.getElementById('merchantnote').value = merchant.note;
         document.getElementById('mer-general-totalName').value;

         
         
          editMerchantFormName.style.display = 'block'; 

    
    ///////////////////// EDIT MERCHANT SAVE BUTTON  ///////////////////////////
    
    // Get the Save button element
    const editMerchantBTNName = document.getElementById('save-edit-merchantName');
    
    editMerchantBTNName.addEventListener('click', () => {
    
     // updateMerchantTable(data,filteredDataM, merchantTotalPayments, merchantNumPayments, payment)
       const editMerchantIDName = document.getElementById('edit-id-mName').value;
    
      const editMerchantName2 = {
    
       name: document.getElementById('edit-merchant-nameName').value, 
       email: document.getElementById('edit-merchant-emailName').value,
       note: document.getElementById('merchantnote').value,
      
    
     };
     
      database.ref(`merchants/${editMerchantIDName}`).update(editMerchantName2)
      .then(() => {

        Swal.fire({
          title: "Success!",
          text: "MERCHANT NAME/NOONES ACCOUNT SAVED SUCCESSFULLY",
          icon: "success",
          timer: 3000, // Closes after 3 seconds
          showConfirmButton: false
        });
       
        editMerchantFormName.style.display = 'none'; 



         // console.log("Payment data updated successfully.");
        // alert("MERCHANT NAME/NOONES ACCOUNT SAVED SUCCESSFULLY"); 
        //  window.location.reload();
      })
      .catch(error => {
          console.error("Error updating payment data:", error);
          // ... error handling ...
      }); 
    
    });
    
    
    //////////////////////FOR MERCHANT TRADING TABLE name only //////////////////////////
    
 


const tableCName = document.getElementById('claim-tableName').getElementsByTagName('tbody')[0];
const tableDataCName = [];


let paymentsDataCName = []; // Store the fetched payment data
 database.ref('payments').on('value', (snapshot) => {
  tableDataCName.length = 0; // Clear existing data
  paymentsDataCName = [];
  const merTag = document.getElementById('edit-id-mName').value = merchant.id;  
  snapshot.forEach((childSnapshot) => {
    const paymentCName = childSnapshot.val();
    const firebaseKeyC = childSnapshot.key; // Get the Firebase key

    // Filter for payments with status 'new'
    if (paymentCName.status === 'new' && paymentCName.merchantKey == merTag) {
      paymentsDataCName.push({ id: firebaseKeyC, ...paymentCName });
     
      const rowDataC = {
        firebaseKey: firebaseKeyC, // Store the key
        amount: paymentCName.amount,
        refNumber: paymentCName.refNumber,
        paymentType: paymentCName.paymentType,
        time: paymentCName.time,
        date: paymentCName.date,
        user: paymentCName.user,
        merchantP: paymentCName.merchantP,
        status: paymentCName.status
      };

      tableDataCName.push(rowDataC);
      
    }
  });
  
  updatePaymentsTableCName(paymentsDataCName); 
 
 
}); 


function updatePaymentsTableCName(data) {
  tableCName.innerHTML = ''; // Clear the table
  
  data.forEach(( paymentCName, rowIndex) => {
    const row = tableCName.insertRow();
  
    const rowIndexCellC = row.insertCell();
    rowIndexCellC.textContent = rowIndex + 1;
  
    const amountCellC = row.insertCell();
    amountCellC.textContent = paymentCName.amount;
  
  
  });
  
  };    //////////////END OF UPDATEPAYMETSTABLE last for name change only ///////////////// 


     ///////////////// start of trading table calculate for name only //////////////////////////
    
     const paymentsTableEName = document.getElementById('claim-tableName');    ////.getElementsByTagName('tbody')[0];
   
        if (paymentsTableEName) {
          const tableBodyEName = paymentsTableEName.querySelector('tbody');
        
          // Check if the tbody exists
          if(tableBodyEName){
          
           //   const totalAmountSpanEName = document.getElementById('edit-new-payName');
             
            const TananTananName = document.getElementById('mer-general-totalName');
            const editMerchantNameName = document.getElementById('edit-merchant-nameName');
      
              function calculateTotalEName() { 
              
            const nanabilin =    document.getElementById('edit-new-remainName').value =  merchant.remaining;
                itemListC.innerHTML = ""; // Clear existing list
                  let sum = 0;
                  const amountCellsE = tableBodyEName.querySelectorAll('td:nth-child(2)');
                  amountCellsE.forEach(cell => {
                    const amountE = parseFloat(cell.textContent) || 0;
                    sum += amountE;
                  });
 
            
            const maoni = Number(nanabilin) + sum;
            TananTananName.value = "This trader total: " +  maoni.toFixed(2)  ;
                if (maoni >= 1) {
                  editMerchantNameName.setAttribute('readonly', ''); 
                }  
    
                 
                   return sum;
                  };
    
            
              calculateTotalEName(); // Initial calculation
    
            const observerEName = new MutationObserver(calculateTotalEName);
            const configEName = { childList: true, subtree: true };
    
            observerEName.observe(tableBodyEName, configEName);
        } else {
            console.error("Table body (tbody) not found!");
        };
      
        };  
         
        
        
        
        ////////////////// end of trading table calculate /////////////////////
    
        })     /////////////////////////////  // Event listener for EditCell for name //////////////////////////////
             /////////////////////////////  // Event listener for EditCell  for name//////////////////////////////   
              /////////////////////////////  // Event listener for EditCell //////////////////////////////













  });
}; 


//cancel to hide add editform
cancelEditButtonMerchant.addEventListener('click', () => {
  editMerchantForm.style.display = 'none'; 
   location.reload(); // Refresh the page
});
 

cancelEditButtonMerchantName.addEventListener('click', () => {
  editMerchantFormName.style.display = 'none'; 
});




/* document.addEventListener("mousedown", function(event) {
  let modal = document.getElementById('editmerchant');
   
   if (modal && !modal.contains(event.target)) {
     editMerchantForm.style.display = "none";
   }
 });  */
 

 document.addEventListener("mousedown", function(event) {
  let modal = document.getElementById('editmerchantName2');
   
   if (modal && !modal.contains(event.target)) {
     editMerchantFormName.style.display = "none";
   }
 }); 


 document.addEventListener("mousedown", function(event) {
  let modal = document.getElementById('addmerchant');
   
   if (modal && !modal.contains(event.target)) {
    addMerchantForm.style.display = "none";
   }
 }); 






 function openModal(url) {
  document.getElementById("modalFrame").src = "utilities/data/expensestable.html";
  document.getElementById("frameModal").style.display = "block";
}

function closeModal() {
  document.getElementById("frameModal").style.display = "none";
  document.getElementById("modalFrame").src = ""; // Clear iframe src
}

// Close modal if user clicks outside content
 window.onclick = function(event) {
  let modal = document.getElementById("frameModal");
  if (event.target === modal) {
      closeModal();
  }
}; 






/*  document.addEventListener("mousedown", function(event) {
  var sidebar = document.getElementById("sidebar");
            var mainContent = document.getElementById("mainContent");
   
   if (modal && !modal.contains(event.target)) {
     editMerchantFormName.style.display = "none";
   }
 });  */
