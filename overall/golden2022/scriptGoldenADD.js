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
const cancelEditBtn = document.getElementById("cancel-edit");
const cancelEditBtn1 = document.getElementById("cancel-edit");
const editFireKey = document.getElementById('edit-fireKey');
const fireKey = document.getElementById('fireKey');
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



function saveCollection1() {
  const amountIn = document.getElementById("collectionAmount");
  const nameIn = document.getElementById("collectionName");
 
  const dateIn = document.getElementById("collectionDate");
  const userIn =  document.getElementById("theUser");

  const amount = amountIn.value;
  const name = nameIn.value;
  const date = dateIn.value;

  const newTrans = {
    transType: "Collection",
      amountNew: amount, // Use the validated amount
      clientName: name, 
      date: date,
     user: userIn.value,
      status: "new"
  };

  const newPaymentRef = firebase.database().ref('goldenwifi/transactions').push();
  const newPaymentKey = newPaymentRef.key;

  firebase.database().ref('goldenwifi/transactions/' + newPaymentKey).set(newTrans)
    .then(() => {
      // ✅ Show success message
      Swal.fire({
        title: "Success!",
        text: "New collection saved successfully!",
        icon: "success",
        timer: 3000,
        showConfirmButton: false
      });

      // ✅ Clear input fields
      amountIn.value = '';
      nameIn.value = '';
     
      dateIn.value = '';

      // Optional: Reset date to today again
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${yyyy}-${mm}-${dd}`;
      dateIn.value = formattedDate;

    })
    .catch((error) => {
      console.error("Error adding new Collection:", error);
      alert("An error occurred while adding the new Collection. Please try again later.");
    });
}






function saveExpenses() {
  const amountInput = document.getElementById("expensesAmount");
  const nameInput = document.getElementById("expensesName");
  const dateInput = document.getElementById("expensesDate");
  const userIn = document.getElementById("theUser").value;
  const expensesName2 = document.getElementById("expensesName2").value;
  const amount = amountInput.value;
  const name = nameInput.value;
  const date = dateInput.value;

  let newPayment = {
    transType: "Expenses",
    amount: amount,
    exName: name,
    date: date,
    user: userIn,
    status: 'new',
    expensesCatig: expensesName2,
    actionTo: userIn === "lohwa" || userIn === "admin" ? "approved" : "pending"
  };

  const newPaymentRef = firebase.database().ref('goldenwifi/goldenExpenses').push();
  const newPaymentKey = newPaymentRef.key;

  firebase.database().ref('goldenwifi/goldenExpenses/' + newPaymentKey).set(newPayment)
    .then(() => {
      Swal.fire({
        title: "Success!",
        text: "New expenses saved successfully!",
        icon: "success",
        timer: 3000,
        showConfirmButton: false
      });

      // Clear input fields
      amountInput.value = '';
      nameInput.value = '';

      // Reset date to today
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${yyyy}-${mm}-${dd}`;
      dateInput.value = formattedDate;
    })
    .catch((error) => {
      console.error("Error adding new Expenses:", error);
      alert("An error occurred while adding the new Expenses. Please try again later.");
    });
}






























