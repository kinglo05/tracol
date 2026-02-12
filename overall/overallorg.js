


////////////////////LOGOUT BUTTON //////////////////////
document.getElementById("logoutButton").addEventListener("click", function() {
  firebase.auth().signOut().then(() => {
      console.log("User signed out.");
      window.location.href = "../index.html"; // Redirect to login page
  }).catch((error) => {
      console.error("Logout Error:", error);
  });
});





const dateInput22 = document.getElementById('date-today');
  const today = new Date();

  // Format the date as YYYY-MM-DD (required for input type="date")
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + today.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate2 = `${year}-${month}-${day}`;

  dateInput22.value = formattedDate2; 







 // Get elements
 var modal = document.getElementById("expensesModal");
 var btn = document.getElementById("Expenses");
 var closeBtn = document.querySelector(".close-btn");


 // Close Modal if user clicks outside the content area
 window.addEventListener("click", function(event) {
     if (event.target === modal) {
         modal.style.display = "none";
     }
 });



   

 function FinalLohwaExpenses() {
  database.ref('expenses').on('value', (childSnapshot) => {
   // tableData.length = 0; // Clear existing data
   let kini = 0;
   const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based, so add 1
    const currentYear = currentDate.getFullYear();
    //console.log("TOP oF The Function");
  
    childSnapshot.forEach((childSnapshot) => {
     
      const expens = childSnapshot.val(); // Get the payment data
  
  
      const paymentDate = new Date(expens.date); // Ensure payment.date is in a valid format
      const paymentMonth = paymentDate.getMonth() + 1;
      const paymentYear = paymentDate.getFullYear();
      const expenses = [];
  
      if (
        expens.paymentType === "lohwa" &&
        expens.status === "paid" &&
        paymentMonth === currentMonth &&
       paymentYear ===  currentYear
  
      ) {
  
        const todayLoEx = {};
         const nameKo = (expens.paymentType);
         const amountLo = parseFloat(expens.amount) || 0;
        
        todayLoEx[nameKo] = 0;
        todayLoEx[nameKo] += amountLo; 
        
        if (!todayLoEx[nameKo]) {
          todayLoEx[nameKo] = 0;
        }
        todayLoEx[nameKo] += amountLo;
        kini += amountLo;
  
      }
  
    });
    document.getElementById("lohwaExpenses1").innerText = Number(kini) || 0;

    }
  )};
   
  FinalLohwaExpenses();




