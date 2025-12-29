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
           // document.getElementById("theCollector").value =username; 
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



















function loadUnpaidBillsWithFilters() {
  firebase.database().ref("goldenwifi/monthly-bills").once("value").then(snapshot => {

  const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    // Convert to YYYY-MM
    const startMonthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;
    const endMonthKey = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}`;





    let total = 0;
    let count = 0;

    snapshot.forEach(childSnap => {
      const billData = childSnap.val();
      if (!billData || !billData.bills) return;

      Object.keys(billData.bills).forEach(monthKey => {
        const record = billData.bills[monthKey];

       // const billDate = new Date(record.date);
        const billDate = new Date(monthKey);
        const status = record.status;
        const actionTo = record.actionTo;
        const whoApproved = (record.whoApproved || "").trim();
        const amount = parseFloat(
          (record.planAmount || "").toString().replace(/[^0-9.]/g, "")
        ) || 0;

        let passed = true;



        // if (!(billDate >= new Date(startDate) && billDate <= new Date(endDate))) {

         if (!(monthKey >= startMonthKey && monthKey <= endMonthKey)) {

          // if (monthKey >= startMonthKey && monthKey <= endMonthKey)

        //  console.log(`❌ Skipped [${monthKey}] - Date out of range: ${record.date}`);
          passed = false;
        }
        if (status !== "Paid") {
        //  console.log(`❌ Skipped [${monthKey}] - Status not 'Paid': ${status}`);
          passed = false;
        }
        if (actionTo !== "approved") {
         // console.log(`❌ Skipped [${monthKey}] - actionTo not 'approved': ${actionTo}`);
          passed = false;
        }
        if (whoApproved !== "lohwa") {
         // console.log(`❌ Skipped [${monthKey}] - whoApproved mismatch: ${whoApproved}`);
          passed = false;
        }

        if (passed) {
         // console.log(`✅ Included [${monthKey}] - Amount: ${amount}`);
          
          count++;
          total += amount;
        }
      });
    });

     //  console.log("Final Total from JS:", count);
   document.getElementById("countField").textContent = count;
  document.getElementById("totalField").textContent = total.toFixed(2);
// updateFinal();
  });
}









