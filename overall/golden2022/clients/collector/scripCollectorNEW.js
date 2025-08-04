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
            const email = userData.email;
            const username = email.split("@")[0];
            document.getElementById("usernameDisplay").innerText = "Welcome, " + username;
            document.getElementById("theCollector").value =username;
            
              loadGoldenClientsByUser(username);
               populateUnpaidMonthDropdown();
             //  loadGoldenClientsByUser(username);

             


             loadClientTable(username);
               loadSavedPayments2(username); // Pass the username
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




/* const addMerchantForm = document.getElementById("add-merchant-form"); */
const newMerchantNameInput = document.getElementById("new-merchant-name");
const newMerchantEmailInput = document.getElementById("new-merchant-email");
const newMerchantAddressInput = document.getElementById("new-merchant-address");
//const cancelAddMerchantBtn = document.getElementById("cancel-add-merchant");
/* const merchantStatusInput = document.getElementById("new-merchant-total"); */
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
const cancelEditMerchant3 = document.getElementById('cancel-edit-merchant3');

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
  const merchantSearchInputEdit = document.getElementById('merchant-searchEdit');
  const merchantSearchInput6= document.getElementById('merchant-search6');

  const tableMerchant = document.getElementById('merchants-table').getElementsByTagName('tbody')[0];
  const editMerchantForm = document.getElementById('edit-merchant-form'); // Get your form element
   const editMerchantForm3 = document.getElementById('edit-merchant-form3'); // Get your form element
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



  
let merchantData = []; // ✅ Declare merchantData globally
let timeoutId;



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
     const username3 = document.getElementById("theCollector").value;
    //  console.log("the user issss: " ,username);
     

      if (merchant.status === "new" && merchant.areaCode === username3) {
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
    updateMerchantTable3(merchantData);
  

  });
}







 window.onload = function () {
    const username5 = document.getElementById("theCollector");
    if (username5.value === "rasty") {
      document.getElementById("addTransactionItem").style.display = "list-item";
    } else {
      document.getElementById("addTransactionItem").style.display = "none";
    }
  };











// Load merchant data from Firebase first
 firebase.database().ref("goldenwifi/goldenClients/").once("value").then(snapshot => {
  const data = snapshot.val();
  
  // Convert from object to array (if needed)
  merchantData = Object.values(data || {});
  
}); 





function handleMerchantSearchInput() {
  const searchTerm = document.getElementById("merchantSearchBox").value.trim().toLowerCase();

  const table = document.getElementById("merchants-table");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    let matchFound = false;

    // Check each cell for the search term
    cells.forEach((cell) => {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        matchFound = true;
      }
    });

    // Show or hide row based on match
    row.style.display = matchFound ? "" : "none";
  });
}



function handleMerchantSearchInput3() {
  const searchTerm = document.getElementById("merchantSearchBox3").value.trim().toLowerCase();

  const table = document.getElementById("merchants-table3");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    let matchFound = false;

    // Check each cell for the search term
    cells.forEach((cell) => {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        matchFound = true;
      }
    });

    // Show or hide row based on match
    row.style.display = matchFound ? "" : "none";
  });
 
}







  /////////////// ORIGINAL UPDATEMERCHANT TABLE ORIGINAL ////////////

