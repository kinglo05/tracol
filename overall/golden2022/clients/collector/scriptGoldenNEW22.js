







//const paymentSearchInput5 = document.getElementById('payment-search5');
const editPaymentForm2 = document.getElementById('edit-payment-form2');


const database2 = firebase.database();

const table2 = document.getElementById('payments-table2').getElementsByTagName('tbody')[0];
const tableData2= [];


let paymentsData2 = []; // Store the fetched payment data



function filterPayments2() {

  database2.ref('goldenwifi/goldenExpenses').on('value', (snapshot) => {
  tableData2.length = 0; // Clear existing data
  paymentsData2 = [];

  let count = 0;
   const selectedStartDate = document.getElementById("startDate").value;
  const selectedEndDate = document.getElementById("endDate").value;

  const startDate = new Date(selectedStartDate); // Example: "2024-03-01"
  const endDate = new Date(selectedEndDate); // Example: "2024-03-25"
 

   snapshot.forEach((childSnapshot) => {
    const firebaseKey2 = childSnapshot.key; // Get the Firebase key
    const payment2 = childSnapshot.val(); // Get the payment data

    const paymentDate = new Date(payment2.date); // Ensure payment.date is in a valid format
    const amount = (payment2.amount);

 


    // Filter for payments with status 'new'
    if (
      payment2.status === 'new' &&
    //  payment2.actionTo ==='approved' &&
      paymentDate >= startDate &&
      paymentDate <= endDate 
    
    
    ) {
      paymentsData2.push({ id: firebaseKey2, ...payment2 });

      const rowData2 = {
        firebaseKey2: firebaseKey2, // Store the key
        amount2: payment2.amount,
        date2: payment2.date,
        address2: payment2.address,
        name2: payment2.exName,
        status2: payment2.status,
        user2: payment2.user,
        amount2: payment2.amount,
        expensesCatig2: payment2.expensesCatig,
        actionTo2: payment2.actionTo,
        exName2: payment2.exName,
      
      
       
      };
       
      tableData2.push(rowData2);

    //  count++;

    }
  });

  paymentsData2.sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeB - dateTimeA; // Newest first
  });
  //console.log("Sorted Payments:", paymentsData.map(p => `${p.date} ${p.time}`));
 // console.log("count of all expenses:", count); // total.toFixed(2), count);
  updatePaymentsTable2(paymentsData2); // Initial table population
});
};


filterPayments2();

//let paymentsData2= [];


// ======================= SEARCH HANDLER =======================

// function handleMerchantSearchInput() {
//   const searchTerm = document
//     .getElementById("payment-search5")
//     .value.trim()
//     .toLowerCase();

//   if (Array.isArray(paymentsData2)) {
//     updatePaymentsTable2("payments-table2", paymentsData2, false, searchTerm);
//    // updateMerchantTable("#merchants-table3", merchantData, true, searchTerm);
//     loadSavedPayments2(paymentsData2, searchTerm);
//   } else {
//     console.warn("merchantData is not an array");
//   }
// }









