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
            document.getElementById("userTop").value = username
            
              loadGoldenClientsByUser(username);
               populateUnpaidMonthDropdown();
               populateUnpaidMonthDropdown2();
             
             


             loadClientTable(username);
               loadSavedPayments2(username); // Pass the username
               loadSavedPayments(username);
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
  if (!username) {
    console.error("Username is empty — please check login input.");
    return;
  }

  // ✅ Grab search term if available
  const searchTerm = document.getElementById("searchInput")?.value || "";

  // ✅ Just call updateMerchantTable (it already queries goldenClients directly)
  updateMerchantTable(username, searchTerm);

  // ✅ If you still need updateMerchantTable3, call it here
  if (typeof updateMerchantTable3 === "function") {
    updateMerchantTable3(username, searchTerm);
  }
}



 window.onload = function () {
    const username5 = document.getElementById("theCollector");
    if (username5.value === "rasty") {
      document.getElementById("addTransactionItem").style.display = "list-item";
    } else {
      document.getElementById("addTransactionItem").style.display = "none";
    }
  };



function updateMerchantTable(username, searchTerm = "") {
  if (typeof username !== "string") {
    username = String(username || "").trim();
  }
  if (!username) return;

  const tableBody = document.querySelector("#merchants-table tbody");
  tableBody.innerHTML = ""; // Clear table

  const dbRef = firebase.database().ref("goldenwifi/goldenClients");

  dbRef.once("value").then(snapshot => {
    const allData = snapshot.val();
    if (!allData) return;

    const normalizedSearch = searchTerm.toLowerCase();
    let index = 1;

    Object.entries(allData).forEach(([clientKey, clientData]) => {
      // ✅ Only include merchants with matching areaCode
      const areaCode = (clientData.areaCode || "").toLowerCase();
      if (areaCode !== username.toLowerCase()) return;

      // ✅ Apply search filter (name, address, areaCode)
      const name = (clientData.name || "").toLowerCase();
      const address = (clientData.address || "").toLowerCase();

      if (
        !name.includes(normalizedSearch) &&
        !address.includes(normalizedSearch) &&
        !areaCode.includes(normalizedSearch)
      ) {
        return;
      }

      // ✅ Build row
      const row = tableBody.insertRow();

      const rowIndexCell = row.insertCell();
      rowIndexCell.textContent = index++;

      const merchantKeyCell = row.insertCell();
      merchantKeyCell.textContent = clientKey;

      const nameCell = row.insertCell();
      nameCell.textContent = clientData.name;

      const planCell = row.insertCell();
      planCell.textContent = clientData.planAmount;

      const emailCell = row.insertCell();
      emailCell.textContent = clientData.address;

      const conDateCell = row.insertCell();
      conDateCell.textContent = clientData.date;

      const areaCodeCell = row.insertCell();
      areaCodeCell.textContent = clientData.areaCode;

      const noteCell = row.insertCell();
      noteCell.textContent = clientData.note;

      const dueDateCell = row.insertCell();
      dueDateCell.textContent = clientData.dueDate;

      const modeOfPayCell = row.insertCell();
      modeOfPayCell.textContent = clientData.modeOfPay;

      // ✅ Edit button
      const editMerchantCell = row.insertCell();
      editMerchantCell.innerHTML = `<button class="edit-button-merchant" data-client-id="${clientKey}">Edit</button>`;

      const editButton = editMerchantCell.querySelector("button");
      editButton.addEventListener("click", () => {
        document.getElementById("edit-merChantId").value = clientKey;
        document.getElementById("edit-merchant-name").value = clientData.name || "";
        document.getElementById("contactNum2").value = clientData.contactNum || "";
        document.getElementById("note").value = clientData.note || "";
        document.getElementById("status").value = clientData.status || "";
        document.getElementById("planAmount").value = clientData.planAmount || "";
        document.getElementById("client-address1").value = clientData.address || "";
        document.getElementById("dueDate").value = clientData.dueDate || "";

        editMerchantForm.style.display = "block";
      });

      // ✅ Save button (keep old logic)
      const EditSubmit = document.getElementById("save-edit-merchant");
      EditSubmit.onclick = () => {
        const editMerchantIDName = document.getElementById("edit-merChantId").value;
        const nameTo = document.getElementById("edit-merchant-name").value;

        const editClientData = {
          name: nameTo,
          nameLower: nameTo.toLowerCase(),
          contactNum: document.getElementById("contactNum2").value,
          note: document.getElementById("note").value,
          dueDate: document.getElementById("dueDate").value,
          planAmount: document.getElementById("planAmount").value,
          status: document.getElementById("status").value,
          address: document.getElementById("client-address1").value,
        };

        firebase.database().ref(`goldenwifi/goldenClients/${editMerchantIDName}`)
          .update(editClientData)
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "CHANGES SAVED SUCCESSFULLY",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
            editMerchantForm.style.display = "none";
            loadSavedPayments(); // reload payments
          })
          .catch(error => {
            console.error("Error updating merchant:", error);
          });
      };
    });
  });
}




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