function updateMerchantTable(data, username, searchTerm = "") {
  const tableBody = document.querySelector("#merchants-table tbody");
  tableBody.innerHTML = ''; // Clear the table

 let index = 1;
  const normalizedSearch = searchTerm.toLowerCase();

  data.forEach((merchant, rowIndex) => {

   const name = merchant.name?.toLowerCase() || "";
    const address = merchant.address?.toLowerCase() || "";
    //const id = merchant.id?.toLowerCase() || "";
    const areaCode = merchant.areaCode?.toLowerCase() || "";

    // ✅ Filter by search term in name, address, id, or areaCode
    if (
      !name.includes(normalizedSearch) &&
      !address.includes(normalizedSearch) &&
     
      !areaCode.includes(normalizedSearch)
    ) {
      return; // Skip if no match
    }

  const row = tableBody.insertRow();
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

  const editMerchantCell = row.insertCell();
  editMerchantCell.innerHTML = `<button id="editClientF" class="edit-button-merchant" data-row-index="${merchant.id}">Edit</button>`;

  editMerchantCell.addEventListener('click', (event) => {

const button2 =  document.getElementById('editClientF');
button2.textContent = "Edit";
button2.className = "edit-button-merchant";
button2.dataset.clientId = merchant.id; // 👈 set data attribute


  const firebaseKey = button2.dataset.clientId; // ✅ Correct way

  document.getElementById('edit-merChantId').value = firebaseKey;
  document.getElementById('edit-merchant-name').value = merchant.name || "";
  document.getElementById('contactNum2').value = merchant.contactNum || "";
  document.getElementById('note').value = merchant.note || "";
  document.getElementById('status').value = merchant.status || "";
  document.getElementById('planAmount').value = merchant.planAmount || "";
  document.getElementById('client-address1').value = merchant.address || "";

  // Show the form/modal
  editMerchantForm.style.display = 'block';
    })   
    


///////////////////// EDIT MERCHANT SAVE BUTTON  ///////////////////////////

// Get the Save button element
const EditSubmit = document.getElementById('save-edit-merchant');

EditSubmit.addEventListener('click', () => {
 // const clientId = merchant.id;
// console.log("mao ni id :", clientId);

 // updateMerchantTable(data,filteredDataM, merchantTotalPayments, merchantNumPayments, payment)
   const editMerchantIDName = document.getElementById('edit-merChantId').value;
    const nameTo = document.getElementById('edit-merchant-name').value;
  


  const editClientData = {
       name: nameTo,
       nameLower: nameTo.toLowerCase(), 
       contactNum: document.getElementById('contactNum2').value,
       note: document.getElementById('note').value,
       planAmount:  document.getElementById('planAmount').value, 
        status:  document.getElementById('status').value,
      address: document.getElementById('client-address1').value,
      
 };
   /*  database.ref(path).update({ planAmount: planAmount2 }) */
   database.ref(`goldenwifi/goldenClients/${editMerchantIDName}`).update(editClientData)
  .then(() => {



     Swal.fire({
      title: "Success!",
      text: "CHANGES SAVED SUCCESSFULLY",
      icon: "success",
      timer: 2000, // Closes after 3 seconds
      showConfirmButton: false 
    });
   
    editMerchantForm.style.display = 'none'; 

    loadSavedPayments();
//console.log("mao ni details :" , username);

  })
  .catch(error => {
      console.error("Error updating payment data:", error);
      // ... error handling ...
  }); 

});
  });

}; 





  /////////////// ORIGINAL UPDATEMERCHANT TABLE 33333333   ////////////

 function updateMerchantTable3(data, username, searchTerm = "") {
  const tableBody = document.querySelector("#merchants-table3 tbody");
  tableBody.innerHTML = ''; // Clear the table

 let index = 1;
  const normalizedSearch = searchTerm.toLowerCase();

  data.forEach((merchant, rowIndex) => {

   const name = merchant.name?.toLowerCase() || "";
    const address = merchant.address?.toLowerCase() || "";
    //const id = merchant.id?.toLowerCase() || "";
    const areaCode = merchant.areaCode?.toLowerCase() || "";

    // ✅ Filter by search term in name, address, id, or areaCode
    if (
      !name.includes(normalizedSearch) &&
      !address.includes(normalizedSearch) &&
     
      !areaCode.includes(normalizedSearch)
    ) {
      return; // Skip if no match
    }

  const row = tableBody.insertRow();

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

  const editMerchantCell3 = row.insertCell();
  editMerchantCell3.innerHTML = `<button id="editClientF3" class="edit-button-merchant" data-row-index="${merchant.id}">Edit</button>`;

  editMerchantCell3.addEventListener('click', (event) => {

const button3 =  document.getElementById('editClientF3');
button3.textContent = "Edit";
button3.className = "edit-button-merchant3";
button3.dataset.clientId = merchant.id; // 👈 set data attribute


  const firebaseKey = button3.dataset.clientId; // ✅ Correct way

  document.getElementById('edit-merChantId3').value = firebaseKey;
  document.getElementById('edit-merchant-name3').value = merchant.name || "";
 /*  document.getElementById('contactNum23').value = merchant.contactNum || ""; */
  document.getElementById('note3').value = merchant.note || "";
  document.getElementById('status3').value = merchant.status || "";
  document.getElementById('planAmount3').value = merchant.planAmount || "";
  document.getElementById('client-address3').value = merchant.address || "";

  // Show the form/modal
  editMerchantForm3.style.display = 'block';
    })   
    


///////////////////// EDIT MERCHANT SAVE BUTTON 3333  ///////////////////////////

// Get the Save button element
const EditSubmit3 = document.getElementById('save-edit-merchant3');

EditSubmit3.addEventListener('click', () => {
 // const clientId = merchant.id;
// console.log("mao ni id :", clientId);

 // updateMerchantTable(data,filteredDataM, merchantTotalPayments, merchantNumPayments, payment)
   const editMerchantIDName3= document.getElementById('edit-merChantId3').value;
    const nameTo = document.getElementById('edit-merchant-name3').value;
  


  const editClientData3 = {
       name: nameTo,
       nameLower: nameTo.toLowerCase(), 
       contactNum: document.getElementById('contactNum3').value,
       note: document.getElementById('note3').value,
       planAmount:  document.getElementById('planAmount3').value, 
        status:  document.getElementById('status3').value,
      address: document.getElementById('client-address3').value,
      
 };
   /*  database.ref(path).update({ planAmount: planAmount2 }) */
   database.ref(`goldenwifi/goldenClients/${editMerchantIDName3}`).update(editClientData3)
  .then(() => {

   

     Swal.fire({
      title: "Success!",
      text: "CHANGES SAVED SUCCESSFULLY",
      icon: "success",
      timer: 2000, // Closes after 3 seconds
      showConfirmButton: false 
    });
   
    editMerchantForm3.style.display = 'none'; 
   

    loadSavedPayments3();
//console.log("mao ni details :" ,editMerchantIDName);

  })
  .catch(error => {
      console.error("Error updating payment data:", error);
      // ... error handling ...
  }); 

});
  });
  
}; 