/////////////// overall expenses ////////////////////////////////////////////


 function FinalOverAllExpenses() {
  database.ref('expenses').on('value', (childSnapshot) => {
   // tableData.length = 0; // Clear existing data
   let kini = 0;
   let currentMonthExpenses = 0;
   let currentMonthExpensesNew = 0;
   const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based, so add 1
    const currentYear = currentDate.getFullYear();
    //console.log("TOP oF The Function");
  
    childSnapshot.forEach((childSnapshot) => {
      const expens = childSnapshot.val(); // Get the payment data
      const paymentDate = new Date(expens.date); // Ensure payment.date is in a valid format
      const paymentMonth = paymentDate.getMonth() + 1;
      const paymentYear = paymentDate.getFullYear();
      const expenses = [];
  
      if (
        expens.paymentType === "lohwa" &&
        expens.status === "paid" &&
        paymentMonth === currentMonth &&
       paymentYear ===  currentYear
  
      ) {
  
        const todayLoEx = {};
         const nameKo = (expens.paymentType);
         const amountLo = parseFloat(expens.amount) || 0;
        
        todayLoEx[nameKo] = 0;
        todayLoEx[nameKo] += amountLo; 
        
        if (!todayLoEx[nameKo]) {
          todayLoEx[nameKo] = 0;
        }
        todayLoEx[nameKo] += amountLo;
        kini += amountLo;
  
      }

/////////// for all expenses paid current month //////

if (
 // expens.paymentType === "lohwa" &&
  expens.status === "paid" &&
  paymentMonth === currentMonth &&
 paymentYear ===  currentYear

) {

  const todayLoEx = {};
   const nameKo = (expens.paymentType);
   const amountLo = parseFloat(expens.amount) || 0;
  
  todayLoEx[nameKo] = 0;
  todayLoEx[nameKo] += amountLo; 
  
  if (!todayLoEx[nameKo]) {
    todayLoEx[nameKo] = 0;
  }
  todayLoEx[nameKo] += amountLo;
  currentMonthExpenses += amountLo;

};

/////////// for all expenses NEW Unpaid current month //////

if (
  // expens.paymentType === "lohwa" &&
   expens.status === "new" &&
   paymentMonth === currentMonth &&
  paymentYear ===  currentYear
 
 ) {
 
   const todayLoEx = {};
    const nameKo = (expens.paymentType);
    const amountLo = parseFloat(expens.amount) || 0;
   
   todayLoEx[nameKo] = 0;
   todayLoEx[nameKo] += amountLo; 
   
   if (!todayLoEx[nameKo]) {
     todayLoEx[nameKo] = 0;
   }
   todayLoEx[nameKo] += amountLo;
   currentMonthExpensesNew += amountLo;
 
 };
 


    });
    document.getElementById("lohwaExpenses1").innerText = Number(kini) || 0;
    document.getElementById("expensesPaid1").innerText = Number(currentMonthExpenses) || 0;
     document.getElementById("expensesUnpaid1").innerText = Number(currentMonthExpensesNew) || 0;
   
      localStorage.setItem("currentMonthExpenses" , currentMonthExpenses);
       // console.log("for testing only", amountLo2);  
    }
  )};
  FinalOverAllExpenses();
  







  


  //////////////////////for overall new payments ////////////////////

//  function overAllNewPayments() {
//    database.ref('payments').on('value', (childSnapshot) =>
// tableData.length = 0; // Clear existing data
//     let overAllNewPayments = 0;
 //    const currentDate = new Date();
  //    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based, so add 1
   //   const currentYear = currentDate.getFullYear();
      //console.log("TOP oF The Function");
    
   //   childSnapshot.forEach((childSnapshot) => {
       
  //      const expens = childSnapshot.val(); // Get the payment data
    
    
    //    const paymentDate = new Date(expens.date); // Ensure payment.date is in a valid format
   //     const paymentMonth = paymentDate.getMonth() + 1;
   //     const paymentYear = paymentDate.getFullYear();
   //     const expenses = [];
    
    //    if (
       //   expens.status === "new" 
        /*   expens.status === "paid" &&
          paymentMonth === currentMonth &&
         paymentYear ===  currentYear */
    
   //     ) {
    
    //      const todayLoEx = {};
      //     const nameKo = (expens.status);
  //     const amountLo = parseFloat(expens.amount) || 0;
          
    //      todayLoEx[nameKo] = 0;
     //     todayLoEx[nameKo] += amountLo; 
          
    //      if (!todayLoEx[nameKo]) {
     //       todayLoEx[nameKo] = 0;
     //     }
      //    todayLoEx[nameKo] += amountLo;
     //     overAllNewPayments += amountLo;
    
  //      }
    
 //     });
    
//    const overAllNew  = Number(overAllNewPayments) || 0;
   
//      document.getElementById("overAllNew1").innerText = overAllNew.toFixed(2);
   //     localStorage.setItem("overAllNewPayments" , overAllNewPayments);
         // console.log("sud sa foreach nihdfdfdfdf", kini);
    
 //     }