function closeEditDisconnected() {
  
  document.getElementById("edit-merchant-form3").style.display = "none";
   const username = document.getElementById("theCollector").value;
   loadDisconnectionTable3(username);
//location.reload();
} 



function toggleDivs(button) {
  const ids = [ "unpaid-month-div","unpaid-month-div2", "unpaid-month-div3" ,"unpaidTotalResult", "unpaidTotalResult2"];
  const isAnyVisible = ids.some(id => document.getElementById(id).style.display === "block");

  ids.forEach(id => {
    const el = document.getElementById(id);
    el.style.display = isAnyVisible ? "none" : "block";
  });

  button.innerHTML = isAnyVisible ? "SHOW MORE OPTIONS" : "HIDE OPTIONS";
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








//////////////////////// load client table here //////////////////////



let allClientsData = {}; // Global variable to store full data
let allClientsTable = {}; // Global variable to store full data

function loadClientTable(username, searchTerm = "") {
  const tableBody = document.querySelector("#merchants-table2 tbody");
  tableBody.innerHTML = "";

  const monthlyBillsRef = firebase.database().ref("goldenwifi/monthly-bills");
  const goldenClientsRef = firebase.database().ref("goldenwifi/goldenClients");

  goldenClientsRef.once("value").then((clientsSnapshot) => {
    const notesData = clientsSnapshot.val() || {};
    allClientsTable = Object.entries(notesData).map(([id, data]) => ({ id, ...data }));

    let fetchPromises = [];

    // ✅ Only fetch bills for clients belonging to this areaCode
    Object.entries(notesData).forEach(([clientKey, clientInfo]) => {
      if (clientInfo.areaCode === username) {
        fetchPromises.push(
          monthlyBillsRef.child(clientKey).once("value").then((snap) => ({
            clientKey,
            clientData: snap.val(),
          }))
        );
      }
    });

    Promise.all(fetchPromises).then((results) => {
      let index = 1;

      results.forEach(({ clientKey, clientData }) => {
        if (!clientData) return;
        const bills = clientData.bills || {};

        const unpaidBills = Object.entries(bills)
          .filter(([_, bill]) => bill.status === "Unpaid")
          .sort(([aKey], [bKey]) => bKey.localeCompare(aKey));

        const unpaidCount = unpaidBills.length;
        if (unpaidCount === 0) return;

        const [latestMonthKey, latestUnpaidBill] = unpaidBills[0];

        const clientAreaCode = latestUnpaidBill.areaCode || "";
        if (clientAreaCode !== username) return;

        const clientName = latestUnpaidBill.name || "";
        const clientAddress1 = latestUnpaidBill.address2 || "";
        const clientACode = latestUnpaidBill.areaCode || "";
        const clientNote = latestUnpaidBill.note || "";

        // Search filter
        const normalizedSearch = searchTerm.toLowerCase();
        if (
          !clientName.toLowerCase().includes(normalizedSearch) &&
          !clientAddress1.toLowerCase().includes(normalizedSearch) &&
          !clientACode.toLowerCase().includes(normalizedSearch) &&
          !clientNote.toLowerCase().includes(normalizedSearch)
        ) {
          return;
        }

        const noteData = notesData?.[clientKey]?.note || "";
        const clientAddress = notesData?.[clientKey]?.address || "";
        const status = notesData?.[clientKey]?.status || "";
        const dueDate = notesData?.[clientKey]?.dueDate || "";
        const modeOfPay = notesData?.[clientKey]?.modeOfPay || "";

        const displayNote =
          noteData !== "" ? noteData : '<span title="Add Reminder">📝</span>';

        const row = document.createElement("tr");
        if (unpaidCount >= 2) row.classList.add("highlight-unpaid");

        row.innerHTML = `
          <td>${index++}</td>
          <td class="hidden-col">${clientKey}</td>
          <td>${clientName}</td>
          <td>₱${parseFloat(latestUnpaidBill.planAmount || 0).toLocaleString(
            undefined,
            { minimumFractionDigits: 2 }
          )}</td>
          <td>${clientAddress}</td>
          <td>${clientAreaCode}</td>
          <td onclick="addReminder('${clientKey}')" style="cursor: pointer;">${displayNote}</td>
          <td>${dueDate}</td>
          <td>${modeOfPay}</td>
          <td>${status}</td>
          <td><span class="status-label">${
            unpaidCount >= 2 ? `⚠ Overdue (${unpaidCount})` : "Unpaid"
          }</span></td>
        `;
        tableBody.appendChild(row);
      });

      // ✅ Call extra loaders only once after all bills are fetched
      loadSavedPayments2(username, results.reduce((acc, r) => {
        acc[r.clientKey] = r.clientData;
        return acc;
      }, {})); 
      loadSavedPayments(username, notesData);
     // loadDisconnectionTable3(username, notesData);
    
      populateUnpaidMonthDropdown();
      populateUnpaidMonthDropdown2();
      calculateUnpaidGrandTotalForYear();
    });
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

 

function loadSavedPayments2(username) {
  const table = document.getElementById("merchants-table2");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");

  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {
    const clients = snapshot.val();
    if (!clients) return;

    const monthMap = {};
    const clientBills = {};

    // ✅ Collect all months & bills
    Object.entries(clients).forEach(([clientKey, clientData]) => {
      if (!clientData.bills) return;

      Object.entries(clientData.bills).forEach(([monthKey, bill]) => {
        const [year, month] = monthKey.split("-");
        const displayMonth = new Date(`${year}-${month}-01`)
          .toLocaleString("default", { month: "short" });

        monthMap[monthKey] = displayMonth;

        if (!clientBills[clientKey]) clientBills[clientKey] = {};
        clientBills[clientKey][monthKey] = bill; // ✅ store full bill object
      });
    });

    const sortedMonthKeys = Object.keys(monthMap).sort();
    const existingHeaders = Array.from(theadRow.children).map(th => th.textContent.trim());

    // ✅ Add headers for new months
    sortedMonthKeys.forEach(monthKey => {
      const displayTitle = monthMap[monthKey];
      if (!existingHeaders.includes(displayTitle)) {
        const th = document.createElement("th");
        th.textContent = displayTitle;
        theadRow.appendChild(th);
      }
    });

    // ✅ Build rows per client
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 2) return;

      const clientKey = cells[1]?.textContent.trim();
      if (!clientBills[clientKey]) return;

      const bills = clientBills[clientKey] || {};

      sortedMonthKeys.forEach(monthKey => {
        const td = document.createElement("td");

        if (bills[monthKey]) {
          const bill = bills[monthKey];
          const actionTo = bill.actionTo || "Collected"; // default
          const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;

          const button2 = document.createElement("button");

          // ✅ Label based on DB state
          button2.textContent =
            actionTo === "approved" ? "🔒 Approved" :
            actionTo === "pending"  ? "⏳ Pending" :
                                      "✔ Collected";

          // ✅ Style
          button2.style.cssText = `
            font-size: 12px;
            color: white;
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid #ccc;
            background-color: ${
              actionTo === "approved" ? "green" :
              actionTo === "pending"  ? "orange" :
                                        "#007bff"
            };
            width: 90px;
            cursor: ${actionTo === "approved" ? "not-allowed" : "pointer"};
          `;

          // ✅ Disable if approved
          button2.disabled = actionTo === "approved";

          // ✅ Toggle collected ↔ pending (same as your old flow)
          if (!button2.disabled) {
            button2.addEventListener("click", () => {
              const confirmPaid = confirm("Confirm collection update?");
              if (!confirmPaid) return;

              const newStatus = actionTo === "Collected" ? "pending" : "Collected";

              firebase.database().ref(path).update({
                actionTo: newStatus,
                collector: username
              }).then(() => {
                // ✅ Update button UI instantly instead of reload
                button2.textContent =
                  newStatus === "pending" ? "⏳ Pending" : "✔ Collected";
                button2.style.backgroundColor =
                  newStatus === "pending" ? "orange" : "#007bff";
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


 const toggleBtn15 = document.getElementById("toggleDueDateBtn15");
  let filterActive = false;

  toggleBtn15.addEventListener("click", () => {
    const table = document.getElementById("merchants-table2");
    const rows = table.querySelectorAll("tbody tr");

    filterActive = !filterActive;

    rows.forEach(row => {
      const dueDateCell = row.cells[7]; // 9th column is index 8
      if (!dueDateCell) return;

      const dueDateText = dueDateCell.textContent.trim();
      const day = parseInt(dueDateText);
       const isDueDateMatch = day === 15;

      if (filterActive) {
        // Show only matching due dates
        row.style.display = isDueDateMatch ? "" : "none";
      } else {
        // Show all
        row.style.display = "";
      }
    });

    toggleBtn15.textContent = filterActive 
      ? "Show All Clients" 
      : "Show 15th Duedate";
  });

  

 const toggleBtn2 = document.getElementById("toggleDueDateBtnEnd");
  let filterActive2 = false;

  toggleBtn2.addEventListener("click", () => {
    const table = document.getElementById("merchants-table2");
    const rows = table.querySelectorAll("tbody tr");

    filterActive = !filterActive;

    rows.forEach(row => {
      const dueDateCell = row.cells[7]; // 9th column is index 8
      if (!dueDateCell) return;

      const dueDateText = dueDateCell.textContent.trim();
      const day = parseInt(dueDateText);
       const isDueDateMatch = (day >= 28 && day <= 31);

      if (filterActive) {
        // Show only matching due dates
        row.style.display = isDueDateMatch ? "" : "none";
      } else {
        // Show all
        row.style.display = "";
      }
    });

    toggleBtn2.textContent = filterActive 
      ? "Show All Clients" 
      : "Show End of Month Duedate";
  });





function loadSavedPayments(username) {
  const table = document.getElementById("merchants-table");
  const theadRow = table.querySelector("thead tr");
  const rows = table.querySelectorAll("tbody tr");

  const monthlyBillsRef = firebase.database().ref("goldenwifi/monthly-bills");
  const goldenClientsRef = firebase.database().ref("goldenwifi/goldenClients");

  goldenClientsRef.once("value").then(clientsSnap => {
    const clientsInfo = clientsSnap.val() || {};
    let fetchPromises = [];

    // Only fetch bills for clients in this areaCode
    Object.entries(clientsInfo).forEach(([clientKey, c]) => {
      if (c.areaCode === username) {
        fetchPromises.push(
          monthlyBillsRef.child(clientKey).once("value").then(snap => ({
            clientKey,
            clientData: snap.val()
          }))
        );
      }
    });

    Promise.all(fetchPromises).then(results => {
      const monthMap = {};
      const clientBills = {};

      results.forEach(({ clientKey, clientData }) => {
        if (!clientData) return;
        const bills = clientData.bills || {};
        clientBills[clientKey] = {};

        Object.entries(bills).forEach(([monthKey, bill]) => {
          const [year, month] = monthKey.split("-");
          const displayMonth = new Date(`${year}-${month}-01`)
            .toLocaleString("default", { month: "short" });
          monthMap[monthKey] = displayMonth;

          clientBills[clientKey][monthKey] = bill.actionTo || "collected";
        });
      });

      const sortedMonthKeys = Object.keys(monthMap).sort();
      const existingHeaders = Array.from(theadRow.children).map(th => th.textContent.trim());

      // Add new headers if missing
      sortedMonthKeys.forEach(monthKey => {
        const displayTitle = monthMap[monthKey];
        if (!existingHeaders.includes(displayTitle)) {
          const newTh = document.createElement("th");
          newTh.textContent = displayTitle;
          theadRow.appendChild(newTh);
        }
      });

      // Fill table rows with actionTo buttons
      rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length < 2) return;
        const clientKey = cells[1]?.textContent.trim();
        if (!clientBills[clientKey]) return;

        sortedMonthKeys.forEach(monthKey => {
          if (!clientBills[clientKey][monthKey]) return;
          if (row.querySelector(`[data-month="${monthKey}"]`)) return;

          let actionTo = clientBills[clientKey][monthKey]; // current status
          const td = document.createElement("td");
          td.setAttribute("data-month", monthKey);

          const button = document.createElement("button");

          const setButtonStyle = () => {
            if (actionTo === "approved") {
              button.textContent = "🔒 Approved";
              button.style.backgroundColor = "green";
              button.style.color = "white";
              button.disabled = true;
            } else if (actionTo === "pending") {
              button.textContent = "⏳ Pending";
              button.style.backgroundColor = "orange";
              button.style.color = "white";
              button.disabled = false;
            } else { // collected
              button.textContent = "✔ Collected";
              button.style.backgroundColor = "#f0f0f0";
              button.style.color = "black";
              button.disabled = false;
            }
            button.style.cssText += `
              font-size: 12px;
              padding: 4px 8px;
              border-radius: 6px;
              border: 1px solid #ccc;
              width: 65px;
              cursor: pointer;
            `;
          };

          setButtonStyle();

          // Add click listener if not approved
          if (!button.disabled) {
            button.addEventListener("click", () => {
              const confirmPaid = confirm("Confirm change of collection status?");
              if (!confirmPaid) return;

              // Toggle status: collected <-> pending
              actionTo = actionTo === "collected" ? "pending" : "collected";

              monthlyBillsRef.child(`${clientKey}/bills/${monthKey}`).update({
                actionTo: actionTo,
                collector: username
              }).then(() => {
                setButtonStyle(); // update text & color instantly
              }).catch(err => {
                console.error("Error updating actionTo:", err);
              });
            });
          }

          td.appendChild(button);
          row.appendChild(td);
        });
      });

      const footerCell = document.getElementById("table-totalM");
      if (footerCell) footerCell.colSpan = theadRow.children.length;

      sortTableByClientName();
    });
  });
}




function toggleTableModal3() {
  document.getElementById("tableModal3").style.display = "block";
  const username = document.getElementById("theCollector").value;
 // loadClientTable(username);
loadDisconnectionTable3(username);


 //console.log("ang nag gamit:" , username);
}




/////////working almost /////
/* async function loadDisconnectionTable3() {
  const tableBody = document.querySelector("#merchants-table3 tbody");
  tableBody.innerHTML = "";
 const username = document.getElementById("theCollector").value;
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
   

  let rowIndex = 1; // for "No." column

  // 🔹 Loop through all clients
  Object.keys(allClientsBills).forEach(clientKey => {
    // if (username && goldenClientsSnap.areaCode !== username) return;
    const clientData = allClientsBills[clientKey] || {};
    const bills = clientData.bills || {};

    let totalUnpaid = 0;
    let latestBill = null; // keep last bill info (for Date/Collector/Note)

    Object.keys(bills).forEach(monthKey => {
      const bill = bills[monthKey];

      if (bill.status && bill.status.toLowerCase() === "unpaid") {
        const amount = parseFloat(bill.planAmount) || 0;
        //totalUnpaid += amount;
         totalUnpaid ++;
      }

      // save reference to use in table (last month iterated)
      latestBill = bill;
    });

    // 🔹 Get client info from goldenClients
    const clientInfo = allClientsInfo[clientKey] || {};
    const clientName = clientInfo.name || "Unknown Client";
    const plan = latestBill?.planAmount || "";
    const address = clientInfo.address || latestBill?.address2 || "";
    const date = latestBill?.date || "";
    const collector = latestBill?.collector || "";
    const note = latestBill?.note || "";

    // 🔹 Build row
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
      <td>${totalUnpaid}</td>
      <td>
        <button onclick="viewClient('${clientKey}')">View</button>
        <button onclick="disconnectClient('${clientKey}')">Disconnect</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // 🔹 Update footer summary
  const footer = document.getElementById("table-totalM3");
  footer.textContent = `For disconnection clients: ${rowIndex - 1} records loaded`;
}

 */


/* async function loadDisconnectionTable3(username) {
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
    let latestBill = null;

    Object.keys(bills).forEach(monthKey => {
      const bill = bills[monthKey];

      if (bill.status && bill.status.toLowerCase() === "unpaid") {
        const amount = parseFloat(bill.planAmount) || 0;
       // totalUnpaid += amount;
       totalUnpaid++
      }

      latestBill = bill;
    });

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
      <td>${totalUnpaid}</td>
      <td>
        <button onclick="viewClient('${clientKey}')">View</button>
        <button onclick="disconnectClient('${clientKey}')">Disconnect</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // 🔹 Update footer
  const footer = document.getElementById("table-totalM3");
  footer.textContent = `For disconnection clients: ${rowIndex - 1} records loaded`;
}
 */


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

  // Call the function after table is loaded
 // sortTableByClientName();

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





   //////////////////// SECOND GROUP FOR TOTAL STARTS HERE ////////

   function populateUnpaidMonthDropdown2() {
  const dropdown2 = document.getElementById("unpaidMonthSelect2");

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

    dropdown2.innerHTML = ""; // Clear existing

    sortedMonths.forEach(monthKey => {
      const option = document.createElement("option");
      option.value = monthKey;
      option.textContent = new Date(monthKey + "-01").toLocaleString('default', {
        month: 'short', year: 'numeric'
      });
      dropdown2.appendChild(option);
    });

    // 🟡 Set default to current month
    const now = new Date();
    const currentMonthKey = now.toISOString().slice(0, 7); // "YYYY-MM"

    if (sortedMonths.includes(currentMonthKey)) {
      dropdown2.value = currentMonthKey;
    } else if (sortedMonths.length > 0) {
      dropdown2.selectedIndex = sortedMonths.length - 1; // last available month
    }

    // Trigger initial calculation
  calculateUnpaidForSelectedMonth2();
  });
}



function calculateUnpaidForSelectedMonth2() {
  const selectedMonth = document.getElementById("unpaidMonthSelect2").value;
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
        const status = bill.status || "Paid";
        const amount = parseFloat(bill.planAmount || 0);
        const areaCode1 = (bill.areaCode || userName);

        if (monthKey === selectedMonth && status === "Paid" && userName === areaCode1 ) {
          totalUnpaid += amount;
        }
      });

    });

    // 🟢 Display result
    const resultBox = document.getElementById("unpaidTotalResult2");
    const displayMonth = new Date(selectedMonth + "-01").toLocaleString('default', {
      month: 'short', year: 'numeric'
    });

    resultBox.textContent = `Total approved payments for ${displayMonth}: ₱${totalUnpaid.toLocaleString('en-PH', {
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
let selectedCollector2 = null;

function pendingCollection() {
  selectedCollector2 =  document.getElementById("userTop").value;
  console.log("✅ Collector selected:", selectedCollector2);
//openBtn.addEventListener("click", () => {
  modal.style.display = "block";
 loadUnpaidBillsWithFilters(); 
  loadUnpaidBillsWithFiltersCollector(); 

}









function loadUnpaidBillsWithFilters() {
  const tableBody = document.querySelector("#unpaidTable tbody");
  const totalAmountCell = document.getElementById("totalAmountCell");
 const userTop = document.getElementById("userTop").value;

  // Check if a collector has been selected
/*   if (!selectedCollector) {
    console.warn("⛔ No collector selected!");
    return;
  } */

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
          billData.collector === userTop &&
          billData.actionTo === "pending"
        ) {
          const amount = parseFloat(billData.planAmount || 0);
          totalAmount += amount;

          const modeOfPay = billData.modeOfPay;

         const row = document.createElement("tr");
row.innerHTML = `
  <td>${billData.name || "—"}</td>
  <td>${billData.address2 || "—"}</td>
  <td>${monthKey}</td>
   <td>${billData.planAmount || "_"}</td>

   <td onclick="editPlan('${clientKey}','${monthKey}')" style="cursor: pointer;">${modeOfPay || "_"}</td>

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




//////////////////////////// FOR pending COLLECTOR //////////////////


function loadUnpaidBillsWithFiltersCollector() {
  const tableBody2 = document.querySelector("#expensesTable tbody");
  const totalAmountCell2 = document.getElementById("totalAmountCell2");
 const userTop = document.getElementById("userTop").value;


/*   if (!selectedCollector) {
    console.warn("⛔ No collector selected!");
    return;
  } */

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
        billData.user === userTop // check 'user', not 'collector'
      ) {
        const amount = parseFloat(billData.amount || 0);
        totalAmount2 += amount;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${billData.exName || "—"}</td>
          <td>${billData.transType || "—"}</td>
          <td>${billData.date || "_"}</td>
         <td>${billData.amount || "_"}</td>
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
//  const monthKey = `${year}-${month}`;
  const path = `goldenwifi/monthly-bills/${clientKey}/bills/${monthKey}`;



   // const formattedAmount = (amount); // ✅ Format to 2 decimals

    firebase.database().ref(path).update({
      modeOfPay: popUp
    }).then(() => {
      loadUnpaidBillsWithFilters();
      console.log(`Updated planAmount to ₱${popUp} for ${monthKey}`);
    });
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

});