function closeEditDisconnected() {
  
  document.getElementById("edit-merchant-form3").style.display = "none";
   const username = document.getElementById("theCollector").value;
  loadSavedPayments3(username);
//location.reload();
} 



function toggleDivs(button) {
  const ids = [ "unpaid-month-div", "unpaidTotalResult"];
  const isAnyVisible = ids.some(id => document.getElementById(id).style.display === "block");

  ids.forEach(id => {
    const el = document.getElementById(id);
    el.style.display = isAnyVisible ? "none" : "block";
  });

  button.innerHTML = isAnyVisible ? "SHOW MORE OPTIONS" : "HIDE OPTIONS";
}









function toggleTableModal3() {
  document.getElementById("tableModal3").style.display = "block";
  const username = document.getElementById("theCollector").value;
 // loadClientTable(username);
 loadSavedPayments3();

 //console.log("ang nag gamit:" , username);
}






function toggleTableModal1() {
  const modal111 = document.getElementById("tableModal1");
  const button111 = document.getElementById("toggleBtn");
 const username = document.getElementById("theCollector").value;
  if (modal111.style.display === "block") {
    modal.style.display = "none";
    button111.innerHTML = "📊<br><small>Show Clients</small>";
 location.reload();

  } else {
    modal111.style.display = "block";
    button111.innerHTML = "📊<br><small>Hide Clients</small>";
 //location.reload();

loadClientTable(username);
loadSavedPayments();

  }
}






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
          alert(`${createdCount} bill(s) successfully created for each active clients fot the month of  ${columnTitle}.`);
          location.reload(); // Reload to show updated columns
          
        }
        }

           /*  loadSavedPayments();
            loadSavedPayments2();
            populateUnpaidMonthDropdown();
            calculateUnpaidGrandTotalForYear();  */


           loadClientTable();
           
    });


  });
 
}




