

const editPaymentForm2 = document.getElementById('edit-payment-form2');


const database2 = firebase.database();

const table2 = document.getElementById('payments-table2').getElementsByTagName('tbody')[0];
const tableData2= [];


let paymentsData2 = []; // Store the fetched payment data

function filterPayments2() {

 

database2.ref('goldenwifi/goldenExpenses').on('value', (snapshot) => {
  tableData2.length = 0; // Clear existing data
  paymentsData2 = [];


   const selectedStartDate = document.getElementById("startDate").value;
  const selectedEndDate = document.getElementById("endDate").value;

  const startDate = new Date(selectedStartDate); // Example: "2024-03-01"
  const endDate = new Date(selectedEndDate); // Example: "2024-03-25"
 

  snapshot.forEach((childSnapshot) => {
    const firebaseKey2 = childSnapshot.key; // Get the Firebase key
    const payment2 = childSnapshot.val(); // Get the payment data

    const paymentDate = new Date(payment2.date); // Ensure payment.date is in a valid format


 


    // Filter for payments with status 'new'
    if (
      payment2.status === 'new' &&
    //  payment2.actionTo ==='approved' &&
      paymentDate >= startDate &&
      paymentDate <= endDate
    
    
    ) {
      paymentsData2.push({ id: firebaseKey2, ...payment2 });

      const rowData2 = {
        firebaseKey: firebaseKey2, // Store the key
        amount: payment2.amount,
        date: payment2.date,
        address: payment2.address,
        name: payment2.exName,
        status: payment2.status,
        user: payment2.user,
        actionTo: payment2.actionTo,
      
      
       
      };

      tableData2.push(rowData2);
    }
  });

  paymentsData2.sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeB - dateTimeA; // Newest first
  });
  //console.log("Sorted Payments:", paymentsData.map(p => `${p.date} ${p.time}`));

  updatePaymentsTable2(paymentsData2); // Initial table population
});
};







function updatePaymentsTable2(data) {
table2.innerHTML = ''; // Clear the table



data.forEach((payment2, rowIndex) => {
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
  editCell2.innerHTML = `<button class="button2" data-row-index="${payment2.id}">Edit</button>`;

/////////////////////////////////// auto add /////////////////////////////


const paymentsTableNew2 = document.getElementById('payments-table2');

// Check if the table exists before proceeding
if (paymentsTableNew2) {
    const tableBody2 = paymentsTableNew2.querySelector('tbody');

    // Check if the tbody exists
    if(tableBody2){
        const totalAmountSpanNew2 = document.getElementById('table-total2');

        function calculateTotalNew2() {
          itemList.innerHTML = ""; // Clear existing list
            let totalExpenses = 0;
            const amountCells2 = tableBody2.querySelectorAll('td:nth-child(3)');

            amountCells2.forEach(cell => {
                const amountNew2 = parseFloat(cell.textContent) || 0;
                totalExpenses += amountNew2;
                 const forOverAllNew2 = totalExpenses.toFixed(2);
                 localStorage.setItem("totalExpenses" , totalExpenses);
                
                

                

              // console.log("DIRI   " + forOverAllNew);
            });

            if (totalAmountSpanNew2) { // Check if the total amount span exists
                totalAmountSpanNew2.textContent = totalExpenses.toFixed(2);
                /* localStorage.setItem("overAllNew", forOverAllNew); */
             //   console.log("mao ni total: ");
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

editCell2.addEventListener('click', (event) => {
  const button2 = event.target;
  const firebaseKey2 = button2.dataset.rowIndex;
const rowData2 = tableData2.find(data => data.firebaseKey === firebaseKey2);
 

 document.getElementById('edit-idPay2').value = firebaseKey2;
 document.getElementById('edit-amount2').value = rowData2.amount;
 document.getElementById('edit-date2').value = rowData2.date;

 document.getElementById('edit-status2').value = rowData2.status;
 const exx = document.getElementById('exName2').value = rowData2.name; 
/* console.log(firebaseKey2 );
 console.log(tableData2 ); */

  editPaymentForm2.style.display = 'block'; 

  


});


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
              /*  const userNi =  document.getElementById("usernameDisplay").value;
                console.log("the userni sa 222", userNi ); */
               

              const updatedPaymentData = {
                exName: document.getElementById('exName2').value,
                   amount: document.getElementById('edit-amount2').value,
                  status: document.getElementById('edit-status2').value,
                  user: document.getElementById("theUser").value,
                  date: document.getElementById('edit-date2').value,
                //  merchantKey: merchantFirebaseKey // The new merchant Firebase Key
              };

              // Update in Firebase (example)
              firebase.database().ref(`goldenwifi/goldenExpenses/${newPayKey2}`).update(updatedPaymentData)
                  .then(() => {
                    
                      editPaymentForm2.style.display = 'none'; 
                 
                Swal.fire({
                  title: "Success!",
                  text: "Expenses edited successfully!",
                  icon: "success",
                  timer: 3000, // Closes after 3 seconds
                  showConfirmButton: false
                });
                
              

                  })
                  .catch(error => {
                      console.error("Error updating payment data:", error);
                  });

        /*   } else {
              alert("Merchant not found. Please check the merchant name.");
          } */
      });
});







cancelEditButton2.addEventListener('click', () => {
  editPaymentForm2.style.display = 'none'; 
  })
















///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////



  };    






