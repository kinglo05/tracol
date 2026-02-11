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
             document.getElementById("theUser").value =username;  
            
              loadGoldenClientsByUser(username);

             loadClientTable(username);
               loadSavedPayments2(username); // Pass the username
            loadDisconnectionTable3(username);
         
            
            
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
const cancelEditMerchant2 = document.getElementById('cancel-edit-merchant2');
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



  
//let merchantData = []; // ✅ Declare merchantData globally
let timeoutId;

// ======================= FIREBASE LOAD =======================

// Load clients by user (filter status = "new")
function loadGoldenClientsByUser(username) {
  if (!username) {
    console.error("Username is empty — please check login input.");
    return;
  }

  database.ref("goldenwifi/goldenClients/").on("value", (snapshot) => {
    const merchantData = [];

    snapshot.forEach((childSnapshot) => {
      const merchant = childSnapshot.val();
      const firebaseKeyM = childSnapshot.key;

      if (merchant.status === "new") {
        merchantData.push({ id: firebaseKeyM, ...merchant });
      }
    });

    // Update both tables
  //  updateMerchantTable("#merchants-table", merchantData);
  //  updateMerchantTable("#merchants-table3", merchantData, true);
  });
}

// One-time load of merchantData (if needed globally)
let merchantData = [];
firebase
  .database()
  .ref("goldenwifi/goldenClients/")
  .once("value")
  .then((snapshot) => {
    merchantData = Object.values(snapshot.val() || {});
  });

// ======================= SEARCH HANDLER =======================

function handleMerchantSearchInput() {
  const searchTerm = document
    .getElementById("merchantSearchBox")
    .value.trim()
    .toLowerCase();

  if (Array.isArray(merchantData)) {
    updateMerchantTable("#merchants-table", merchantData, false, searchTerm);
   // updateMerchantTable("#merchants-table3", merchantData, true, searchTerm);
   loadClientTable;
    loadSavedPayments2(merchantData, searchTerm);
  } else {
    console.warn("merchantData is not an array");
  }
}

// ======================= TABLE RENDERER =======================



// Save handler for table 3
document
  .getElementById("save-edit-merchant3")
  .addEventListener("click", () => {
    const editMerchantIDName =
      document.getElementById("edit-merChantId3").value;
    const nameTo = document.getElementById("edit-merchant-name3").value;

    const editClientData = {
    
    
     
      status: "disconnected",   //document.getElementById("status3").value,
     
    };

    database
      .ref(`goldenwifi/goldenClients/${editMerchantIDName}`)
      .update(editClientData)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "CHANGES SAVED SUCCESSFULLY",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        editMerchantForm3.style.display = "none";
      //  loadSavedPayments();
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  });