//////////////////////// load client table here //////////////////////

//let editMerchantIDName = {};

let allClientsData = {}; // Global variable to store full data
let allClientsTable = {}; // Global variable to store full data


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


   
  

    allClientsData = billsData; // Store globally for possible reuse
   allClientsTable = Object.entries(notesData || {}).map(([id, data]) => ({
  id,
  ...data
}));


 // ✅ Load payment status table with filtered areaCode
    loadSavedPayments2(username, billsData); // ✅ Pass both args!
     loadSavedPayments(username, notesData); // ✅ Pass both args!
    loadSavedPayments3(username, notesData); // ✅ Pass both args!
  




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
      const clientAddress1 = latestUnpaidBill.address2 || "";
      const clientACode = latestUnpaidBill.areaCode || "";
      
       const clientNote = latestUnpaidBill.note || "";


      // Optional search filter
      const normalizedSearch = searchTerm.toLowerCase();

    
       if (
        !clientName.toLowerCase().includes(normalizedSearch) &&
        !clientAddress1.toLowerCase().includes(normalizedSearch)&&
         !clientACode.toLowerCase().includes(normalizedSearch)&&
         !clientNote.toLowerCase().includes(normalizedSearch)
      ) {
        return;
      } 

       const name = notesData?.[clientKey]?.name;
      const noteData = notesData?.[clientKey]?.note || "";
       const clientAddress = notesData?.[clientKey]?.address || "";
       const status = notesData?.[clientKey]?.status || "";

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
         <td>${status}</td>
        <td><span class="status-label">${unpaidCount >= 2 ? `⚠ Overdue (${unpaidCount})` : "Unpaid"}</span></td>
      `;
      tableBody.appendChild(row);
    });

    // ✅ After rows are ready, now add dynamic month columns with buttons
    loadSavedPayments2(username, billsData);
     
  // loadSavedPayments();

  //   populateUnpaidMonthDropdown();
   // calculateUnpaidGrandTotalForYear();

    populateUnpaidMonthDropdown();
    calculateUnpaidGrandTotalForYear();
  });
}







  document.getElementById("merchant-search6").addEventListener("input", function () {
     const searchTerm = this.value.trim();

  const table = document.getElementById("merchants-table2");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    let matchFound = false;

    // Check each cell for the search term
    cells.forEach((cell) => {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        matchFound = true;
      }
    });

    // Show or hide row based on match
    row.style.display = matchFound ? "" : "none";
  });
});

 





/////////////////////// LOAD SAVE ////////////////

function loadSavedPayments2(username ) {
  const table = document.getElementById("merchants-table2");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    const monthMap = {};
    const clientBills = {};

    Object.entries(clients).forEach(([clientKey, clientData]) => {
      if (!clientData.bills) return;

      Object.entries(clientData.bills).forEach(([monthKey, bill]) => {
        const [year, month] = monthKey.split("-");
        const displayMonth = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' });

        monthMap[monthKey] = displayMonth;

        if (!clientBills[clientKey]) clientBills[clientKey] = {};
        clientBills[clientKey][monthKey] = bill.actionTo || "Collected";
      });
    });

    const sortedMonthKeys = Object.keys(monthMap).sort();
    const existingHeaders = Array.from(theadRow.children).map(th => th.textContent.trim());

    sortedMonthKeys.forEach(monthKey => {
      const displayTitle = monthMap[monthKey];
      if (!existingHeaders.includes(displayTitle)) {
        const th = document.createElement("th");
        th.textContent = displayTitle;
        theadRow.appendChild(th);
      }
    });

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 2) return;

      const clientKey = cells[1]?.textContent.trim();
      if (!clientBills[clientKey]) return;

      const bills = clientBills[clientKey] || {};

      sortedMonthKeys.forEach(monthKey => {
        const td = document.createElement("td");

        if (bills[monthKey]) {
          const actionTo = bills[monthKey];
          const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

          const button2 = document.createElement("button");

          // ✅ Use correct display text
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

          if (!button2.disabled) {
            button2.addEventListener("click", () => {
              const confirmPaid = confirm("Confirm collection?");
              if (!confirmPaid) return;

              const newStatus = actionTo === "Collected" ? "pending" : "Collected";

              firebase.database().ref(path).update({
                actionTo: newStatus,
                collector: username
              }).then(() => {
                location.reload();
              });
            });
          }

          td.appendChild(button2);
        }

        row.appendChild(td);
      });
    });

    const footerCell = document.getElementById("table-totalM2");
    if (footerCell) footerCell.colSpan = theadRow.children.length;
  });
   sortTableByClientName2();
}








function loadSavedPayments(username) {
  const table = document.getElementById("merchants-table");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    const monthMap = {};
    const clientBills = {};
    const unpaidCounts = {};

    Object.entries(clients).forEach(([clientKey, clientData]) => {
      const bills = clientData.bills || {};
      if (Object.keys(bills).length === 0) return;

      clientBills[clientKey] = {};
      unpaidCounts[clientKey] = 0;

      Object.entries(bills).forEach(([monthKey, bill]) => {
        const [year, month] = monthKey.split("-");
        const displayMonth = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' });

        monthMap[monthKey] = displayMonth;

        const status = bill.status || "Unpaid";
        clientBills[clientKey][monthKey] = status;

        if (status === "Unpaid") {
          unpaidCounts[clientKey]++;
        }
      });
    });

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

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 2) return;

      const clientKey = cells[1]?.textContent.trim();
      if (!clientBills[clientKey]) return;

      const currentCellCount = row.children.length;
      if (currentCellCount >= theadRow.children.length) return;

      const existingCellLabels = Array.from(row.querySelectorAll("td")).map(td => td.textContent.trim());

      sortedMonthKeys.forEach(monthKey => {
        const displayMonth = monthMap[monthKey];

        if (!clientBills[clientKey][monthKey]) return;

        if (existingCellLabels.includes(displayMonth) || row.querySelector(`[data-month="${monthKey}"]`)) {
          return;
        }

        const status = clientBills[clientKey][monthKey];
        const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;
        const actionTo = clients[clientKey]?.bills?.[monthKey]?.actionTo || "Collected";

        const td = document.createElement("td");
        td.setAttribute("data-month", monthKey);

        const button11 = document.createElement("button");

        button11.textContent =
          actionTo === "approved" ? "🔒 Approved" :
          actionTo === "pending" ? "⏳ Pending" :
          "✔ Collected";

        button11.style.cssText = `
          font-size: 12px;
          color: ${actionTo === "approved" || actionTo === "pending" ? "white" : "black"};
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background-color: ${actionTo === "approved" ? "green" : actionTo === "pending" ? "orange" : "#f0f0f0"};
          width: 65px;
        
          cursor: ${actionTo === "approved" ? "not-allowed" : "pointer"};
        `;

        button11.disabled = actionTo === "approved";

        if (!button11.disabled) {
/*           button11.addEventListener("click", () => {
            const confirmPaid = confirm("Confirm collection?");
            if (!confirmPaid) return;

            const newStatus = actionTo === "Collected" ? "pending" : "Collected";

            firebase.database().ref(path).update({
              actionTo: newStatus,
              collector: username
            }).then(() => {
              // Reload table after updating Firebase
        loadSavedPayments(username);
            });
          }); */
        }

        td.appendChild(button11);
        row.appendChild(td);
      });
    });

    const footerCell = document.getElementById("table-totalM");
    if (footerCell) footerCell.colSpan = theadRow.children.length;
  });
   sortTableByClientName();
}

















function loadSavedPayments3(username) {
  const table = document.getElementById("merchants-table3");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    const monthMap = {};       // monthKey -> displayMonth
    const clientBills = {};    // clientKey -> { monthKey -> status }
    const unpaidCounts = {};   // clientKey -> number of unpaid bills

    // 1. Collect bills and count unpaid
    Object.entries(clients).forEach(([clientKey, clientData]) => {
      const bills = clientData.bills || {};
      if (Object.keys(bills).length === 0) return;

      clientBills[clientKey] = {};
      unpaidCounts[clientKey] = 0;

      Object.entries(bills).forEach(([monthKey, bill]) => {
        const [year, month] = monthKey.split("-");
        const displayMonth = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' });

        monthMap[monthKey] = displayMonth;

        const status = bill.status || "Unpaid";
        clientBills[clientKey][monthKey] = status;

        if (status === "Unpaid") {
          unpaidCounts[clientKey]++;
        }
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

    // 3. Filter clients with exactly 2 unpaid bills and render buttons
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 2) return;

      const clientKey = cells[1]?.textContent.trim();
      if (!clientBills[clientKey]) return;

      // ✅ Only include clients with exactly 2 unpaid bills
      if (unpaidCounts[clientKey] < 2) {
        row.style.display = "none"; // hide the row
        return;
      }

      const currentCellCount = row.children.length;
      if (currentCellCount >= theadRow.children.length) return;

      const existingCellLabels = Array.from(row.querySelectorAll("td")).map(td => td.textContent.trim());

      sortedMonthKeys.forEach(monthKey => {
        const displayMonth = monthMap[monthKey];
        if (!clientBills[clientKey][monthKey]) return;

        if (existingCellLabels.includes(displayMonth) || row.querySelector(`[data-month="${monthKey}"]`)) {
          return;
        }

        const status = clientBills[clientKey][monthKey];
        const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

        const td = document.createElement("td");
        td.setAttribute("data-month", monthKey);

        const button = document.createElement("button");
        button.textContent = status;
        const isPaid = status === "Paid";
        button.style.backgroundColor = isPaid ? "green" : "";
        button.style.color = isPaid ? "white" : "";

/*         button.addEventListener("click", () => {
          const currentStatus = button.textContent;
          let newStatus, actionToStatus;

          if (currentStatus === "Unpaid") {
            const confirmPaid = confirm("Are you sure you want to mark this client as PAID?");
            if (!confirmPaid) return;
            newStatus = "Paid";
            actionToStatus = "approved";
          } else {
            const redo = confirm("Are you sure you didn’t receive payment from this client?");
            if (!redo) return;
            newStatus = "Unpaid";
            actionToStatus = "pending";
          }

          firebase.database().ref(path).update({ status: newStatus, actionTo: actionToStatus })
            .then(() => {
              button.textContent = newStatus;
              button.style.backgroundColor = newStatus === "Paid" ? "green" : "";
              button.style.color = newStatus === "Paid" ? "white" : "";
            });
        }); */

        td.appendChild(button);
        row.appendChild(td);
      });
    });

    // 4. Adjust footer colspan
    const footerCell = document.getElementById("table-totalM");
    if (footerCell) footerCell.colSpan = theadRow.children.length;
  });
  sortTableByClientName3();
}




 function sortTableByClientName() {
    const table = document.getElementById("merchants-table");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const nameA = a.children[2].textContent.trim().toLowerCase(); // 3rd column (ClientName)
      const nameB = b.children[2].textContent.trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Re-append sorted rows
    rows.forEach((row, index) => {
      row.children[0].textContent = index + 1; // Re-number the 'No.' column
      tbody.appendChild(row);
    });
  }

 

function sortTableByClientName2() {
    const table = document.getElementById("merchants-table2");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const nameA = a.children[2].textContent.trim().toLowerCase(); // 3rd column (ClientName)
      const nameB = b.children[2].textContent.trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Re-append sorted rows
    rows.forEach((row, index) => {
      row.children[0].textContent = index + 1; // Re-number the 'No.' column
      tbody.appendChild(row);
    });
  }



function sortTableByClientName3() {
    const table = document.getElementById("merchants-table3");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const nameA = a.children[2].textContent.trim().toLowerCase(); // 3rd column (ClientName)
      const nameB = b.children[2].textContent.trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Re-append sorted rows
    rows.forEach((row, index) => {
      row.children[0].textContent = index + 1; // Re-number the 'No.' column
      tbody.appendChild(row);
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
    calculateUnpaidForSelectedMonth();
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




function calculateUnpaidForSelectedMonth() {
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




const openBtn = document.getElementById("openCollectorModal");
const closeBtn = document.querySelector(".modal .close");
const modal = document.getElementById("collectorModal");


// Global variable to store selected collector
let selectedCollector = null;

function selectCollector(name) {
  selectedCollector = name;
  console.log("✅ Collector selected:", selectedCollector);
//openBtn.addEventListener("click", () => {
  modal.style.display = "block";
 loadUnpaidBillsWithFilters(); 
  loadUnpaidBillsWithFiltersCollector(); 

}









function loadUnpaidBillsWithFilters() {
  const tableBody = document.querySelector("#unpaidTable tbody");
  const totalAmountCell = document.getElementById("totalAmountCell");
  const userTop = document.getElementById("userTop").value = selectedCollector;

  // Check if a collector has been selected
  if (!selectedCollector) {
    console.warn("⛔ No collector selected!");
    return;
  }

  tableBody.innerHTML = "";
  totalAmountCell.textContent = "₱0.00";
  let totalAmount = 0;

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    Object.entries(clients).forEach(([clientKey, clientData]) => {
      const bills = clientData.bills || {};

      Object.entries(bills).forEach(([monthKey, billData]) => {
        if (
          billData.status === "Unpaid" &&
          billData.collector === selectedCollector &&
          billData.actionTo === "pending"
        ) {
          const amount = parseFloat(billData.planAmount || 0);
          totalAmount += amount;

         const row = document.createElement("tr");
row.innerHTML = `
  <td>${billData.name || "—"}</td>
  <td>${billData.address2 || "—"}</td>
  <td>${monthKey}</td>
  <td onclick="editPlan('${clientKey}', '${monthKey}')" style="cursor: pointer;">
    ₱${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
  </td>
  <td>${billData.actionTo}</td>
  <td>
    <input type="checkbox" class="row-checkbox" 
      data-client="${clientKey}" 
      data-month="${monthKey}">
  </td>
`;
tableBody.appendChild(row);

        }
      });
    });

    totalAmountCell.textContent = `₱${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  });
}




