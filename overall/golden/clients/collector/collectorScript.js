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
  //  console.log("User is logged in:", user.uid);

    // Fetch user data from Firebase Database
    firebase.database().ref("users/" + user.uid).once("value")
    .then(snapshot => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const email = userData.email;
            const username = email.split("@")[0];
            document.getElementById("usernameDisplay").innerText = "Welcome, " + username;
             document.getElementById("theCollector").value =username;
             // loadSavedPayments2(username); // Pass the username
              loadGoldenClientsByUser(username);
              populateUnpaidMonthDropdown();

             loadClientTable(username);
              loadSavedPayments2(username);
             loadSavedPayments(username);
           
           
            
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
          updates2['/goldenwifi/goldenClients/' + newMerchantKey] = newMerchantAccount;

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



function loadGoldenClientsByUser(username) {
  const tableDataM = [];
  let merchantData = [];

  if (!username) {
    console.error("Username is empty — please check login input.");
    return;
  }

  database.ref('goldenwifi/goldenClients/').on('value', (snapshot) => {
    tableDataM.length = 0;
    merchantData = [];

    snapshot.forEach((childSnapshot) => {
      const merchant = childSnapshot.val();
      const firebaseKeyM = childSnapshot.key;

      if (merchant.status === "new" && merchant.areaCode === username) {
        merchantData.push({ id: firebaseKeyM, ...merchant });

        const rowDataM = {
          firebaseKey: firebaseKeyM,
          email: merchant.address,
          name: merchant.name,
          nameLower: merchant.nameLower,
          remaining: merchant.planAmount
        };

        tableDataM.push(rowDataM);
      }
    });

    updateMerchantTable(merchantData);
    loadSavedPayments(username);

  });
}




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

      const planCell = row.insertCell();
  planCell.textContent = merchant.planAmount;

  const emailCell = row.insertCell();
  emailCell.textContent = merchant.address;

    const conDateCell = row.insertCell();
  conDateCell.textContent = merchant.date;

   const areaCodeCell = row.insertCell();
  areaCodeCell.textContent = merchant.areaCode;

  const noteCell = row.insertCell();
  noteCell.textContent = merchant.note;


  const merchantKey = (merchant.id);


 

      
      const editMerchantNameCell = row.insertCell();
      editMerchantNameCell.innerHTML = `<button class="edit-button-merchantName" data-row-index="${merchant.id}">Edit</button>`;
    
      editMerchantNameCell.addEventListener('click', (event) => {
    
       const button = event.target;
       const firebaseKey = button.dataset.id;
     
          // Populate form fields
          document.getElementById('edit-id-mName').value = merchant.id; 
          document.getElementById('edit-merChantIdName').value = merchant.merchantKey;
          document.getElementById('edit-merchant-nameName').value = merchant.name;
          document.getElementById('contactNum1').value = merchant.contactNum;
          document.getElementById('merchantnote').value = merchant.note;
          document.getElementById('client-address').value = merchant.address;

         
         
          editMerchantFormName.style.display = 'block'; 

    
    ///////////////////// EDIT MERCHANT SAVE BUTTON  ///////////////////////////
    
    // Get the Save button element
    const editMerchantBTNName = document.getElementById('save-edit-merchantName');
    
    editMerchantBTNName.addEventListener('click', () => {
    
     // updateMerchantTable(data,filteredDataM, merchantTotalPayments, merchantNumPayments, payment)
       const editMerchantIDName = document.getElementById('edit-id-mName').value;
       const nameTo = document.getElementById('edit-merchant-nameName').value;
      const editMerchantName2 = {
    
       name: nameTo,
       nameLower: nameTo.toLowerCase(), 
       contactNum: document.getElementById('contactNum1').value,
       note: document.getElementById('merchantnote').value,
      address: document.getElementById('client-address').value,
     };
      database.ref(`goldenwifi/goldenClients/${editMerchantIDName}`).update(editMerchantName2)
      .then(() => {

        Swal.fire({
          title: "Success!",
          text: "CHANGES SAVED SUCCESSFULLY",
          icon: "success",
          timer: 3000, // Closes after 3 seconds
          showConfirmButton: false
        });
       
        editMerchantFormName.style.display = 'none'; 
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

 database.ref('goldenwifi/monthly-bills/').on('value', (snapshot) => {
  tableDataCName.length = 0; // Clear existing data
  paymentsDataCName = [];
  const merTag = document.getElementById('edit-id-mName').value = merchant.id;  
  snapshot.forEach((childSnapshot) => {
    const paymentCName = childSnapshot.val();
    const firebaseKeyC = childSnapshot.key; // Get the Firebase key

    // Filter for payments with status 'new'
    if (paymentCName.actionTo === 'pending' && paymentCName.collector === "rasty") {
      paymentsDataCName.push({ id: firebaseKeyC, ...paymentCName });
     
      const rowDataC = {
        firebaseKey: firebaseKeyC, // Store the key
        amount: paymentCName.planAmount,
        refNumber: paymentCName.actionTo,
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
        })  /// end of edit for collector only///////////////////////////////////
  });
  }


//cancel to hide add editform
 cancelEditButtonMerchant.addEventListener('click', () => {
  editMerchantForm.style.display = "none";
  location.reload(); // Refresh the page
}); 
 

cancelEditButtonMerchantName.addEventListener('click', () => {
  editMerchantFormName.style.display = 'none'; 
});



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



//////////////////////////// ADD MONTHLY BILLS ///////////////////////
//////////////////////////// ADD MONTHLY BILLS ///////////////////////


function addMonthlyBills() {
  const selectedMonth = document.getElementById("billingMonth").value;
  if (!selectedMonth) {
    alert("Please select a billing month.");
    return;
  }

  const [year, month] = selectedMonth.split("-");
  const currentDate = new Date().toISOString().split('T')[0];
  const columnTitle = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' }) + " " + year;
  const monthKey = `${year}-${month}`;

  const table = document.getElementById("merchants-table");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");
  const theUser = document.getElementById("theCollector");

  // Prevent duplicate column header
  const existingHeaders = Array.from(theadRow.children).map(th => th.textContent.trim());
  if (existingHeaders.includes(columnTitle)) {
    alert(`${columnTitle} column already exists.`);
    return;
  }

  let createdCount = 0;
  let pendingClients = rows.length;

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    if (cells.length < 4) {
      pendingClients--;
      return;
    }

    const firebaseKey = cells[1].textContent.trim();  // Client Key
    const clientName = cells[2].textContent.trim();   // Client Name
    const planText = cells[3].textContent.trim();     // ₱500
     const address2 = cells[4].textContent.trim();
      const areaCode2 = cells[6].textContent.trim();
      const note = cells[7].textContent.trim();
    const planAmount = parseFloat(planText.replace(/[₱,]/g, ''));

    if (isNaN(planAmount)) {
      pendingClients--;
      return;
    }

    const path = `goldenwifi/monthly-bills/${firebaseKey}/bills/${monthKey}`;

    // First check if bill already exists
    firebase.database().ref(path).once("value").then(snapshot => {
      if (snapshot.exists()) {
        console.log(`⚠️ Bill already exists for ${clientName} in ${monthKey}`);
      } else {
        // Bill does not exist, create it
        const paymentData = {
          clientKey: firebaseKey,
          name: clientName,
          planAmount: planAmount,
          date: currentDate,
          address2: address2,
          areaCode: areaCode2,
          actionTo: "Collected",
          dateOfPayment: formattedDate,
          collector: "",
          note: note,
          whoGenerate: theUser.value,
          status: "Unpaid"
        };

        firebase.database().ref(path).set(paymentData)
          .then(() => {
            createdCount++;
            console.log(`✅ Bill created for ${clientName} in ${monthKey}`);
          });
      }

      pendingClients--;

      // Once all clients are checked, proceed to update the table
    
        if (pendingClients === 0) {
        if (createdCount === 0) {
          alert(`All bills for ${columnTitle} already exist`);
           location.reload(); // Reload to show updated columns
        } else {
          alert(`${createdCount} bill(s) successfully created for ${columnTitle}.`);
          location.reload(); // Reload to show updated columns
          
        }
        }

          /*  loadSavedPayments();
    loadSavedPayments2();
    populateUnpaidMonthDropdown();
    calculateUnpaidGrandTotalForYear(); */


           loadClientTable();
           
    });


  });
 
}





//////////////////////// load client table here //////////////////////
//////////////////////// load client table here //////////////////////



let allClientsData = {}; // Global variable to store full data

function loadClientTable(username, searchTerm = "") {
  const tableBody = document.querySelector("#merchants-table2 tbody");
  tableBody.innerHTML = "";

  const monthlyBillsRef = firebase.database().ref("goldenwifi/monthly-bills");
  const goldenClientsRef = firebase.database().ref("goldenwifi/goldenClients");

  Promise.all([
    monthlyBillsRef.once("value"),
    goldenClientsRef.once("value")
  ]).then(([billsSnapshot, clientsSnapshot]) => {
    const billsData = billsSnapshot.val();
    const notesData = clientsSnapshot.val();
    if (!billsData) {
      console.warn("No bills data found");
      return;
    }

 // ✅ Load payment status table with filtered areaCode
    loadSavedPayments2(username, billsData); // ✅ Pass both args!
    

    allClientsData = billsData; // Store globally for possible reuse

    let index = 1;

    Object.entries(billsData).forEach(([clientKey, clientData]) => {
      const bills = clientData.bills || {};
      const unpaidBills = Object.entries(bills)
        .filter(([_, bill]) => bill.status === "Unpaid")
        .sort(([aKey], [bKey]) => bKey.localeCompare(aKey)); // Sort latest first

      const unpaidCount = unpaidBills.length;
      if (unpaidCount === 0) return;

      const [latestMonthKey, latestUnpaidBill] = unpaidBills[0];
      const clientAreaCode = latestUnpaidBill.areaCode || "";

      if (clientAreaCode !== username) return; // ✅ Filter by logged-in user

      const clientName = latestUnpaidBill.name || "";
      const clientAddress = latestUnpaidBill.address2 || "";

      // Optional search filter
      const normalizedSearch = searchTerm.toLowerCase();
      if (
        !clientName.toLowerCase().includes(normalizedSearch) &&
        !clientAddress.toLowerCase().includes(normalizedSearch)
      ) {
        return;
      }

       const name = notesData?.[clientKey]?.name;
      const noteData = notesData?.[clientKey]?.note || "";
      const displayNote = noteData !== "" 

     
     
        ? noteData 
        : '<span title="Add Reminder">📝</span>';

      const row = document.createElement("tr");
      if (unpaidCount >= 2) {
        row.classList.add("highlight-unpaid");
      }

      row.innerHTML = `
        <td>${index++}</td>
        <td class="hidden-col">${clientKey}</td>
        <td>${name}</td>
        <td>₱${parseFloat(latestUnpaidBill.planAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td>${clientAddress}</td>
        <td>${clientAreaCode}</td>
        <td onclick="addReminder('${clientKey}')" style="cursor: pointer;">${displayNote}</td>
        <td><span class="status-label">${unpaidCount >= 2 ? `⚠ Overdue (${unpaidCount})` : "Unpaid"}</span></td>
      `;
      tableBody.appendChild(row);
    });

    // ✅ After rows are ready, now add dynamic month columns with buttons
    loadSavedPayments2(username, billsData);

    // Optional: other logic
    loadSavedPayments(); // if it's doing totals, or other info
    populateUnpaidMonthDropdown();
    calculateUnpaidGrandTotalForYear();
  });
}


document.getElementById("merchant-search").addEventListener("input", function () {
  const searchValue = this.value.trim();
  loadClientTable(searchValue);
})




/////////////////////// LOAD SAVE ////////////////

function loadSavedPayments2(username, billsData) {
  const table = document.getElementById("merchants-table2");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");

  // ✅ Safety check to avoid runtime errors
  if (!billsData || typeof billsData !== "object") {
    console.warn("⛔ loadSavedPayments2 was called without valid billsData");
    return;
  }

  const monthMap = {};       // monthKey -> Display Month
  const clientBills = {};    // clientKey -> { monthKey -> actionTo }

  // ✅ Build list of relevant client bills by username (areaCode)
  Object.entries(billsData).forEach(([clientKey, clientData]) => {
    const bills = clientData.bills || {};
    const anyMonth = Object.values(bills)[0];

    const clientAreaCode = anyMonth?.areaCode || "";
    if (clientAreaCode !== username) return;  // 🔒 Filter by areaCode

    Object.entries(bills).forEach(([monthKey, bill]) => {
      const [year, month] = monthKey.split("-");
      const displayMonth = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' });

      monthMap[monthKey] = displayMonth;

      if (!clientBills[clientKey]) clientBills[clientKey] = {};
      clientBills[clientKey][monthKey] = bill.actionTo || "Collected";
    });
  });

  // ✅ Add dynamic month columns to the table header
  const existingHeaders = Array.from(theadRow.children).map(th => th.textContent.trim());
  const sortedMonthKeys = Object.keys(monthMap).sort();

  sortedMonthKeys.forEach(monthKey => {
    const displayTitle = monthMap[monthKey];
    if (!existingHeaders.includes(displayTitle)) {
      const newTh = document.createElement("th");
      newTh.textContent = displayTitle;
      theadRow.appendChild(newTh);
    }
  });

  // ✅ Fill in buttons row by row, only for matching clients
  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    if (cells.length < 2) return;

    const clientKey = cells[1]?.textContent.trim();
    if (!clientBills[clientKey]) return;

    sortedMonthKeys.forEach(monthKey => {
      const actionTo = clientBills[clientKey]?.[monthKey] || "Collected";
      const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

      const td = document.createElement("td");
      const button2 = document.createElement("button");

      button2.textContent =
        actionTo === "approved" ? "🔒 Approved" :
        actionTo === "pending"  ? "⏳ Pending" :
                                  "✔ Collected";

      button2.style.cssText = `
        font-size: 12px;
        color: ${actionTo === "approved" || actionTo === "pending" ? "white" : "black"};
        padding: 4px 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
        background-color: ${actionTo === "approved" ? "green" : actionTo === "pending" ? "orange" : "#f0f0f0"};
        width: 65px;
        cursor: ${actionTo === "approved" ? "not-allowed" : "pointer"};
      `;

      button2.disabled = actionTo === "approved";

      // ✅ Add behavior only if not approved (still clickable)
      if (!button2.disabled) {
        button2.addEventListener("click", () => {
          const confirmPaid = confirm("Confirm collection?");
          if (!confirmPaid) return;

          const newStatus = actionTo === "Collected" ? "pending" : "Collected";

          firebase.database().ref(path).update({
            actionTo: newStatus,
            collector: username
          }).then(() => location.reload());
        });
      }

      td.appendChild(button2);
      row.appendChild(td);
    });

   
  });

  // ✅ Update footer column span
  const footerCell = document.getElementById("table-totalM");
  if (footerCell) footerCell.colSpan = theadRow.children.length;
}



function loadSavedPayments(username) {
  const table = document.getElementById("merchants-table");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    const monthMap = {};       // monthKey -> displayMonth
    const clientBills = {};    // clientKey -> { monthKey -> status }

    // 1. Collect bills filtered by areaCode
    Object.entries(clients).forEach(([clientKey, clientData]) => {
      const bills = clientData.bills || {};
      const billValues = Object.values(bills);
      if (billValues.length === 0) return;

      const areaCode = billValues[0].areaCode || "";
      if (areaCode !== username) return; // 🔒 Filter by logged-in areaCode

      Object.entries(bills).forEach(([monthKey, bill]) => {
        const [year, month] = monthKey.split("-");
        const displayMonth = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' });

        monthMap[monthKey] = displayMonth;

        if (!clientBills[clientKey]) clientBills[clientKey] = {};
        clientBills[clientKey][monthKey] = bill.status || "Unpaid";
      });
    });

    const existingHeaders = Array.from(theadRow.children).map(th => th.textContent.trim());
    const sortedMonthKeys = Object.keys(monthMap).sort();

    // 2. Add headers for new months
    sortedMonthKeys.forEach(monthKey => {
      const displayTitle = monthMap[monthKey];
      if (!existingHeaders.includes(displayTitle)) {
        const newTh = document.createElement("th");
        newTh.textContent = displayTitle;
        theadRow.appendChild(newTh);
      }
    });

    // 3. Add buttons to each row (filtered by areaCode)
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 2) return;

      const clientKey = cells[1]?.textContent.trim();
      if (!clientBills[clientKey]) return; // ❌ skip if client is not in areaCode

      sortedMonthKeys.forEach(monthKey => {
        const status = clientBills[clientKey]?.[monthKey] || "Unpaid";
        const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

        const td = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = status;
        const isPending = status === "pending";
        button.style.backgroundColor = isPending ? "orange" : "";
        button.style.color = isPending ? "white" : "";
         const isPaid = status === "Paid";
        button.style.backgroundColor = isPaid ? "green" : "";

/*         button.addEventListener("click", () => {
           const newStatus = (button.textContent === "pending") ? "Unpaid" : "pending";
          button.textContent = newStatus;
          button.style.backgroundColor = newStatus === "pending" ? "orange" : "";
          button.style.color = newStatus === "pending" ? "white" : "";
           button.style.backgroundColor = newStatus === "Paid" ? "green" : "";
          button.style.color = newStatus === "Paid" ? "white" : "";

          firebase.database().ref(path).update({ status: newStatus }); 
        });
 */
        td.appendChild(button);
        row.appendChild(td);
      });
    });

    // 4. Adjust footer colspan
    const footerCell = document.getElementById("table-totalM");
    if (footerCell) footerCell.colSpan = theadRow.children.length;
  });
}