//    )};
     
    
  //  overAllNewPayments();










    

    //////////////// FOR DAILY TOTAL PAYMENTS ////////////////////////


    const totalForTheDay = dateInput22.value; 
    const displaytodaytotal = document.getElementById('total-today');
    
    function dailypayments() {
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
              
  
 
   /*  document.getElementById('eight').value = eight;
    document.getElementById('eightFive').value = eightPoint; */
    document.getElementById("todayNew1").innerText = Number(totalForTheDay) || 0;
    document.getElementById("todayResibo1").innerText = Number(pilakaresibo) || 0;
    localStorage.setItem("totalForTheDay" ,  totalForTheDay);
    
    
              })
             
            })
           // localStorage.setItem("todayNew" ,  totalForTheDay);
           // localStorage.setItem("todayResibo" ,  pilakaresibo);
          };
          dailypayments();
    








    ///////////// FOR DAILY TOTAL TRADES ///////////////// 

    function calculateDailyTrades() {
              
      database.ref('payments').once('value', (paymentsSnapshot) => {
        const payments = [];
        paymentsSnapshot.forEach((paymentSnapshot) => {
          const payment = paymentSnapshot.val();
          if (payment.status === "claimed") {
            payments.push(payment);
          }
        });
    
        const totalnoClaimed = {};
        const todayTotalTrade = {};
    
        const today = dateInput22.value;  // new Date();
 

        payments.forEach((payment) => {
          if (payment.status && payment.amount && payment.date) {
            const paymentStatus = payment.status;
            const amount = parseFloat(payment.amount);
            const paymentDate = payment.date; // Assuming payment.date is a timestamp

            // Check if the payment date is within today's range
            if (paymentDate == today ) {
              if (!totalnoClaimed[paymentStatus]) {
                totalnoClaimed[paymentStatus] = 0;
              }
              totalnoClaimed[paymentStatus]++;
    
              if (!todayTotalTrade[paymentStatus]) {
                todayTotalTrade[paymentStatus] = 0;
              }
              todayTotalTrade[paymentStatus] += amount;
    
              const paymentStatusClaimed = (payment.status);
              const totalForTheDayTrade = (todayTotalTrade[paymentStatusClaimed] || 0).toFixed(2);
              const pilakaresiboClaimed = (totalnoClaimed[paymentStatusClaimed] || 0);
              const eight = (totalForTheDayTrade * 0.08).toFixed(2);
              const eightPoint = (totalForTheDayTrade * 0.085).toFixed(2);
              const eight2 = (totalForTheDayTrade * 0.08).toFixed(2);

              document.getElementById("todayTrades1").innerText = Number(totalForTheDayTrade) || 0;
              document.getElementById("resiboTrades1").innerText = Number(pilakaresiboClaimed) || 0;
              localStorage.setItem("totalForTheDayTrade" , totalForTheDayTrade);
    
            }
            
          }
        });
      })
    .catch(error => {
        console.error("Error fetching data from Firebase:", error);
        // Handle the error appropriately (e.g., display an error message to the user)
      });
    };
    
    calculateDailyTrades();

   



