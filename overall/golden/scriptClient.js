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
             document.getElementById("theUser").value =username;
          document.getElementById("areaCode").value = username;

             
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
/* const paymentsRef = database.ref("tracollector/payments"); */
const merchantsRef = database.ref("goldenwifi/goldenClients/");
const usersRef = database.ref("tracollector/users");
/* const paymentTypesRef = database.ref("tracollector/paymentTypes"); */

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





const planAmount = document.getElementById('planAmount');
const clientNameIn = document.getElementById('clientNameIn');
const clientAddress = document.getElementById('clientAddress');
const connectionType = document.getElementById('connectionType');

const dateInput = document.getElementById('date');
const userInput = document.getElementById('userType'); 


const editFireKey = document.getElementById('edit-fireKey');
const fireKey = document.getElementById('fireKey');



const editUser = document.getElementById('edit-user');
const merchantInputPay = document.getElementById("merchant-pay");

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
//let editPaymentId = null; // Store the ID of the payment being edited





const tableData = [];
let currentPage = 1;
let rowsPerPage = 10; // Initial value

// Fetch data from Firebase and display in the table
let paymentsData = []; // Store the fetched payment data



database.ref('goldenwifi/goldenClients/').on('value', (snapshot) => {
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




const contactNum = document.getElementById('contactNum');

/////////////////// ADDING NEW MERCHANT TO DATABASE ////////////////////////
const submitNewClient = document.getElementById("submit-client");
const userSaved = document.getElementById("theUser");
const areaCode1 = document.getElementById('areaCode').value;

submitNewClient.addEventListener('click', () => {


  const newMerchantName = clientNameIn.value; // Store the name for easier use
  const newMerchantAccount = {
      name: newMerchantName,
      nameLower: newMerchantName.toLowerCase(),
      address: clientAddress.value,
      planAmount: planAmount.value,
      connectionType: connectionType.value,
      status:  "new",
      areaCode:  userSaved.value,
      date: formattedDate,
      contactNum: contactNum.value,
      note: "",
      user: userSaved.value
    
  };



  // 1. Check if the merchant name already exists:
  const merchantsRef = firebase.database().ref('goldenwifi/goldenClients/');
  merchantsRef.orderByChild('nameLower').equalTo(newMerchantAccount.nameLower).once('value', (snapshot) => {
      if (snapshot.exists()) {
          // Merchant name already exists, show an alert:
        //  window.location.href = 'home.html';
          alert('Client name already exists. Please enter a different name.');
          clientNameIn.value = ""; // Optionally clear the input field
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
          

                 clientNameIn.value = "";
                  planAmount.value = "";
                   connectionType.value = "";
                   clientAddress.value = "";
      
   
    
   



               //  console.log("Merchant added successfully");

               Swal.fire({
                title: "Success!",
                text: "Client name successfully saved",
                icon: "success",
                timer: 3000, // Closes after 3 seconds
                showConfirmButton: false
              });
             

                 
              })
              .catch((error) => {
                  console.error("Error adding merchant:", error);
                  alert("An error occurred while adding the New Client. Please try again later.")
              });
      }
  });
});


//cancel to hide add merchant modal
/* cancelAddMerchantBtn.addEventListener('click', () => {
  addMerchantForm.style.display = 'none'; 
  }); */













