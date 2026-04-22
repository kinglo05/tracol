
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
//let editPaymentId = null; // Store the ID of the payment being edited





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









// --------------------VOICE RECOGNATION---------------------//

//--------------------FOR AMOUNT---------------------------//


      function startVoiceInputAmount() {
  console.log("Mic button clicked");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("❌ Speech Recognition NOT supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onstart = () => {
    console.log("🎤 Listening started...");
  };


      // ---------------------- ON RESULT ------------------------------ //

recognition.onresult = function (event) {
  let transcript = event.results[0][0].transcript.toLowerCase().trim();
  const input = document.getElementById("amount");
  input.style.background = "#ffdddd"; // light red flash
setTimeout(() => input.style.background = "", 300);

  console.log("Heard:", transcript);

  // ✅ CLEAR COMMANDS
  if (
    transcript.includes("clear") ||
    transcript.includes("erase") ||
    transcript.includes("reset")
  ) {
    input.value = "";
    return;
  }

  // ✅ DELETE LAST DIGIT (optional but powerful)
  if (transcript.includes("delete") || transcript.includes("backspace")) {
    input.value = input.value.slice(0, -1);
    return;
  }

 // ✅ Convert spoken words → numbers
transcript = convertWordsToNumbersAmount(transcript);

// ✅ Allow digits + ONE decimal point only
let clean = transcript.replace(/[^0-9.]/g, "");

// Remove extra dots (keep first only)
const parts = clean.split(".");
if (parts.length > 2) {
  clean = parts[0] + "." + parts.slice(1).join("");
}

// ✅ Append properly
let current = input.value;

// Prevent multiple dots in existing value
if (current.includes(".") && clean.includes(".")) {
  clean = clean.replace(/\./g, "");
}

input.value = current + clean;
};

  recognition.onerror = (event) => {
    console.error("❌ Error:", event.error);
    alert("Error: " + event.error);
  };

  recognition.onend = () => {
    console.log("🛑 Listening stopped");
  };

  recognition.start();
}




function convertWordsToNumbersAmount(text) {
  const map = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9"
  };

  let words = text.toLowerCase().split(/\s+/);

  let result = "";
  let hasDecimal = false;

  words.forEach(word => {
    if (word === "point" || word === "dot") {
      // ✅ Allow only ONE decimal point
      if (!hasDecimal) {
        result += ".";
        hasDecimal = true;
      }
    } else if (map[word] !== undefined) {
      result += map[word];
    } else if (!isNaN(word)) {
      // If already numeric (e.g. "123")
      result += word;
    }
  });

  return result;
}






// -------------------FOR REFERENCE NUMBER-----------------//

function startVoiceInput() {
  console.log("Mic button clicked");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("❌ Speech Recognition NOT supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onstart = () => {
    console.log("🎤 Listening started...");
  };


      // ---------------------- ON RESULT ------------------------------ //

recognition.onresult = function (event) {
  let transcript = event.results[0][0].transcript.toLowerCase().trim();
  const input = document.getElementById("ref-number");
  input.style.background = "#ffdddd"; // light red flash
setTimeout(() => input.style.background = "", 300);

  console.log("Heard:", transcript);

  // ✅ CLEAR COMMANDS
  if (
    transcript.includes("clear") ||
    transcript.includes("erase") ||
    transcript.includes("reset")
  ) {
    input.value = "";
    return;
  }

  // ✅ DELETE LAST DIGIT (optional but powerful)
  if (transcript.includes("delete") || transcript.includes("backspace")) {
    input.value = input.value.slice(0, -1);
    return;
  }

  // ✅ Convert spoken words → numbers
  transcript = convertWordsToNumbers(transcript);

  // ✅ Keep digits only + limit to 5
  const clean = transcript.replace(/[^0-9]/g, "").slice(0, 5);

  // ✅ Append instead of replace (better UX)
  input.value = (input.value + clean).slice(0, 5);
};

  recognition.onerror = (event) => {
    console.error("❌ Error:", event.error);
    alert("Error: " + event.error);
  };

  recognition.onend = () => {
    console.log("🛑 Listening stopped");
  };

  recognition.start();
}




function convertWordsToNumbers(text) {
  const map = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9"
  };

  return text
    .toLowerCase()
    .split(/\s+/)
    .map(word => map[word] ?? word)
    .join("");
}


function isValidRef() {
  const value = document.getElementById("ref-number").value;
  
  if (value.length !== 5) {
    alert("Reference number must be exactly 5 digits.");
    return false;
  }

  return true;
}





//---------------END OF VOICE RECOGNATION HERE---------------//