//////////////////////////// FOR EXPENSES COLLECTOR //////////////////


function loadUnpaidBillsWithFiltersCollector() {
  const tableBody2 = document.querySelector("#expensesTable tbody");
  const totalAmountCell2 = document.getElementById("totalAmountCell2");
  const userTop2 = document.getElementById("userTop").value = selectedCollector;

  if (!selectedCollector) {
    console.warn("⛔ No collector selected!");
    return;
  }

  tableBody2.innerHTML = "";
  totalAmountCell2.textContent = "₱0.00";
  let totalAmount2 = 0;

  firebase.database().ref("goldenwifi/goldenExpenses").once("value").then(snapshot => {
    const expenses = snapshot.val();
    if (!expenses) return;

    Object.entries(expenses).forEach(([firebaseKey, billData]) => {
      if (
        billData.status === "new" &&
        billData.actionTo === "pending" &&
        billData.user === selectedCollector // check 'user', not 'collector'
      ) {
        const amount = parseFloat(billData.amount || 0);
        totalAmount2 += amount;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${billData.exName || "—"}</td>
          <td>${billData.transType || "—"}</td>
          <td>${billData.date || "_"}</td>
          <td onclick="editPlan('${firebaseKey}')" style="cursor: pointer;">
            ₱${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </td>
          <td>${billData.actionTo}</td>
          <td>
            <input type="checkbox" class="row-checkbox"
              data-client="${firebaseKey}"
              data-month="${billData.date || "_"}">
          </td>
        `;
        tableBody2.appendChild(row);
      }
    });

    totalAmountCell2.textContent = `₱${totalAmount2.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  });
}










function editPlan(clientKey,monthKey) {
  const popUp = prompt("Enter new Amount:");
 // const monthKey = `${year}-${month}`;
  const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

  if (popUp !== null) {
    const amount = parseFloat(popUp);

    if (isNaN(amount)) {
      alert("Please enter a valid number.");
      return;
    }

    const formattedAmount = parseFloat(amount.toFixed(2)); // ✅ Format to 2 decimals

    firebase.database().ref(path).update({
      planAmount: formattedAmount
    }).then(() => {
      loadUnpaidBillsWithFilters();
      console.log(`Updated planAmount to ₱${formattedAmount} for ${monthKey}`);
    });
  }
}








function markSelectedAsPaid() {
  const selectedCheckboxes = document.querySelectorAll(".row-checkbox:checked");

  if (selectedCheckboxes.length === 0) {
    alert("Please select at least one bill.");
    return;
  }

  const updates = [];

  selectedCheckboxes.forEach(checkbox => {
    const clientKey = checkbox.dataset.client;
    const monthKey = checkbox.dataset.month;
    const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

    // Push promise to array
    const updatePromise = firebase.database().ref(path).update({
      status: "Paid",
      actionTo: "approved"
    });

    updates.push(updatePromise);
  });

  // Wait for all updates then reload
  Promise.all(updates)
    .then(() => {
      alert("Selected bills marked as Paid and Approved.");
      loadUnpaidBillsWithFilters(); // Reload table
     
    })
    .catch(error => {
      console.error("Error updating bills:", error);
      alert("Some updates failed. Check console.");
    });
}








function markSelectedExp() {
  const selectedCheckboxes = document.querySelectorAll(".row-checkbox:checked");

  if (selectedCheckboxes.length === 0) {
    alert("Please select at least one bill.");
    return;
  }

  const updates = [];

  selectedCheckboxes.forEach(checkbox => {
    const firebaseKey = checkbox.dataset.client;
   // const monthKey = checkbox.dataset.month;
    const path = `goldenwifi/goldenExpenses/${firebaseKey}`;

    // Push promise to array
    const updatePromise = firebase.database().ref(path).update({
      status: "new",
      actionTo: "approved"
    });

    updates.push(updatePromise);
  });

  // Wait for all updates then reload
  Promise.all(updates)
    .then(() => {
      alert("Selected expenses marked as Approved.");
      loadUnpaidBillsWithFiltersCollector(); // Reload table
     
    })
    .catch(error => {
      console.error("Error updating expenses:", error);
      alert("Some updates failed. Check console.");
    });
}














document.getElementById("selectAllCheckbox").addEventListener("change", function () {
  const isChecked = this.checked;
  document.querySelectorAll(".row-checkbox").forEach(cb => {
    cb.checked = isChecked;
  });
});










closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
   window.location.reload();
      
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
     window.location.reload();
      
  }
});




function addReminder(clientKey) {
  const note = prompt("Enter a reminder note:");
  if (note !== null) {
    firebase.database().ref(`goldenwifi/goldenClients/${clientKey}`).update({
      note: note
    }).then(() => {
     // alert("Reminder saved!");
     //loadClientTable(); // Reload table to update note
      window.location.reload();
    });
  }
}



//cancel to hide add editform
 cancelEditMerchant.addEventListener('click', () => {
  editMerchantForm.style.display = "none";
 // location.reload(); // Refresh the page
}); 
 






// Optional: Close modal when clicking the close button
function closeModal() {
  document.getElementById("tableModal").style.display = "none";
}




function closeModal3() {
  document.getElementById("tableModal3").style.display = "none";
   const username = document.getElementById("theCollector").value;
/*  loadClientTable(username);
 loadSavedPayments2();
loadSavedPayments(username);  */
 
location.reload(); // Refresh the page
}






  const select = document.getElementById("status");
  select.addEventListener("mousedown", e => e.preventDefault()); // Prevent opening dropdown
  select.addEventListener("focus", () => select.blur());         // Prevent keyboard focus


const select33 = document.getElementById("status3");
  select33.addEventListener("mousedown", e => e.preventDefault()); // Prevent opening dropdown
  select33.addEventListener("focus", () => select33.blur());         // Prevent keyboard focus




















window.addEventListener("DOMContentLoaded", () => {
  loadClientTable(); // load clients first
 // updateMerchantTable3();
});