function updatePaymentsTable2(data) {
table2.innerHTML = ''; // Clear the table
data.forEach((payment2, rowIndex, searchTerm) => {
  const row = table2.insertRow();

  const rowIndexCell2 = row.insertCell();
  rowIndexCell2.textContent = rowIndex + 1;

  /* const assignCell2 = row.insertCell();
  assignCell2.innerHTML = `<button class="edit-button-assign" data-row-index="${payment2.id}">+</button>`;
 */
  const dateCell2 = row.insertCell();
  dateCell2.textContent = payment2.date;

  const amountCell2 = row.insertCell();
  amountCell2.textContent = payment2.amount;
  
   const catigCell2 = row.insertCell();
  catigCell2.textContent = payment2.expensesCatig;

  const nameCell2 = row.insertCell();
  nameCell2.textContent = payment2.exName;

  

  const userCell2= row.insertCell();
  userCell2.textContent = payment2.user;


    
   //////////////////////////// ALL ABOUT CHECKBOX SELECTION STARTS HERE  /////////////////////////// 
  
  // Add Checkbox cell
  const tablePayments2 = document.getElementById('payments-table2').getElementsByTagName('tbody')[0];
//  const selectAllCheckbox = document.getElementById('payment-sana-all');
  const statusCell2 = row.insertCell();
  statusCell2.textContent = payment2.actionTo;


  const editCell2 = row.insertCell();
  editCell2.innerHTML = `<button class="button2" data-row-index="${payment2.id}" disabled>Edit</button>`;

/////////////////////////////////// auto add /////////////////////////////


editCell2.addEventListener('click', (event) => {
 //  const tableBody = paymentsTableNew.querySelector('tbody');
  const button2 = event.target;
  const firebaseKey2 = button2.dataset.rowIndex;
  
const rowData = tableData2.find(data => data.firebaseKey === firebaseKey2);
const amount = payment2.amount;
//const amountNew3 = parseFloat(cell.textContent) || 0;
// const amount = tableData2.querySelectorAll('td:nth-child(3)');


 document.getElementById('edit-idPay2').value = firebaseKey2;
 document.getElementById('edit-amount2').value = amount;
  document.getElementById('edit-date2').value = payment2.date;
  document.getElementById('expensesName2').value = payment2.expensesCatig;

  document.getElementById('edit-status2').value = payment2.status;
  const exx = document.getElementById('exName2').value = payment2.exName; 

  editPaymentForm2.style.display = 'block'; 

  console.log("MAO ni data",rowData,amount);


});

















const paymentsTableNew2 = document.getElementById('payments-table2');

// Check if the table exists before proceeding
if (paymentsTableNew2) {
    const tableBody2 = paymentsTableNew2.querySelector('tbody');

    // Check if the tbody exists
    if(tableBody2){
        const totalAmountSpanNew2 = document.getElementById('table-total2');
        const totalExpensesAbove = document.getElementById('totalExpensesAbove');

        function calculateTotalNew2() {
          itemList.innerHTML = ""; // Clear existing list
            let totalExpenses = 0;
            const amountCells2 = tableBody2.querySelectorAll('td:nth-child(3)');

            amountCells2.forEach(cell => {
                const amountNew2 = parseFloat(cell.textContent) || 0;
                totalExpenses += amountNew2;
                 const forOverAllNew2 = totalExpenses.toFixed(2);
                 localStorage.setItem("totalExpenses" , totalExpenses);
                // console.log("mao ni total",forOverAllNew2 );
         
            });

            if (totalAmountSpanNew2) { // Check if the total amount span exists
                totalAmountSpanNew2.textContent = totalExpenses.toFixed(2);
             
            } else {
                console.error("Total amount span element not found!");
            }
            

          
        }

        calculateTotalNew2(); // Initial calculation

        const observer = new MutationObserver(calculateTotalNew2);
        const config = { childList: true, subtree: true };

        observer.observe(tableBody2, config);
    } else {
        console.error("Table body (tbody) not found!");
    }
  }

////////////////////////// test for checkbox claimed ALL /////////////////////////




// // Your submit button
const payTable2 = document.getElementById('payments-table2'); // Your table ID
//const checkboxClaimed = document.getElementById('checkboxClaimed');

checkboxClaimed2.addEventListener('click', () => {
  const rowsOr = payTable2.querySelectorAll('tbody tr'); // Get all rows in the table body

  payTable2.forEach(rowsOr, rowIndex => {
    //data.forEach((payment, rowIndex) => {
    const statusCellC2 = row.querySelector('td:nth-child(9)'); // Get the status cell (replace statusColumnIndex with the actual index)
    const paymentKey2 =  rowIndex.id; //// ... get the payment key from the row ... 
   
   
    if (statusCellC2.textContent === 'new') { // Check if the status is 'new'
      // Update the status in Firebase
      database2.ref(`goldenwifi/goldenExpenses/${paymentKey2}`).update({
        status: 'claimed'
      })
      .then(() => {
        console.log(`goldenwifi/goldenExpenses ${paymentKey2} updated to claimed`);
        // ... you might want to update the status in the table cell as well ...
        //statusCellC.textContent = 'claimedNO'; 
      })
      .catch(error => {
        console.error(`Error updating payment ${paymentKey2}:`, error);
        // ... display an error message to the user ...
      });
    }
  });
});


/////////////////////////////  // Event listener for Edit button22 //////////////////////////////
/////////////////////////////  // Event listener for Edit button22 //////////////////////////////
/////////////////////////////  // Event listener for Edit button22 //////////////////////////////



/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FINAL EDIT SAVE xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXX */
/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FINAL EDIT SAVE xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXX */



const saveEditBtn2 = document.getElementById('save-edit2');
const saveEditBtnAssign = document.getElementById('save-editAssign');


saveEditBtn2.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey2 = button.dataset.rowIndex;
  const rowData = tableData2.find(data => data.firebaseKey === firebaseKey2);

  // 1. Get the merchant name from the input box:
  const merchantName = document.getElementById('edit-clientName1').value;

              const newPayKeyPar2 = document.getElementById('edit-idPay2').value;
              const newPayKey2 = newPayKeyPar2;

              const updatedPaymentData = {
                exName: document.getElementById('exName2').value,
                   amount: document.getElementById('edit-amount2').value,
                  status: document.getElementById('edit-status2').value,
                  expensesCatig: document.getElementById('expensesName2').value,
                 
                  date: document.getElementById('edit-date2').value,
                //  merchantKey: merchantFirebaseKey // The new merchant Firebase Key
              };

              // Update in Firebase (example)
              firebase.database().ref(`goldenwifi/goldenExpenses/${newPayKey2}`).update(updatedPaymentData)
                  .then(() => {
                    
                 
                Swal.fire({
                  title: "Success!",
                  text: "Expenses edited successfully!",
                  icon: "success",
                  timer: 3000, // Closes after 3 seconds
                  showConfirmButton: false
                });
                
                editPaymentForm2.style.display = 'none'; 
                

                  })
                  .catch(error => {
                      console.error("Error updating payment data:", error);
                  });

                   filterCountExpenses();
                  //  updatePaymentsTable2();
              //  calculateTotalNew2();

      });
});