function handleMerchantSearchInput3() {
  const searchTerm = document.getElementById("merchantSearchBox3").value.trim().toLowerCase();

  const table = document.getElementById("merchants-table333");
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


function toggleTableModal3() {
  document.getElementById("tableModal3").style.display = "block";
  const username = document.getElementById("theCollector").value;
 // loadClientTable(username);
loadDisconnectionTable3();

}


async function loadDisconnectionTable3(username) {
  const tableBody = document.querySelector("#merchants-table3 tbody");
  tableBody.innerHTML = "";

  // 🔹 Get monthly bills
  const monthlyBillsSnap = await firebase.database()
    .ref("goldenwifi/monthly-bills")
    .get();
  const allClientsBills = monthlyBillsSnap.val() || {};

  // 🔹 Get golden clients info
  const goldenClientsSnap = await firebase.database()
    .ref("goldenwifi/goldenClients")
    .get();
  const allClientsInfo = goldenClientsSnap.val() || {};

  let rowIndex = 1;

  Object.keys(allClientsBills).forEach(clientKey => {
    const clientData = allClientsBills[clientKey] || {};
    const bills = clientData.bills || {};

    // 🔹 Check if this client belongs to the current app user
    const clientInfo = allClientsInfo[clientKey] || {};
    if (!clientInfo || clientInfo.areaCode !== username) {
      return; // skip this client
    } 

    let totalUnpaid = 0;
    let unpaidCount = 0;
    let latestBill = null;

    Object.keys(bills).forEach(monthKey => {
      const bill = bills[monthKey];

      if (bill.status && bill.status.toLowerCase() === "unpaid") {
        const amount = parseFloat(bill.planAmount) || 0;
        totalUnpaid += amount;
        unpaidCount++;
      }

      latestBill = bill; // keep last one
    });

    // 🔹 Only include clients with >= 2 unpaid bills
    if (unpaidCount < 2) {
      return;
    }

    const clientName = clientInfo.name || "Unknown Client";
    const plan = latestBill?.planAmount || "";
    const address = clientInfo.address || latestBill?.address2 || "";
    const date = latestBill?.date || "";
    const collector = latestBill?.collector || "";
    const note = latestBill?.note || "";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${rowIndex++}</td>
      <td class="hidden-col">${clientKey}</td>
      <td>${clientName}</td>
      <td>${plan}</td>
      <td>${address}</td>
      <td>${date}</td>
      <td>${collector}</td>
      <td>${note}</td>
      <td>${unpaidCount} = ${totalUnpaid}</td>
      <td>
    
        <button onclick="disconnectClient('${clientKey}')">Disconnect</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // 🔹 Update footer
  const footer = document.getElementById("table-totalM3");
  footer.textContent = `For disconnection clients: ${rowIndex - 1} records loaded`;
}









let currentEditKey3 = null;

function openEditModal3(clientKey, client) {
  currentEditKey3 = clientKey;
  document.getElementById("editName3").value = client.name || "";
  document.getElementById("editPlan3").value = client.plan || "";
  document.getElementById("editAddress3").value = client.address || "";
  document.getElementById("editCollector3").value = client.collector || "";
  document.getElementById("editNote3").value = client.note || "";
  document.getElementById("editModal3").style.display = "block";


}

function closeEditModal3() {
  document.getElementById("editModal3").style.display = "none";
  currentEditKey3 = null;
}

function saveEditClient3() {
  if (!currentEditKey3) return;

  const updatedClient = {
    name: document.getElementById("editName3").value,
    plan: document.getElementById("editPlan3").value,
    address: document.getElementById("editAddress3").value,
    collector: document.getElementById("editCollector3").value,
    note: document.getElementById("editNote3").value,
  };

  firebase
    .database()
    .ref("goldenwifi/goldenClients/" + currentEditKey3)
    .update(updatedClient)
    .then(() => {
      alert("Client updated successfully ✅");
      closeEditModal3();
      loadDisconnectionTable3(document.getElementById("usernameInput").value);
    })
    .catch(err => {
      console.error("Error updating client:", err);
      alert("Failed to update client ❌");
    });
}







 



function closeEditDisconnected() {
  document.getElementById("edit-merchant-form3").style.display = "none";
 // updateMerchantTable3(allClientsTable, searchTerm);
   //  loadSavedPayments3(allClientsTable, searchTerm);
} 











function toggleDivs(button) {
  const ids = ["approvalNameDiv", "create-bill-div", "unpaid-month-div", "unpaidTotalResult", "unpaid-year-summary"];
  const isAnyVisible = ids.some(id => document.getElementById(id).style.display === "block");

  ids.forEach(id => {
    const el = document.getElementById(id);
    el.style.display = isAnyVisible ? "none" : "block";
  });

  button.innerHTML = isAnyVisible ? "SHOW MORE OPTIONS" : "HIDE OPTIONS";
}









function toggleTableModal3() {
  document.getElementById("tableModal3").style.display = "block";
  loadClientTable();
  loadSavedPayments2();
}




  ///////////////////SEARCH-BOX//////////////////////
  document.getElementById("merchant-search6").addEventListener("input", function () {
  const searchValue = this.value.trim();
  const username = document.getElementById("theUser").value;
  loadClientTable(username, searchValue);

  // Add highlight after updating
  setTimeout(() => highlightSearchMatches("#merchants-table2", searchValue), 150);
});

function highlightSearchMatches(tableSelector, searchValue) {
  const table = document.querySelector(tableSelector);
  if (!table) return;

  // Remove old highlights
  table.querySelectorAll("mark").forEach(mark => (mark.outerHTML = mark.innerHTML));

  if (!searchValue) return;

  const regex = new RegExp(`(${searchValue})`, "gi");
  table.querySelectorAll("td").forEach(td => {
    const text = td.textContent;
    if (text.toLowerCase().includes(searchValue)) {
      td.innerHTML = text.replace(regex, `<mark>$1</mark>`);
    }
  });
}







// ======================= SAVE HANDLERS =======================

// Save handler for table 1
document
  .getElementById("save-edit-merchant")
  .addEventListener("click", () => {
    const editMerchantIDName =
      document.getElementById("edit-merChantId").value;
    const nameTo = document.getElementById("edit-merchant-name").value;
    const clientId = document.getElementById("edit-merChantId").value;

    const editClientData = {
      name: nameTo,
      nameLower: nameTo.toLowerCase(),
      contactNum: document.getElementById("contactNum2").value,
      note: document.getElementById("note").value,
      planAmount: document.getElementById("planAmount").value,
      status: document.getElementById("status").value,
      address: document.getElementById("client-address1").value,
      areaCode: document.getElementById("areaCodeX").value,
      dueDate: document.getElementById("dueDate").value,
    };

    database
      .ref(`goldenwifi/goldenClients/${editMerchantIDName}`)
      .update(editClientData)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "CHANGES SAVED SUCCESSFULLY",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      //  editMerchantForm.style.display = "none";
       // loadSavedPayments2();
       loadClientTable();
       loadUnpaidBills(clientId);
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  });







function addMonthlyBills() {
  const selectedMonth = document.getElementById("billingMonth").value;
  if (!selectedMonth) {
    alert("Please select a billing month.");
    return;
  }

  const [year, month] = selectedMonth.split("-");
  const currentDate = new Date().toISOString().split('T')[0];
  const columnTitle = new Date(`${year}-${month}-01`)
    .toLocaleString('default', { month: 'long' }) + " " + year;
  const monthKey = `${year}-${month}`;

  const table = document.getElementById("merchants-table2");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");
  const theUser = document.getElementById("theCollector").value;

  // Add column header dynamically if not already present
  const existingHeaders = Array.from(theadRow.children).map(th => th.textContent.trim());
  if (!existingHeaders.includes(columnTitle)) {
    const th = document.createElement("th");
    th.textContent = columnTitle;
    theadRow.appendChild(th);
  }

  let createdCount = 0;
  const promises = [];

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    if (cells.length < 4) return;

    const firebaseKey = cells[1].textContent.trim();  // Client Key
    const clientName = cells[2].textContent.trim();   // Client Name
    const planText = cells[3].textContent.trim();     // ₱500
    const address2 = cells[4]?.textContent.trim() || "";
    const areaCode2 = cells[5]?.textContent.trim() || "";
    const note = cells[6]?.textContent.trim() || "";
    const status = cells[7]?.textContent.trim() || "";
     const dueDate = cells[8]?.textContent.trim() || "";
    const planAmount = parseFloat(planText.replace(/[₱,]/g, ''));

    if (isNaN(planAmount)) return;
    if (status === "Disconnected") return;

    const path = `goldenwifi/monthly-bills/${firebaseKey}/bills/${monthKey}`;

    const billPromise = firebase.database().ref(path).once("value").then(snapshot => {
      if (snapshot.exists()) {
        console.log(`⚠️ Bill already exists for ${clientName} in ${monthKey}`);
      } else {
        const paymentData = {
          clientKey: firebaseKey,
          name: clientName,
          planAmount: planAmount,
          date: currentDate,
          address2: address2,
          areaCode: areaCode2,
          actionTo: "Collected",
          dateOfPayment: "",
          collector: "",
          note: note,
          whoGenerate: theUser,
          dueDate : dueDate,
          status: "Unpaid"
        };

        return firebase.database().ref(path).set(paymentData).then(() => {
          createdCount++;

          // ✅ Add button cell dynamically for the new month
          const td = document.createElement("td");
          td.setAttribute("data-month", monthKey);

          const button = document.createElement("button");
          button.textContent = "✔ Collected";
          button.style.cssText = `
            font-size: 12px;
            color: black;
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid #ccc;
            background-color: #f0f0f0;
            width: 65px;
            cursor: pointer;
          `;

          td.appendChild(button);
          row.appendChild(td);

          console.log(`✅ Bill created for ${clientName} in ${monthKey}`);
        });
      }
    });

    promises.push(billPromise);
  });

  Promise.all(promises).then(() => {
    if (createdCount === 0) {
      alert(`All bills for ${columnTitle} already exist.`);
    } else {
      alert(`${createdCount} bill(s) successfully created for the month of ${columnTitle}.`);
    }
  });
}






//////////////////////// load client table here //////////////////////

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
    const clientsData = clientsSnapshot.val();
  //  if (!billsData) {
    if (!clientsData) {
      console.warn("No bills/client data found");
     return;
    }

    allClientsData = billsData; // Store globally for possible reuse
   allClientsTable = Object.entries(clientsData || {}).map(([id, data]) => ({
  id, ...data }));


 // ✅ Load payment status table with filtered areaCode
    loadSavedPayments2(username, billsData, clientsData); // ✅ Pass both args!
 

    let index = 1;

        // Optional search filter
      const normalizedSearch = searchTerm.toLowerCase();

    Object.entries(clientsData).forEach(([clientKey, clientData]) => {

       const statusValue = (clientData.status || "").toLowerCase();
      if (statusValue === "hide") return;
    
      const bills = billsData[clientKey]?.bills || {};
      const unpaidBills = Object.entries(bills)
        .filter(([_, bill]) => bill.status === "new" )

        .sort(([aKey], [bKey]) => bKey.localeCompare(aKey)); // Sort latest first

      const unpaidCount = unpaidBills.length;
    //  if (unpaidCount === 0) return;

     const [latestMonthKey, latestUnpaidBill] = unpaidBills[0] || [];
    const name = clientData.name || latestUnpaidBill?.name || "";
      const clientAddress = clientData.address || latestUnpaidBill?.address || "";
      const areaCode = clientData.areaCode || latestUnpaidBill?.areaCode || "";
      const noteData = clientData.note || latestUnpaidBill?.note || "";
      const cdueDate = clientData.dueDate || latestUnpaidBill?.dueDate || "";
      const status = clientData.status || latestUnpaidBill?.status || "new";
      const planAmount = clientData.planAmount || latestUnpaidBill?.planAmount || 0;
      const contactNum = clientData.contactNum || latestUnpaidBill?.contactNum || "";

      // ✅ Optional search filter
      if (
        !name.toLowerCase().includes(normalizedSearch) &&
        !clientAddress.toLowerCase().includes(normalizedSearch) &&
        !areaCode.toLowerCase().includes(normalizedSearch) &&
         !status.toLowerCase().includes(normalizedSearch) &&
         // !planAmount.toLowerCase().includes(normalizedSearch) &&
         !String(planAmount).toLowerCase().includes(String(normalizedSearch).toLowerCase()) &&
        !noteData.toLowerCase().includes(normalizedSearch)
      ) {
        return;
      }





      const displayNote = noteData !== "" ? noteData 
        : '<span title="Add Reminder">📝</span>';

      const row = document.createElement("tr");
      if (unpaidCount >= 2) {
        row.classList.add("highlight-unpaid");
      }




               // ✅ Fix: define variable first
let displayStatus = status;

if (status.toLowerCase() === "new") {
  displayStatus = "Active";
} else if (status.toLowerCase() === "disconnected") {
  displayStatus = "Disconnected";
}



  // ✅ Handle plan amount display (₱0.00 if none)
      const formattedAmount = `₱${parseFloat(planAmount || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2
      })}`;


   // const row = document.createElement('tr');

row.innerHTML = `
  <td>${index++}</td>
  <td class="hidden-col">${clientKey}</td>
  <td>${name}</td>
  <td>${formattedAmount}</td>
  <td>${clientAddress}</td>
   <td>${areaCode}</td>
  <td onclick="addReminder('${clientKey}')" style="cursor: pointer;">${displayNote}</td>
  <td>${displayStatus}</td>
   <td>${cdueDate}</td>

      `;

// ✅ Create and append the edit button safely
const editTd = document.createElement('td');
const editButton = document.createElement('button');
editButton.textContent = "Edit";
editButton.classList.add('edit-button-merchant');
//editButton.onclick = () => editMerchant(clientKey);


 // ✅ Edit button logic
    editButton.addEventListener("click", (event) => {
      const clientId = event.currentTarget.dataset.clientId;

    
        // Fill form for table1

        document.getElementById("edit-merChantId").value = clientKey;
        document.getElementById("edit-merchant-name").value = name;
        document.getElementById("contactNum2").value = contactNum;
        document.getElementById("note").value = noteData;
        document.getElementById("status").value = status;
        document.getElementById("planAmount").value = planAmount;
        document.getElementById("client-address1").value = clientAddress;
        document.getElementById("areaCodeX").value = areaCode;
        document.getElementById("dueDate").value = cdueDate;

        

        // 🧠 These functions rely on Firebase key matching
       
        const username = document.getElementById("theUser").value;


            //////////// add bill ////////

    const planAmountC = document.getElementById("planAmount").value = planAmount;
   


    document.getElementById("save-new-bill").addEventListener("click", () => {
  const clientId = document.getElementById("edit-merChantId").value;
  const monthKey = document.getElementById("add-bill-month").value;
  const cdueDateC =  document.getElementById("dueDate").value;
   const note = document.getElementById("add-bill-note").value.trim();


  if (!clientId) {
    alert("⚠️ No client selected!");
    return;
  }
  if (!monthKey) {
    alert("⚠️ Please select a month.");
    return;
  }
//  if (!amount || amount <= 0) {
 //   alert("⚠️ Please enter a valid amount.");
 //   return;
 // }

  const path = `goldenwifi/monthly-bills/${clientId}/bills/${monthKey}`;
  const dbRef = firebase.database().ref(path);

  // 🔍 Check for duplicates before saving
  dbRef.once("value").then(snapshot => {
    if (snapshot.exists()) {
      alert(`⚠️ A bill for ${monthKey} already exists for this client.`);
      return;
    }

    const newBillData = {
      status: "Unpaid",
      planAmount: planAmount,
      name: name,
      dueDate: cdueDateC,
      clientKey : clientId,
      collector : areaCode,
      whoGenerate : username,
      actionTo : "Collected",
      note: note || "",
      areaCode: areaCode,
      date: monthKey, //new Date().toISOString(),
      address2 : clientAddress 
    };

    // ✅ Save to Firebase
    dbRef.set(newBillData)
      .then(() => {
        alert(`✅ Bill added for ${monthKey}`);
        // refresh unpaid bills list
         document.getElementById("add-bill-note").value = "";
        loadClientTable();
       loadUnpaidBills(clientId);
     //   loadUnpaidBills(clientKey);
      // loadUnpaidBills(clientId); 

      })
      .catch(err => {
        console.error("Error adding bill:", err);
        alert("❌ Failed to add bill. Check console for details.");
      });
  });

 loadUnpaidBills(clientKey); 


});

     //////////add bill ending /////

editMerchantForm.style.display = "block";

 loadUnpaidBills(clientKey);


     
      
    });

editTd.appendChild(editButton);
row.appendChild(editTd);

tableBody.appendChild(row);

    });

    // ✅ After rows are ready, now add dynamic month columns with buttons
    loadSavedPayments2(username, billsData);
    populateUnpaidMonthDropdown();
   
  });
}