function calculateTotalPlanAmount() {
  const tableBody = document.querySelector("#merchants-table2 tbody");
  const selectedMonth = document.getElementById("monthFilter").value;
  let total = 0;

  // Loop through all rows
  tableBody.querySelectorAll("tr").forEach(row => {
    const planCell = row.children[3]; // ₱amount
    const dateCell = row.children[5]; // Date column (with format YYYY-MM-DD or YYYY-MM)

    if (!planCell || !dateCell) return;

    const dateText = dateCell.textContent.trim();
    const [year, month] = dateText.split("-"); // Extract from "YYYY-MM" or "YYYY-MM-DD"
    const rowMonthKey = `${year}-${month}`;

    // Skip row if it doesn't match selected month (if any)
    if (selectedMonth && rowMonthKey !== selectedMonth) return;

    const amountText = planCell.textContent.trim().replace(/[₱,]/g, '');
    const amount = parseFloat(amountText);

    if (!isNaN(amount)) {
      total += amount;
    }
  });

  // Update footer cell
  const footerCell = document.getElementById("table-totalM2");
  if (footerCell) {
    const label = selectedMonth
      ? new Date(selectedMonth + "-01").toLocaleString('default', { month: 'short', year: 'numeric' })
      : "All";

    footerCell.textContent = `Total (${label}): ₱${total.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
}



// This should already exist if you're using Firebase Auth
const currentUser = firebase.auth().currentUser;

// Utility: remove "@gmail.com" or any domain from email
function getCollectorID(email) {
  return email ? email.split("@")[0].toLowerCase() : null;
}

function populateUnpaidMonthDropdown() {
  const dropdown = document.getElementById("unpaidMonthSelect");

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    const monthSet = new Set();

    Object.values(clients).forEach(client => {
      if (!client.bills) return;

      Object.keys(client.bills).forEach(monthKey => {
        monthSet.add(monthKey); // Format: "YYYY-MM"
      });
    });

    const sortedMonths = Array.from(monthSet).sort(); // Ascending

    dropdown.innerHTML = ""; // Clear existing

    sortedMonths.forEach(monthKey => {
      const option = document.createElement("option");
      option.value = monthKey;
      option.textContent = new Date(monthKey + "-01").toLocaleString('default', {
        month: 'short', year: 'numeric'
      });
      dropdown.appendChild(option);
    });

    // 🟡 Set default to current month
    const now = new Date();
    const currentMonthKey = now.toISOString().slice(0, 7); // "YYYY-MM"

    if (sortedMonths.includes(currentMonthKey)) {
      dropdown.value = currentMonthKey;
    } else if (sortedMonths.length > 0) {
      dropdown.selectedIndex = sortedMonths.length - 1; // last available month
    }

    // Trigger initial calculation
    calculateUnpaidForSelectedMonth2();
  });
}




function calculateUnpaidTotalsPerMonth() {
  const totalsPerMonth = {}; // { "2025-07": 1950, ... }

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    Object.entries(clients).forEach(([clientKey, clientData]) => {
      if (!clientData.bills) return;

      Object.entries(clientData.bills).forEach(([monthKey, bill]) => {
        const status = bill.status || "Unpaid";
        const amount = parseFloat(bill.planAmount || 0);

        if (status === "Unpaid") {
          if (!totalsPerMonth[monthKey]) totalsPerMonth[monthKey] = 0;
          totalsPerMonth[monthKey] += amount;
        }
      });
    });

    // ✅ Display result (console or HTML)
    displayUnpaidTotals(totalsPerMonth);
  });
}




function displayUnpaidTotals(totalsPerMonth) {
  const container = document.getElementById("unpaid-monthly-summary");
  container.innerHTML = ""; // Clear old content

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr><th>Month</th><th>Total Unpaid</th></tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  // Sort months chronologically
  Object.keys(totalsPerMonth).sort().forEach(monthKey => {
    const amount = totalsPerMonth[monthKey];
    const readableMonth = new Date(monthKey + "-01").toLocaleString('default', {
      month: 'short',
      year: 'numeric'
    });

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${readableMonth}</td>
      <td>₱${amount.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</td>
    `;
    tbody.appendChild(row);
  });

  container.appendChild(table);
}



