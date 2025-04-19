
//const cancelEditButtonAssign2 = document.getElementById("cancel-editAssign2");
//const paymentSearchInput22 = document.getElementById('payment-search22');
////////////////////////////   PAYMENTS TABLE1 - STARTS  HERE  /////////////////////

// Firebase Configuration (Replace with your actual config)




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







function updatePaymentsTable2(data2) {
table2.innerHTML = ''; // Clear the table



data2.forEach((payment2, rowIndex) => {
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

  


    
   //////////////////////////// ALL ABOUT CHECKBOX SELECTION STARTS HERE  /////////////////////////// 
  
  // Add Checkbox cell
  const tablePayments2 = document.getElementById('payments-table2').getElementsByTagName('tbody')[0];



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


/////////////////////////////  // Event listener for Edit button //////////////////////////////

/*  editCell2.addEventListener('click', (event) => {
 const button = event.target;
 const firebaseKey2 = button.dataset.rowIndex;
 const rowData2 = tableData2.find(data2 => data2.firebaseKey2 === firebaseKey2);
 

    document.getElementById('edit-idPay2').value = rowData2.firebaseKey2;
    document.getElementById('edit-amount2').value = rowData2.amount;
     document.getElementById('edit-ref-number').value = rowData.refNumber;
  //  document.getElementById('edit-payment-type').value = rowData.paymentType;
    document.getElementById('edit-time').value = rowData.time;
    document.getElementById('edit-date').value = rowData.date; 
  //  document.getElementById('edit-user').value = rowData.user;
    document.getElementById('edit-status2').value = rowData2.status;
      document.getElementById('edit-merchant').value = rowData.merchantP; // Populate merchant  

    
    // Show the modal display only to collect data in input fields next to save BTN /////
   editPaymentForm2.style.display = 'block'; 
 
}); */


/////////////////////////////  // Event listener for Edit button aSSIGNMENT  //////////////////////////////

/* assignCell2.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey = button.dataset.rowIndex;
  const rowData = tableData.find(data => data.firebaseKey === firebaseKey);
 
  
  document.getElementById('edit-amountAssign2').value = rowData.amount;
  document.getElementById('timeEdit2').value = rowData.time;
     document.getElementById('edit-idPayAssign2').value = rowData.firebaseKey;
     document.getElementById('edit-ref-numberAssign2').value =  rowData.refNumber;
      document.getElementById('edit-merchantAssign2').value = rowData.merchantP; // Populate merchant 
    
 
     
     // Show the modal display only to collect data in input fields next to save BTN /////
    editPaymentFormAssign2.style.display = 'block'; 
  
 }); */
 

  });    


//////////////////////////////////  populate merchant name ///////////////////////////////////

/* const merchantInput = document.getElementById('edit-merchant');
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


//////////////////////////////////  populate merchant name for Assignment ///////////////////////////////////

merchantInputAssign.addEventListener('input', () => {
  const searchTerm = merchantInputAssign.value.toLowerCase();

  if (searchTerm.length > 0) { 
    database.ref('merchants')
      .orderByChild('nameLower') // Make sure you have an index on the 'name' property in your rules
      .startAt(searchTerm)
      .endAt(searchTerm + '\uf8ff')
      .limitToFirst(5)
      .once('value')
      .then((snapshot) => {
        suggestionsListAssign.innerHTML = ''; // Clear previous suggestions

        snapshot.forEach((childSnapshot) => {
          const merchantName = childSnapshot.val().name;
          const listItem = document.createElement('li');
          listItem.textContent = merchantName;

          listItem.addEventListener('click', () => {
            merchantInputAssign.value = merchantName;
            suggestionsListAssign.innerHTML = ''; 
          });

          suggestionsListAssign.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error getting data: ", error);
      });
  } else {
    suggestionsListAssign.innerHTML = ''; // Clear suggestions if input is short
  }
});
 */


//////////////////////// Event listener for search input in merchant table ////////////////////////
/* const merchantSearchInput2 = document.getElementById('merchant-search2');

let timeoutId2;

paymentSearchInput22.addEventListener('input', () => {
  clearTimeout(timeoutId2); // Clear any previous timeout

  timeoutId2 = setTimeout(() => {
    const searchTerm = paymentSearchInput22.value.toLowerCase();

    const filteredDataP2 = paymentsData2.filter((payment2) => {
      return (
        payment2?.amount?.toString().toLowerCase().includes(searchTerm) ||
        payment2?.sender?.toString().toLowerCase().includes(searchTerm) ||
        payment2?.refNumber?.toLowerCase().includes(searchTerm) ||
        payment2?.time?.toLowerCase().includes(searchTerm) ||
        payment2?.date?.toLowerCase().includes(searchTerm) ||
        payment2?.paymentType?.toLowerCase().includes(searchTerm) ||
        payment2?.save?.toLowerCase().includes(searchTerm) ||
        payment2?.merchantP?.toLowerCase().includes(searchTerm)
      );
    });

    updatePaymentsTable2(filteredDataP2);
  }, 250); // Adjust delay to 250ms for better UX
}); */


  


//cancel to hide add editform
/* cancelEditButton2.addEventListener('click', () => {
editPaymentForm2.style.display = 'none'; 
});

cancelEditButtonAssign2.addEventListener('click', () => {
  editPaymentFormAssign2.style.display = 'none'; 
  }); */
  

/* const saveEditBtn2 = document.getElementById('save-edit2');
const saveEditBtnAssign2 = document.getElementById('save-editAssign2');


saveEditBtn2.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey9 = button.dataset.rowIndex;
 
  const rowData = tableData.find(data => data.firebaseKey9 === firebaseKey9);

  // 1. Get the merchant name from the input box:
  //const merchantNameInput = document.getElementById('edit-merchant'); // Assuming 'merchantP' is the ID of your merchant name input
  const merchantName = document.getElementById('edit-merchant').value;
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
              const newPayKeyPar = document.getElementById('edit-idPay').value;
              const newPayKey = newPayKeyPar;

              const updatedPaymentData2 = {

               // firebasekey: document.getElementById('edit-idPay').value,
                  amount: document.getElementById('edit-amount').value,
                //  refNumber: document.getElementById('edit-ref-number').value,
                //  paymentType: document.getElementById('edit-payment-type').value,
                //  time: formattedTime,
                 // date: document.getElementById('edit-date').value,
                 // user: document.getElementById('edit-user').value,
                  status: document.getElementById('edit-status').value,
                //  merchantP: document.getElementById('edit-merchant').value,
                  merchantKey: merchantFirebaseKey, // The new merchant Firebase Key
              };

              // Update in Firebase (example)
              firebase.database().ref(`goldenwifi/goldenExpenses/${newPayKey}`).update(updatedPaymentData2)
                  .then(() => {
                    
                 
                Swal.fire({
                  title: "Success!",
                  text: "New payment edited successfully!",
                  icon: "success",
                  timer: 3000, // Closes after 3 seconds
                  showConfirmButton: false
                });
                
                editPaymentForm.style.display = 'none'; 



                    //  window.location.reload();
                     
               
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
      //alert("Payment details updated successfully!");
}); */



/* saveEditBtnAssign2.addEventListener('click', (event) => {
  const button = event.target;
  const firebaseKey9 = button.dataset.rowIndex;
 
  const rowData = tableData.find(data => data.firebaseKey9 === firebaseKey9);

  const merchantName2= document.getElementById('edit-merchantAssign2').value;
  async function getMerchantFirebaseKeyA2(merchantName) {
      try {
          const merchantsRef = firebase.database().ref('merchants'); // Replace 'merchants' with your actual Firebase path
          const snapshot = await merchantsRef.orderByChild('name').equalTo(merchantName2).once('value'); // Assuming 'name' is the field where you store merchant names

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
  getMerchantFirebaseKeyA2(merchantName)
      .then(merchantFirebaseKey => {
          if (merchantFirebaseKey) {
              const newPayKeyPar = document.getElementById('edit-idPayAssign').value;
              const newPayKey = newPayKeyPar;
             
              const updatedPaymentData = {

               // firebasekey: document.getElementById('edit-idPay').value,
                  amount: document.getElementById('edit-amountAssign').value,
                  refNumber: document.getElementById('edit-ref-numberAssign').value,
                 // paymentType: document.getElementById('edit-payment-type').value,
                  merchantP: document.getElementById('edit-merchantAssign').value,
                  merchantKey: merchantFirebaseKey, // The new merchant Firebase Key
              };

              // Update in Firebase (example)
              firebase.database().ref(`payments/${newPayKey}`).update(updatedPaymentData)
                  .then(() => {
                    
                    
                     

                    Swal.fire({
                      title: "Success!",
                      text: "Trader assigned successfully!",
                      icon: "success",
                      timer: 3000, // Closes after 3 seconds
                      showConfirmButton: false
                    });

                    editPaymentFormAssign.style.display = 'none'; 
                   
                     // window.location.reload();
                     
                    
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
     
}); */

}