/////////////////////// LOAD SAVE ////////////////

function loadSavedPayments2() {
  const table = document.getElementById("merchants-table2");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");
  const currentYear = new Date().getFullYear().toString();


 const today = new Date();

  // Format the date as YYYY-MM-DD (required for input type="date")
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + today.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;





  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    const monthMap = {};        // monthKey -> displayMonth
    const clientBills = {};     // clientKey -> { monthKey -> status }

    // 1. Collect all month keys and bill data
    Object.entries(clients).forEach(([clientKey, clientData]) => {
      if (!clientData.bills) return;

      Object.entries(clientData.bills).forEach(([monthKey, bill]) => {
        const [year, month] = monthKey.split("-");

        if (year !== currentYear) return;

        const displayMonth = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' });

        monthMap[monthKey] = displayMonth;

        if (!clientBills[clientKey]) clientBills[clientKey] = {};
        clientBills[clientKey][monthKey] = bill.status || "Unpaid";
      });
    });

    const sortedMonthKeys = Object.keys(monthMap).sort(); // Chronological order



// 2. Add column headers only once
const existingHeaders = Array.from(theadRow.children).map(th => th.textContent.trim());

sortedMonthKeys.forEach(monthKey => {
  const displayTitle = monthMap[monthKey];
  if (!existingHeaders.includes(displayTitle)) {
    const th = document.createElement("th");
    th.textContent = displayTitle;
    theadRow.appendChild(th);
  }
});
;

    // 3. Add rows with button cells aligned to the correct month column
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 2) return;

      const clientKey = cells[1]?.textContent.trim();
      const bills = clientBills[clientKey] || {};

      sortedMonthKeys.forEach(monthKey => {
        const td = document.createElement("td");

        if (bills[monthKey]) {
          const status = bills[monthKey];
          const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

          const button = document.createElement("button");
          button.textContent = status;
          button.style.backgroundColor = status === "Paid" ? "green" : "";
          button.style.color = status === "Paid" ? "white" : "";

          button.addEventListener("click", () => {
            const currentStatus = button.textContent;
            let newStatus, actionToStatus;

            if (currentStatus === "Unpaid") {
              const confirmPaid = confirm("Are you sure you want to mark this client as PAID?");
              if (!confirmPaid) return;
              username = document.getElementById("theUser").value
              newStatus = "Paid";
              actionToStatus = "approved";
              whoApproved1 = username;
              firebase.database().ref(path).update({ status: newStatus, actionTo: actionToStatus, whoApproved: whoApproved1, dateOfPayment:formattedDate })
                .then(() => location.reload());
            } else {
              const redo = confirm("Are you Sure You don’t received Payment From this Client for this Month?");
              if (!redo) return;
              newStatus = "Unpaid";
              actionToStatus = "pending";
               whoApproved1 = "";
              firebase.database().ref(path).update({ status: newStatus, actionTo: actionToStatus,  whoApproved: whoApproved1, dateOfPayment:"" });
            }

            button.textContent = newStatus;
            button.style.backgroundColor = newStatus === "Paid" ? "green" : "";
            button.style.color = newStatus === "Paid" ? "white" : "";
          });

          td.appendChild(button);
        }

        row.appendChild(td); // Append either the button cell or empty cell
      });
    });

    // 4. Adjust footer column span
    const footerCell = document.getElementById("table-totalM2");
    if (footerCell) footerCell.colSpan = theadRow.children.length;
  });
   sortTableByClientNameUN();
    
}