// ------------------time voive ----------------------------//

function startTimeVoice() {

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const input = document.getElementById("time");
    input.style.background = "#ffdddd";
setTimeout(() => input.style.background = "", 300);

// Example: 3:15 PM
input.value = "15:15";

// 🔥 Force UI update (important)
input.dispatchEvent(new Event("input"));
input.dispatchEvent(new Event("change"));

  if (!SpeechRecognition) {
    alert("Speech recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.start();

//---------------on result --------------------//



recognition.onresult = function (event) {
  let transcript = event.results[0][0].transcript.toLowerCase().trim();

  console.log("Heard:", transcript);



  const input = document.getElementById("time");

  // ✅ 🔥 CLEAR COMMAND (ADD HERE)
  if (
    transcript.includes("clear") ||
    transcript.includes("erase") ||
    transcript.includes("reset")
  ) {
    input.value = "";
    console.log("Time cleared");
    return;
  }

  // Convert words → numbers
  transcript = convertWordsToNumbers(transcript);

  // Extract numbers
  let numbers = transcript.match(/\d+/g);
  if (!numbers) return;

  let hours = parseInt(numbers[0] || "0");
  let minutes = parseInt(numbers[1] || "0");

  // Get current AM/PM
  const now = new Date();
  const isPM = now.getHours() >= 12;

  // ✅ AM/PM + fallback logic
  if (transcript.includes("am")) {
    if (hours === 12) hours = 0;
  } else if (transcript.includes("pm")) {
    if (hours < 12) hours += 12;
  } else {
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
  }

  // Format
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");

  const time = `${hh}:${mm}`;

  console.log("Final time:", time);

  input.value = time;
};





}





function convertWordsToNumbers(text) {
  const map = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    ten: "10",
    eleven: "11",
    twelve: "12",
    thirteen: "13",
    fourteen: "14",
    fifteen: "15",
    sixteen: "16",
    seventeen: "17",
    eighteen: "18",
    nineteen: "19",
    twenty: "20",
    thirty: "30",
    forty: "40",
    fifty: "50"
  };

  return text
    .split(" ")
    .map(word => map[word] ?? word)
    .join(" ");
}



// ---------------------EBD OF VOICE TIME -----------------------------//







submitNewPayment.addEventListener('click', () => {
  const refNumber = refNumberInput.value;
  const amount = amountInput.value;

  // Check if refNumber has exactly 5 digits
  if (refNumber.length !== 5 || isNaN(refNumber)) {
      alert("Reference Number must be exactly 5 digits and contain only numbers.");
      refNumberInput.value = ""; // Optionally clear the input field
     // refNumberInput.focus();
      return; // Stop further execution
  }

  // Check if refNumber and amount already exist in the database
  const paymentsRef = firebase.database().ref('payments');
  paymentsRef.orderByChild('refNumber').equalTo(refNumber).once('value', snapshot => {

       if (snapshot.exists()) {
        alert("⚠️ Duplicate payments from new system detected!"); }

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
               refNumberInput.value = ""; // Optionally clear the input field
             // refNumberInput.focus();
              return; // Prevent saving if duplicate
          } 
          else {
              savePayment2(refNumber, amount); // Save only if refNumber exists but amount is different
          }
      } else {
 
          savePayment2(refNumber, amount); // Save if refNumber doesn't exist
         
      }
  });
});




function getDeviceTag() {
  let deviceTag = localStorage.getItem("deviceTag");

  if (!deviceTag) {
    deviceTag = "WEB-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    localStorage.setItem("deviceTag", deviceTag);
  }

  return deviceTag;
}



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
      save: "manual",
      note: "",
      status: 'new',
       device: getDeviceTag(), 
       timestamp: Date.now() 
  };


// const newPaymentRef = firebase.database().ref('payments').push();
// const newPaymentKey = newPaymentRef.key;

const newPaymentRef = firebase.database().ref("payments");
 const cents = Math.round(parseFloat(amount) * 100);
    const newPaymentKey = `${refNumber}_${cents}`;

firebase.database().ref('payments/' + newPaymentKey).set(newPayment)
    .then(() => {


        Swal.fire({
        title: "Success!",
        text: "New payment edited successfully!",
        icon: "success",
        timer: 3000, // Closes after 3 seconds
        showConfirmButton: false
      }); 

  refNumberInput.value = "";
    timeInput.value = "";
    amountInput.value = "";

       
    })
    .catch((error) => {
      console.error("Error adding payment:", error);
      alert("An error occurred while adding the new payments. Please try again later.")
  });
  
};






































