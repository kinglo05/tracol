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
            document.getElementById("usernameDisplay").innerText = "Welcome, " + userData.email;
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













/* 

   //cancel to hide add editform
   cancelEditButtonMerchant.addEventListener('click', () => {
    editMerchantForm.style.display = 'none'; 
  });
    */
  



  function handleClick(buttonName) {

    var iframe = document.getElementById("expensesIframe");
    if (iframe.style.display === "none") {
        iframe.style.display = "block";
        this.textContent = "Hide Expenses";
    } else {
        iframe.style.display = "none";
        this.textContent = "Show Expenses";
    }

  // alert(buttonName + " button clicked!");
}
 



/*  document.getElementById("Expenses").addEventListener("click", function() {
  var iframe = document.getElementById("expensesIframe");
  if (iframe.style.display === "none") {
      iframe.style.display = "block";
      this.textContent = "Hide Expenses";
  } else {
      iframe.style.display = "none";
      this.textContent = "Show Expenses";
  }
});  */


 // Get elements
 var modal = document.getElementById("expensesModal");
 var btn = document.getElementById("Expenses");
 var closeBtn = document.querySelector(".close-btn");

 // Open Modal
/*  btn.addEventListener("click", function() {
     modal.style.display = "block";
 }); */

 // Close Modal
/*  closeBtn.addEventListener("click", function() {
     modal.style.display = "none";
 }); */

 // Close Modal if user clicks outside the content area
 window.addEventListener("click", function(event) {
     if (event.target === modal) {
         modal.style.display = "none";
     }
 });


 document.getElementById("Expenses1").addEventListener("click", function() {
  window.location.href = "utilities/expenses/expensestable.html";
});

document.getElementById("overall").addEventListener("click", function() {
  window.location.href = "overall/overall.html";
});


document.getElementById("accountsPage").addEventListener("click", function() {
  window.location.href = "utilities/account/expensestable.html";
});
