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
            document.getElementById("usernameDisplay").innerText = userData.email;
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





// Firebase Data Paths
const paymentsRef = database.ref("tracollector/payments");
const merchantsRef = database.ref("tracollector/merchants");
const usersRef = database.ref("tracollector/users");
const paymentTypesRef = database.ref("tracollector/paymentTypes");

// Get DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll(".sidebar a");
const pages = document.querySelectorAll(".page");
const paymentForm = document.getElementById("payment-form");

const doneBtn = document.getElementById("done");

const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");


const saveEditBtn2 = document.getElementById("save-edit2");
const cancelEditBtn1 = document.getElementById("cancel-edit");



const amountInput = document.getElementById('amount');
const refNumberInput = document.getElementById('ref-number');
const paymentTypeSelect = document.getElementById('payment-type');
const paymentType = document.getElementById('payment-type');
const timeInput = document.getElementById('time');
const dateInput = document.getElementById('date');
const userInput = document.getElementById('user'); 


const editFireKey = document.getElementById('edit-fireKey');
const fireKey = document.getElementById('fireKey');



const editUser = document.getElementById('edit-user');
const merchantInputPay = document.getElementById("merchant-pay");
const submitNewPayment = document.getElementById("submit-payment");
const alertBox = document.getElementById("customAlert");


  

// Get the current page URL (or path)
const currentPage1 = window.location.pathname; // Or window.location.href if you need the full URL

// Get all the <li> elements
const navItems = document.querySelectorAll('ul li');

navItems.forEach(item => {
  const link = item.querySelector('a');
  const linkPath = new URL(link.href, window.location.origin).pathname; // Get the pathname from the href

  if (linkPath === currentPage1) {
    item.classList.add('active');
  }
});




// Global Variables
//let currentUserId = "user123"; // Replace with actual user authentication logic
let editPaymentId = null; // Store the ID of the payment being edited





const tableData = [];
let currentPage = 1;
let rowsPerPage = 10; // Initial value

// Fetch data from Firebase and display in the table
let paymentsData = []; // Store the fetched payment data

database.ref('payments').on('value', (snapshot) => {
  tableData.length = 0; // Clear existing data
  paymentsData = [];

});




const dateInput22 = document.getElementById('date-today');
  const today = new Date();


  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + today.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;

  dateInput.value = formattedDate; 
 // dateInput22.value = formattedDate; 



submitNewPayment.addEventListener('click', () => {
  const refNumber = refNumberInput.value;
  const amount = amountInput.value;

  // Check if refNumber has exactly 4 digits
  if (refNumber.length !== 4 || isNaN(refNumber)) {
      alert("Reference Number must be exactly 4 digits and contain only numbers.");
      refNumberInput.focus();
      return; // Stop further execution
  }

  // Check if refNumber and amount already exist in the database
  const paymentsRef = firebase.database().ref('payments');
  paymentsRef.orderByChild('refNumber').equalTo(refNumber).once('value', snapshot => {
      if (snapshot.exists()) {
          let duplicate = false;
          snapshot.forEach(paymentSnapshot => {
              if (paymentSnapshot.val().amount == amount) {
                  duplicate = true;
                  return true; // Exit forEach loop early
              }
          });

          if (duplicate) {
              alert("A payment with this Reference Number and Amount already exists.");
              refNumberInput.focus();
              return; // Prevent saving if duplicate
          } else {

             Swal.fire({
              title: "Success!",
              text: "New payment edited successfully!",
              icon: "success",
              timer: 3000, // Closes after 3 seconds
              showConfirmButton: false
            });
          

              savePayment2(refNumber, amount); // Save only if refNumber exists but amount is different
             
        
          }
      } else {
 
        Swal.fire({
          title: "Success!",
          text: "New payment edited successfully!",
          icon: "success",
          timer: 3000, // Closes after 3 seconds
          showConfirmButton: false
        }); 


          savePayment2(refNumber, amount); // Save if refNumber doesn't exist
         
       
      }
  });
});


function savePayment2(refNumber, amount) {  // Correctly placed *inside* the callback


  function formatTimeTo12Hour(timeString) {
    let [hours, minutes] = timeString.split(":");
    hours = parseInt(hours, 10);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  }
    const timeInput = document.getElementById("time").value;
    let formattedTime = formatTimeTo12Hour(timeInput);
   
  

  const newPayment = {
      amount: amount, // Use the validated amount
      refNumber: refNumber, // Use the validated refNumber
      paymentType: paymentType.value,
      time:formattedTime,
      date: dateInput.value,
      user: userInput.value,
      merchantP: merchantInputPay.value,
      merchantKey: "",
      status: 'new'
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const newPaymentRef = firebase.database().ref('payments').push();
const newPaymentKey = newPaymentRef.key;

return firebase.database().ref('payments/' + newPaymentKey).set(newPayment)
    .then(() => {

 
      /*  Swal.fire({
        title: "Success!",
        text: "New payment edited successfully!",
        icon: "success",
        timer: 3000, // Closes after 3 seconds
        showConfirmButton: false
      }); 
       */
     console.log("the payment was saved successfully");

//console.log("na save ang payment diri ni sa ubos nga message");

       
    })
    .catch((error) => {
        console.error("Error adding payment:", error);
        alert("An error occurred while adding the payment. Please try again.");
    });
}

/////////////////////////// POPULATE MERCHANT NAME //////////////////////// 

const merchantInputP = document.getElementById('merchant-pay');
const suggestionsListMP = document.getElementById('suggestionsListMP');

merchantInputP.addEventListener('input', () => {
  const searchTermP = merchantInputP.value.toLowerCase();

  if (searchTermP.length > 0) { 
    database.ref('merchants')
      .orderByChild('nameLower') // Make sure you have an index on the 'name' property in your rules
      .startAt(searchTermP)
      .endAt(searchTermP + '\uf8ff')
      .limitToFirst(5)
      .once('value')
      .then((snapshot) => {
        suggestionsListMP.innerHTML = ''; // Clear previous suggestions

        snapshot.forEach((childSnapshot) => {
          const merchantNameP = childSnapshot.val().name;
          const listItem = document.createElement('li');
          listItem.textContent = merchantNameP;

          listItem.addEventListener('click', () => {
            merchantInputP.value = merchantNameP;
            suggestionsListMP.innerHTML = ''; 
          });

          suggestionsListMP.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error getting data: ", error);
      });
  } else {
    suggestionsListMP.innerHTML = ''; // Clear suggestions if input is short
  }
});




