/* const totalForTheDay2 = dateInput22.value; 
const displaytodaytotal2 = document.getElementById('total-today');

function dailypayments2() {
  database.ref('payments').once('value', (paymentsSnapshot) => {
    const payments = [];
    paymentsSnapshot.forEach((paymentSnapshot) => {
        const payment = paymentSnapshot.val();
        //Only add payments with status new
        if (payment.date === totalForTheDay) { //This is the added line
            payments.push(payment);
        }
    });
     
     const todatNumberPayments = {};
      const todayTotal = {};
  
      payments.forEach((payment) => {
          if (payment.date && payment.amount) { // Check if merchantP and amount exist
          
              const paymentdate= payment.date;
              const amount = parseFloat(payment.amount); // Parse amount as float
  
             if (!todatNumberPayments[paymentdate]) {
              todatNumberPayments[paymentdate] = 0;
              
            }
            todatNumberPayments[paymentdate]++;
  
              if (!todayTotal[paymentdate]) {
                todayTotal[paymentdate] = 0;
                 
  
              }
              todayTotal[paymentdate] += amount;
           
           }


           const paymentdate = (payment.date);
           const totalForTheDay = (todayTotal[paymentdate] || 0).toFixed(2);
           const pilakaresibo = (todatNumberPayments[paymentdate] || 0);
           const eight1 = (totalForTheDay * 0.08).toFixed(2);
           const eightPoint1 = (totalForTheDay * 0.085).toFixed(2);
           const eight = (eight1 - 500).toFixed(2);
           const eightPoint = (eightPoint1 - 500).toFixed(2);
          
document.getElementById('total-today').value = totalForTheDay;
document.getElementById('total-resibo').value = pilakaresibo;
document.getElementById('eight').value = eight;


//localStorage.setItem("todayNew" ,  totalForTheDay);


          })
         
        })
      
      };
      dailypayments2();

 */
           