///////////Loadsavepayments3
async function loadDisconnectionTable3(username) {
  const tableBody = document.querySelector("#merchants-table333 tbody");
  tableBody.innerHTML = "";

  // 🔹 Get monthly bills
  const monthlyBillsSnap = await firebase.database()
    .ref("goldenwifi/monthly-bills")
    .get();
  const allClientsBills = monthlyBillsSnap.val() || {};

  // 🔹 Get golden clients info
  const goldenClientsSnap = await firebase.database()
    .ref("goldenwifi/goldenClients")
    .get();
  const allClientsInfo = goldenClientsSnap.val() || {};

  let rowIndex = 1;

  Object.keys(allClientsBills).forEach(clientKey => {
    const clientData = allClientsBills[clientKey] || {};
    const bills = clientData.bills || {};

    // 🔹 Check if this client belongs to the current app user
    const clientInfo = allClientsInfo[clientKey] || {};
    if (!clientInfo) {
      return; // skip this client
    } 

    let totalUnpaid = 0;
    let unpaidCount = 0;
    let latestBill = null;

    Object.keys(bills).forEach(monthKey => {
      const bill = bills[monthKey];

      if (bill.status && bill.status.toLowerCase() === "unpaid") {
        const amount = parseFloat(bill.planAmount) || 0;
        totalUnpaid += amount;
        unpaidCount++;
      }

      latestBill = bill; // keep last one
    });

    // 🔹 Only include clients with >= 2 unpaid bills
    if (unpaidCount < 2) {
      return;
    }

    const clientName = clientInfo.name || "Unknown Client";
     const status= clientInfo.status || "";
    const plan = latestBill?.planAmount || "";
    const address = clientInfo.address || latestBill?.address2 || "";
    const date = latestBill?.date || "";
    const collector = latestBill?.areaCode || "";
    const note = latestBill?.note || "";


    // ✅ Fix: define variable first
let displayStatus = status;

if (status.toLowerCase() === "new") {
  displayStatus = "Active";
} else if (status.toLowerCase() === "disconnected") {
  displayStatus = "Disconnected";
}
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${rowIndex++}</td>
      <td class="hidden-col">${clientKey}</td>
      <td>${clientName}</td>
      <td>${plan}</td>
      <td>${address}</td>
      <td>${date}</td>
      <td>${collector}</td>
       <td>${displayStatus}</td> 
      <td>${note}</td>
      <td>${unpaidCount} = ${totalUnpaid}</td>
      <td>
    
      
        <button onclick="disconnectClient('${clientKey}','${clientName}','${status}')">Disconnect</button>
      </td>
    `;
    tableBody.appendChild(tr);
     
  });
 
  // 🔹 Update footer
  const footer = document.getElementById("table-totalM333");
  footer.textContent = `For disconnection clients: ${rowIndex - 1} records loaded`;
}






function disconnectClient(clientKey, clientName, status) {
//  alert("🚨 Do you want to disconnect client : " + clientKey + clientName);
//    alert("🚨 Do you want to disconnect client : "  + clientName + "  ?");

  document.getElementById('edit-merChantId3').value = clientKey;
    document.getElementById('edit-merchant-name3').value = clientName;

    document.getElementById('status3').value = status;

      editMerchantForm3.style.display = 'block';
  // Later: you can add logic here to update the client status in Firebase
  // Example:
  // firebase.database().ref("goldenwifi/goldenClients/" + clientKey).update({ status: "For Disconnection" });
}







function closeEditDisconnected() {
  
  document.getElementById("edit-merchant-form3").style.display = "none";
   const username = document.getElementById("theCollector").value;
//   loadDisconnectionTable3(username);
//location.reload();
} 







function sortTableByClientNameUN() {
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
    const table = document.getElementById("merchants-table333");
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



function loadUnpaidBills(clientId) {
  const currentYear = new Date().getFullYear();
  const billsTableBody = document.getElementById("bills-list");
  const billsContainer = document.getElementById("bills-section");

  billsTableBody.innerHTML = ""; // Clear old rows
  billsContainer.style.display = "none";

  firebase.database().ref(`goldenwifi/monthly-bills/${clientId}/bills`).once("value")
    .then(snapshot => {
      if (!snapshot.exists()) return;

      const billsData = snapshot.val();
      const unpaidBills = [];

      // Collect only unpaid bills for current year
      Object.entries(billsData).forEach(([monthKey, bill]) => {
        if (!bill || bill.status !== "Unpaid") return;

        const [year, month] = monthKey.split("-");
      //  if (parseInt(year) === currentYear) {
       if (parseInt(year)) {
          unpaidBills.push({
            monthKey,
            displayMonth: new Date(`${year}-${month}-01`).toLocaleString("default", { month: "long" }),
            planAmount: bill.planAmount || "0",
            dueDate: bill.dueDate || "",
          //  remarks: bill.note || ""
          });
        }
      });

      if (unpaidBills.length === 0) {
        billsTableBody.innerHTML = `<tr><td colspan="5">✅ No unpaid bills for ${currentYear}</td></tr>`;
        billsContainer.style.display = "block";
        return;
      }

      // Populate table
      unpaidBills.forEach(bill => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${bill.displayMonth}</td>
          <td>₱${bill.planAmount}</td>
          <td>${bill.dueDate}</td>
      
          <td>
            <button class="edit-bill-btn" data-month="${bill.monthKey}">Edit</button>
            <br><br>
            <button class="delete-bill-btn" data-month="${bill.monthKey}">Delete</button>
          </td>
        `;
        billsTableBody.appendChild(tr);
      });

      // ✅ Attach edit listeners
      document.querySelectorAll(".edit-bill-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const monthKey = e.currentTarget.dataset.month;
          const path = `goldenwifi/monthly-bills/${clientId}/bills/${monthKey}`;

          // Get current data from Firebase
          firebase.database().ref(path).once("value").then(snapshot => {
            const billData = snapshot.val();
            if (!billData) return;

            // Simple inline prompt editing (can be replaced with a modal form)
            const newAmount = prompt(`Enter new amount for ${monthKey}:`, billData.planAmount || "0");
            if (newAmount === null) return; // cancelled

            // Optional: also ask for due date / remarks
          //  const newDue = prompt("Enter new due date:", billData.dueDate || "");
           // if (newDue === null) return;

          //  const newNote = prompt("Enter new remarks:", billData.note || "");

            // Update Firebase
            firebase.database().ref(path).update({
              planAmount: parseFloat(newAmount) || 0,
            //  dueDate: newDue,
            //  note: newNote
            }).then(() => {
              alert(`Bill for ${monthKey} updated successfully.`);
              loadUnpaidBills(clientId); // refresh
            }).catch(err => {
              console.error("Error updating bill:", err);
              alert("Failed to update bill.");
            });
          });
        });
      });

      // ✅ Attach delete listeners
      document.querySelectorAll(".delete-bill-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const monthKey = e.currentTarget.dataset.month;
          const path = `goldenwifi/monthly-bills/${clientId}/bills/${monthKey}`;

          if (confirm(`Are you sure you want to delete the bill for ${monthKey}?`)) {
            firebase.database().ref(path).remove().then(() => {
              alert(`Bill for ${monthKey} deleted successfully.`);
              loadUnpaidBills(clientId); // refresh
            }).catch(err => {
              console.error("Error deleting bill:", err);
              alert("Failed to delete bill.");
            });
          }
        });
      });

      billsContainer.style.display = "block";
    })
    .catch(err => {
      console.error("Error loading bills:", err);
      billsTableBody.innerHTML = `<tr><td colspan="5" style="color:red;">Error loading bills</td></tr>`;
      billsContainer.style.display = "block";
    });
}