cancelEditButton2.addEventListener('click', () => {
  editPaymentForm2.style.display = 'none'; 
  })



  };    






function handleMerchantSearchInput3() {
  const searchTerm = document
    .getElementById("payment-search5")
    .value.trim()
    .toLowerCase();

     const table = document.getElementById("payments-table2");
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
updateDisplay()

  });

 
 

}




















function loadUnpaidBillsWithFiltersXX() {
  firebase.database().ref('goldenwifi/goldenExpenses').once("value").then(snapshot => {

   const startDate = new Date(document.getElementById("startDate").value);
     const endDate = new Date(document.getElementById("endDate").value);



   // database.ref('goldenwifi/transactions').on('value', (snapshot) => {
  // tableData.length = 0; // Clear existing data
  // paymentsData = [];
  const currentDate = new Date();

  // const selectedStartDate = document.getElementById("startDate").value;
  // const selectedEndDate = document.getElementById("endDate").value;

  const startDateS = new Date(selectedStartDate); // Example: "2024-03-01"
  const endDateS = new Date(selectedEndDate); // Example: "2024-03-25"






  //   // Convert to YYYY-MM
    // const startMonthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;
    // const endMonthKey = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}`;





    let total = 0;
    let count = 0;

    snapshot.forEach(childSnap => {
      const billData = childSnap.val();
      if (!billData || !billData.bills) return;

      // Object.keys(billData.bills).forEach(monthKey => {
         const record = billData.bills;

        const expensesDate = new Date(record.date);

         // const newBillDate = `${billDate.getFullYear()}-${String(billDate.getMonth() + 1).padStart(2, "0")}`;
          
          const billMonth = newBillDate.substring(0, 7);
       // const billDate = new Date(record.date);
      //  const billDate = (record.date)
        const status = record.status;
        const user = record.user;
        const actionTo = record.actionTo;
        const expensesCatig = (record.expensesCatig || "").trim();
        const amount = parseFloat(
          (record.planAmount || "").toString().replace(/[^0-9.]/g, "")
        ) || 0;

        let passed = true;


          
        if (!(expensesDate >= startDateS && expensesDate <= endDateS)) {
         // console.log(`❌ Skipped [${monthKey}] - Date out of range: ${billMonth}`);
        passed = false;
        }


        if (status !== "new") {
        //  console.log(`❌ Skipped [${monthKey}] - Status not 'Paid': ${status}`);
          passed = false;
        }
        if (user !== "lohwa") {
         // console.log(`❌ Skipped [${monthKey}] - actionTo not 'approved': ${actionTo}`);
          passed = false;
        }
        if (expensesCatig !== "") {
         // console.log(`❌ Skipped [${monthKey}] - whoApproved mismatch: ${whoApproved}`);
          passed = false;
        }

        

        if (passed) {
         //   console.log("Final Total from JS:", billDate);
      //   console.log(`✅ Included [${monthKey}] - Amount: ${amount}  - User: ${client}`);
          count++;
         // total += amount;
        }
      });
    });

   //    console.log("Final Total from JS:", count, total); // total.toFixed(2), count);
 // document.getElementById("countField").textContent = count;
//  document.getElementById("totalField").textContent = total.toFixed(2);
 //updateFinal();
  };