function calculateUnpaidForSelectedMonth2() {
  const selectedMonth = document.getElementById("unpaidMonthSelect").value;
  const currentUser = firebase.auth().currentUser;

  if (!currentUser) {
    console.error("No logged in user.");
    return;
  }

  const userName = currentUser.email.split("@")[0].toLowerCase();
  let totalUnpaid = 0;



  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    Object.values(clients).forEach(client => {
      if (!client.bills || !client.bills[selectedMonth]) return;

      const bill = client.bills[selectedMonth];


 Object.entries(client.bills).forEach(([monthKey, bill]) => {
        const status = bill.status || "Unpaid";
        const amount = parseFloat(bill.planAmount || 0);
        const areaCode1 = (bill.areaCode || userName);

        if (monthKey === selectedMonth && status === "Unpaid" && userName === areaCode1 ) {
          totalUnpaid += amount;
        }
      });

    });

    // 🟢 Display result
    const resultBox = document.getElementById("unpaidTotalResult");
    const displayMonth = new Date(selectedMonth + "-01").toLocaleString('default', {
      month: 'short', year: 'numeric'
    });

    resultBox.textContent = `Total Unpaid for ${displayMonth}: ₱${totalUnpaid.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`


    /* // ✅ Display total unpaid
    document.getElementById("unpaidTotalDisplay").textContent =
      `₱ ${totalUnpaid.toFixed(2)}`; */
  });
}