////////// ADD ONE CLENT BILL ////////

function populateMonthDropdown() {
  const currentYear = new Date().getFullYear();
  const select = document.getElementById("add-bill-month");
  select.innerHTML = "";

  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];

  months.forEach(m => {
    const date = new Date(`${currentYear}-${m}-01`);
    const label = date.toLocaleString("default", { month: "long" });
    const option = document.createElement("option");
    option.value = `${currentYear}-${m}`;
    option.textContent = label;
    select.appendChild(option);
  });

  document.getElementById("addBillYear").textContent = currentYear;
}
populateMonthDropdown();










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

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    let totalUnpaid = 0;

    Object.values(clients).forEach(client => {
      if (!client.bills) return;

      Object.entries(client.bills).forEach(([monthKey, bill]) => {
        const status = bill.status || "Unpaid";
        const amount = parseFloat(bill.planAmount || 0);

        if (monthKey === selectedMonth && status === "Unpaid") {
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
    })}`;
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
            <input type="checkbox" class="row-checkbox2"
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
    const username = document.getElementById("theUser").value;
                   
    const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

    // Push promise to array
    const updatePromise = firebase.database().ref(path).update({
      status: "Paid",
      actionTo: "approved",
       whoApproved: username,
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




document.getElementById("selectAllCheckbox").addEventListener("change", function () {
  const isChecked = this.checked;
  document.querySelectorAll(".row-checkbox").forEach(cb => {
    cb.checked = isChecked;
  });
});




function markSelectedExp() {
  const selectedCheckboxesEX = document.querySelectorAll(".row-checkbox2:checked");

  if (selectedCheckboxesEX.length === 0) {
    alert("Please select at least one bill.");
    return;
  }

  const updates = [];

  selectedCheckboxesEX.forEach(checkbox => {
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






document.getElementById("selectAllCheckboxEX").addEventListener("change", function () {
  const isCheckedEX = this.checked;
  document.querySelectorAll(".row-checkbox2").forEach(cb => {
    cb.checked = isCheckedEX;
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
      loadClientTable(); // Reload table to update note
       //window.location.reload();
    });
  }
}



//cancel to hide add editform
 cancelEditMerchant.addEventListener('click', () => {
  editMerchantForm.style.display = "none";
  loadClientTable();
  loadSavedPayments2();
 // location.reload(); // Refresh the page
}); 
 
//cancel to hide add editform
 cancelEditMerchant2.addEventListener('click', () => {
  editMerchantForm.style.display = "none";
  loadClientTable();
  loadSavedPayments2();
 // location.reload(); // Refresh the page
});



function toggleTable() {
  const modal = document.getElementById("tableModal");

  // Toggle modal visibility
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}



// Optional: Close modal when clicking the close button
function closeModal() {
  document.getElementById("tableModal").style.display = "none";
}




function closeModal3() {
  document.getElementById("tableModal3").style.display = "none";
 loadClientTable();
 
  //location.reload(); // Refresh the page
}






function totalClients() {
  const tableDataM = [];
  let merchantData = [];

   let total = 0;
    let count = 0;
    let countActive = 0;
    let countDiscon = 0;

  // if (!username) {
  //   console.error("Username is empty — please check login input.");
  //   return;
  // }

  database.ref('goldenwifi/goldenClients/').on('value', (snapshot) => {
    tableDataM.length = 0;
    merchantData = [];

    snapshot.forEach((childSnapshot) => {
      const merchant = childSnapshot.val();
      const firebaseKeyM = childSnapshot.key;

     // if (merchant.status === "new") {
        if (merchant.status) {
        count++;
        //  total += amount;
      }

       if (merchant.status === "new") {
        countActive++;
        //  total += amount;
      }
      
      if (merchant.status === "disconnected") {
        countDiscon++;
        //  total += amount;
      }

    });

   // updateMerchantTable(merchantData);
        console.log("started date:", count,countActive,countDiscon); // total.toFixed(2), count);
   document.getElementById("totalActive").textContent = countActive;
   document.getElementById("totalDiscon").textContent = countDiscon;
  

  });
}












window.addEventListener("DOMContentLoaded", () => {
 // loadClientTable();
 // loadSavedPayments2(); // load clients first
 // sortTableByClientName();
 // updateMerchantTable3();
totalClients();

});