//);
//}
    


            function filterCountExpenses() {

  database2.ref('goldenwifi/goldenExpenses').on('value', (snapshot) => {
  tableData2.length = 0; // Clear existing data
  paymentsData2 = [];

  let count = 0;
  let totalMaterials = 0;

  let countGas = 0;
  let totalGas = 0;

  let countAdvance = 0;
  let totalAdvance = 0;

  let countExtra = 0;
  let totalExtra = 0;

   const selectedStartDate = document.getElementById("startDate").value;
  const selectedEndDate = document.getElementById("endDate").value;

  const startDate = new Date(selectedStartDate); // Example: "2024-03-01"
  const endDate = new Date(selectedEndDate); // Example: "2024-03-25"
 

   snapshot.forEach((childSnapshot) => {
    const firebaseKey2 = childSnapshot.key; // Get the Firebase key
    const payment2 = childSnapshot.val(); // Get the payment data

    const paymentDate = new Date(payment2.date); // Ensure payment.date is in a valid format
    const expensesCatig = payment2.expensesCatig;
     const amountG = parseFloat(
          (payment2.amount || "").toString().replace(/[^0-9.]/g, "")
        ) || 0;

        // const amountG = amount;
        // const amountM = amount;
 


    // Filter for payments with status 'new'
    if (
      payment2.status === 'new' &&
    //  payment2.actionTo ==='approved' &&
      paymentDate >= startDate &&
      paymentDate <= endDate   &&
      expensesCatig === 'Materials'
    ) {
      count++;
      totalMaterials +=amountG;
    }

     if (
      payment2.status === 'new' &&
    //  payment2.actionTo ==='approved' &&
      paymentDate >= startDate &&
      paymentDate <= endDate   &&
      expensesCatig === 'Gasolina'
    ) {
      countGas++;
      totalGas += amountG;
    }

         if (
      payment2.status === 'new' &&
    //  payment2.actionTo ==='approved' &&
      paymentDate >= startDate &&
      paymentDate <= endDate   &&
      expensesCatig === 'advanceLabor'
    ) {
      countAdvance++;
      totalAdvance += amountG;
    }


       if (
      payment2.status === 'new' &&
    //  payment2.actionTo ==='approved' &&
      paymentDate >= startDate &&
      paymentDate <= endDate   &&
      expensesCatig === 'extraLabor'
    ) {
      countExtra++;
      totalExtra += amountG;
    }



  });

  paymentsData2.sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeB - dateTimeA; // Newest first
  });
  //console.log("Sorted Payments:", paymentsData.map(p => `${p.date} ${p.time}`));
 // console.log("count of all expenses:", countExtra, totalExtra.toFixed(2)); // total.toFixed(2), count);
 // updatePaymentsTable2(paymentsData2); // Initial table population

 document.getElementById("exGasolinaC").textContent = count;
 document.getElementById("exGasolina").textContent = totalGas.toFixed(2);

 document.getElementById("exAdLaborC").textContent = countAdvance;
 document.getElementById("exAdLabor").textContent = totalAdvance.toFixed(2);

 document.getElementById("exMaterialC").textContent = count;
 document.getElementById("exMaterial").textContent = totalMaterials.toFixed(2);

});
};




 filterCountExpenses();