function calculateUnpaidGrandTotalForYear(year = new Date().getFullYear()) {
  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    let grandTotal = 0;

    Object.values(clients).forEach(client => {
      if (!client.bills) return;

      Object.entries(client.bills).forEach(([monthKey, bill]) => {
        if (!monthKey.startsWith(year.toString())) return;

        const status = bill.status || "Unpaid";
        const amount = parseFloat(bill.planAmount || 0);

        if (status === "Unpaid") {
          grandTotal += amount;
        }
      });
    });

    displayGrandTotalOnly(grandTotal, year);
  });
}




function displayGrandTotalOnly(grandTotal, year) {
  const container = document.getElementById("unpaid-year-summary");
  container.innerHTML = `
  
    <div style="font-size: 15px;">
    Total Unpaid for ${year}:
      ₱${grandTotal.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </div>
  `;
}




function addReminder(clientKey) {
  const note = prompt("Enter a reminder note:");
  if (note !== null) {
    firebase.database().ref(`goldenwifi/goldenClients/${clientKey}`).update({
      note: note
    }).then(() => {
     // alert("Reminder saved!");
      loadClientTable(); // Reload table to update note
       window.location.reload();

    });
  }
}


/*  function toggleTable() {
  const tableDiv = document.getElementById("tableContainer");
  const btn = document.getElementById("toggleBtn");

  tableDiv.classList.toggle("show");

  if (tableDiv.classList.contains("show")) {
    btn.textContent = "Hide Table";
  } else {
    btn.textContent = "Show Table";
  }
} 



 function toggleTable2() {
  const tableDiv = document.getElementById("tableContainer2");
  const btn = document.getElementById("toggleBtn");

  tableDiv.classList.toggle("show");

  if (tableDiv.classList.contains("show")) {
    btn.textContent = "Show All Active Clients";
  } else {
    btn.textContent = "Hide All Active Clients";
  }
} 
 */

  
