function todayNoNames() {
  database.ref('payments').once('value', (paymentsSnapshot) => {
    const payments = [];
    paymentsSnapshot.forEach((paymentSnapshot) => {
        const payment = paymentSnapshot.val();
        //Only add payments with status new
        if (

          payment.merchantP ==="" &&
          payment.date === totalForTheDay
        ) { //This is the added line
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
          
/* document.getElementById('total-today').value = totalForTheDay;
document.getElementById('total-resibo').value = pilakaresibo; */
 document.getElementById("todayNoName").innerText = Number(totalForTheDay) || 0;
document.getElementById("todayNoNameResibo").innerText = Number(pilakaresibo) || 0;

          })
        //  console.log("PARA TESTING RESULT",pilakaresibo);
         // document.getElementById("todayNoNameResibo").innerText = Number(pilakaresibo) || 0;
        })
        
        
      };
      todayNoNames();

       

            function overAllNoNames() {
              database.ref('payments').on('value', (childSnapshot) => {
               // tableData.length = 0; // Clear existing data
               let monthlyNoName = 0;
               let overAllNoName = 0
               const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based, so add 1
                const currentYear = currentDate.getFullYear();
                //console.log("TOP oF The Function");
              
                childSnapshot.forEach((childSnapshot) => {
                 
                  const expens = childSnapshot.val(); // Get the payment data
              
              
                  const paymentDate = new Date(expens.date); // Ensure payment.date is in a valid format
                  const paymentMonth = paymentDate.getMonth() + 1;
                  const paymentYear = paymentDate.getFullYear();
                  const expenses = [];
              
                  if (
                    expens.merchantP === "" &&
                    expens.status === "new" 
                    /* paymentMonth === currentMonth &&
                   paymentYear ===  currentYear
               */
                  ) {
              
                    const todayLoEx = {};
                     const nameKo = (expens.status);
                     const amountLo = parseFloat(expens.amount) || 0;
                    
                    todayLoEx[nameKo] = 0;
                    todayLoEx[nameKo] += amountLo; 
                    
                    if (!todayLoEx[nameKo]) {
                      todayLoEx[nameKo] = 0;
                    }
                    todayLoEx[nameKo] += amountLo;
                    overAllNoName += amountLo;
              
                  }
                  


                  if (
                    expens.merchantP === "" &&
                    expens.status === "new" &&
                     paymentMonth === currentMonth &&
                     paymentYear ===  currentYear
               
                  ) {
              
                    const todayLoEx = {};
                     const nameKo = (expens.status);
                     const amountLo = parseFloat(expens.amount) || 0;
                    
                    todayLoEx[nameKo] = 0;
                    todayLoEx[nameKo] += amountLo; 
                    
                    if (!todayLoEx[nameKo]) {
                      todayLoEx[nameKo] = 0;
                    }
                    todayLoEx[nameKo] += amountLo;
                    monthlyNoName += amountLo;
              
                  }


              
                });
                document.getElementById("totalNoNameFinal").innerText = Number(overAllNoName) || 0;
                document.getElementById("totalNoNameMonthly").innerText = Number(monthlyNoName) || 0;
              
                  localStorage.setItem("overAllNoName" , overAllNoName);
                   // console.log("sud sa foreach nihdfdfdfdf", kini);
              
                }
              )};
               
              
              overAllNoNames();






              
              

   ////////////////////////////  MONTHLY TOTAL TRADES ///////////////////////////////

     //////////////////////for overall new payments ////////////////////

  function  monthlyTrades() {
    database.ref('payments').on('value', (childSnapshot) => {
     // tableData.length = 0; // Clear existing data
     let overAllmonthlyTrades = 0;
     const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based, so add 1
      const currentYear = currentDate.getFullYear();
      //console.log("TOP oF The Function");
    
      childSnapshot.forEach((childSnapshot) => {
       
        const expens = childSnapshot.val(); // Get the payment data
    
    
        const paymentDate = new Date(expens.date); // Ensure payment.date is in a valid format
        const paymentMonth = paymentDate.getMonth() + 1;
        const paymentYear = paymentDate.getFullYear();
        const expenses = [];
    
        if (
         
           expens.status === "claimed" &&
          paymentMonth === currentMonth &&
         paymentYear ===  currentYear 
    
        ) {
    
          const todayLoEx = {};
           const nameKo = (expens.status);
           const amountLo = parseFloat(expens.amount) || 0;
          
          todayLoEx[nameKo] = 0;
          todayLoEx[nameKo] += amountLo; 
          
          if (!todayLoEx[nameKo]) {
            todayLoEx[nameKo] = 0;
          }
          todayLoEx[nameKo] += amountLo;
          overAllmonthlyTrades += amountLo;
    
        }
    
      });
    
     // console.log("PARA TESTING RESULT", overAllNewOver);
      document.getElementById("monthlyTotalTrades").innerText = Number(overAllmonthlyTrades).toFixed(2);
        localStorage.setItem("overAllmonthlyTrades" , overAllmonthlyTrades);
         // console.log("sud sa foreach nihdfdfdfdf", kini);
    
      }
    )};
     
    
   monthlyTrades();




  


    function gcashAccount() {
      database.ref('accounts').on('value', (snapshot) => {
        let activeGcashCount = 0;
        let activeMaya = 0;
    
        if (!snapshot.exists()) {
          console.log("No data found at 'accounts' path.");
          return;
        }
    
        snapshot.forEach((childSnapshot) => {
          const account = childSnapshot.val();
    
          // Debug output
          console.log("Status:", account.status, "| Type:", account.accountType);
    
          if (
            account.status?.toLowerCase() === "active" &&
            account.accountType?.toLowerCase().includes("gcash")
          ) {
            activeGcashCount++;
          }

          if (
            account.status?.toLowerCase() === "active" &&
            account.accountType?.toLowerCase().includes("paymaya")
          ) {
            activeMaya++;
          }



        });
        document.getElementById("gActive").innerText = activeGcashCount;
        document.getElementById("mActive").innerText = activeMaya++;;
        console.log("✅ Total active GCash accounts:", activeMaya);
      });
    }
    
    gcashAccount();
    




//////////////////////////////////   ALL CALCULATIONS HERE ////////////////////////


              function updateDisplay() {
                let overAllNoName = localStorage.getItem("overAllNoName"); ////used
                let overAllNewPayments = localStorage.getItem("overAllNewPayments");
                let sumValue2dayResibo = localStorage.getItem("sumValue2dayResibo");
                let overAllmonthlyTrades= localStorage.getItem("overAllmonthlyTrades"); ////used
                let totalForTheDay = localStorage.getItem("totalForTheDay"); //used
                let todayResibo = localStorage.getItem("todayResibo");
                let resiboTrades = localStorage.getItem("resiboTrades");
                let todayTrades = localStorage.getItem("totalForTheDayTrade");   ////used
                let expensesUnpaid = localStorage.getItem("expensesUnpaid");
                let currentMonthExpenses = localStorage.getItem("currentMonthExpenses"); 
                let lohwaExpenses = localStorage.getItem("lohwaExpenses");
              
                 const TananActualNabilin = Number(overAllNewPayments - overAllNoName) || 0;
                 const todayNabilin =  Number(totalForTheDay - todayTrades) || 0;
                 const monthlyTrades = Number(overAllmonthlyTrades* 0.08);
                 document.getElementById("todayRemainingDeposit").innerText = Number(todayNabilin).toFixed(2);
                 document.getElementById("actualDeposit").innerText = Number(TananActualNabilin).toFixed(2);
                 

                 //////////// for monthly Net ///////////
                
                  const todayNetNabilin = Number(todayNabilin* 0.08);
                  const currentMonthIn = todayNetNabilin + monthlyTrades;
                  const  minusEspense = currentMonthIn - currentMonthExpenses;
                  document.getElementById("monthlyNet").innerText = Number(minusEspense).toFixed(2);

                 /* console.log("PARA TESTING RESULT today nabilin  :",currentMonthIn, "-",  currentMonthExpenses 
                  ,"=" , minusEspense); */
              }
              
              updateDisplay();
              
              // Listen for storage updates
              window.addEventListener("storage", function(event) {
                if (event.key  === "totalForTheDay" , "overAllmonthlyTrades", "overAllNewPayments", "currentMonthExpenses") {
                    updateDisplay();
                }
              });
              
            
              updateDisplay();


     

/*          
const paymentsRef = database.ref('payments');

paymentsRef.once("value", (snapshot) => {
  let merchantSums = {}; // Object to store sums per merchant

  snapshot.forEach((childSnapshot) => {
    const payment = childSnapshot.val();
    
    if (payment.status === "new") { // Only count "new" payments
      const merchant = payment.merchantP; 
      const amount = parseFloat(payment.amount) || 0; // Ensure amount is a number

      if (!merchantSums[merchant]) {
        merchantSums[merchant] = 0;
      }
      merchantSums[merchant] += amount; // Add amount to corresponding merchant
    }
  });

  console.log("Total sum per merchant (only 'new' payments):", merchantSums);
});



const rows = document.querySelectorAll(".row");
let currentIndexes = Array(rows.length).fill(0);
const totalSlides = 4;

rows.forEach((row, rowIndex) => {
  let startX = 0;
  let isDragging = false;
  let slider = row.querySelector(".slider");
  let leftArrow = row.querySelector(".arrow.left");
  let rightArrow = row.querySelector(".arrow.right");

  function goToSlide(index) {
    index = Math.max(0, Math.min(index, totalSlides - 1));
    currentIndexes[rowIndex] = index;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  // Arrow clicks
  leftArrow.addEventListener("click", () => goToSlide(currentIndexes[rowIndex] - 1));
  rightArrow.addEventListener("click", () => goToSlide(currentIndexes[rowIndex] + 1));

  // Touch events
  row.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  row.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) goToSlide(currentIndexes[rowIndex] + 1); // Swipe Left
    if (startX - endX < -50) goToSlide(currentIndexes[rowIndex] - 1); // Swipe Right
  });

  // Mouse drag
  row.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  row.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    let moveX = e.clientX;
    if (startX - moveX > 50) {
      goToSlide(currentIndexes[rowIndex] + 1);
      isDragging = false;
    } else if (startX - moveX < -50) {
      goToSlide(currentIndexes[rowIndex] - 1);
      isDragging = false;
    }
  });

  row.addEventListener("mouseup", () => {
    isDragging = false;
  });

  row.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  // Keyboard nav (optional)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goToSlide(currentIndexes[rowIndex] + 1);
    if (e.key === "ArrowLeft") goToSlide(currentIndexes[rowIndex] - 1);
  });
});


 */






 const rows = document.querySelectorAll(".row");
let currentIndexes = Array(rows.length).fill(0);
const totalSlides = 4; // Number of slides per row

rows.forEach((row, rowIndex) => {
    let startX = 0;
    let isDragging = false;
    let slider = row.querySelector(".slider");
    let leftArrow = row.querySelector(".arrow.left");
    let rightArrow = row.querySelector(".arrow.right");

    function goToSlide(index) {
        // Clamp the index between 0 and totalSlides - 1
        index = Math.max(0, Math.min(index, totalSlides - 1));
        currentIndexes[rowIndex] = index;
        slider.style.transform = `translateX(-${index * 100}vw)`;
    }

    // Click Events for Arrows
    leftArrow.addEventListener("click", () => goToSlide(currentIndexes[rowIndex] - 1));
    rightArrow.addEventListener("click", () => goToSlide(currentIndexes[rowIndex] + 1));

    // Touch Swipe Events (for mobile)
    row.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    row.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) goToSlide(currentIndexes[rowIndex] + 1); // Swipe Left
        if (startX - endX < -50) goToSlide(currentIndexes[rowIndex] - 1); // Swipe Right
    });

    // Mouse Drag Events (for PC)
    row.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    row.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        let moveX = e.clientX;
        if (startX - moveX > 50) {
            goToSlide(currentIndexes[rowIndex] + 1); // Drag Left
            isDragging = false;
        } else if (startX - moveX < -50) {
            goToSlide(currentIndexes[rowIndex] - 1); // Drag Right
            isDragging = false;
        }
    });

    row.addEventListener("mouseup", () => {
        isDragging = false;
    });

    row.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    // Keyboard Navigation (Arrow Keys)
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") goToSlide(currentIndexes[rowIndex] + 1);
        if (e.key === "ArrowLeft") goToSlide(currentIndexes[rowIndex] - 1);
    });
});

 
