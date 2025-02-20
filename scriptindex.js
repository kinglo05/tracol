

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



  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();
  
  const form = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  
  form.addEventListener('submit', (event) => {
      event.preventDefault();
  
     

      const email = document.getElementById('email').value; // Use 'email' instead of 'username'
      const password = document.getElementById('password').value;
     

      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
              const user = userCredential.user;
            
 

              // Get user role from the database
              const userRef = db.ref('mogamit/' + user.uid); 

              console.log("para sa admin " );
              window.location.href = 'home.html';

            /*   userRef.once('value', (snapshot) => {
                  const userData = snapshot.val();
                  const role = userData.role; // Assuming you have a 'role' field in the database
                  console.log("para sa admin " );

                 /*  if (role === 'admin') {
                     // window.location.href = 'home.html';
                     console.log("para sa admin " );

                  } else if (role === 'user') {
                    console.log("para sa user " );
                    //window.location.href = 'claimed.html';

                  } else {
                    console.log("error sa sign-out First " );
                      errorMessage.textContent = 'Unauthorized role.';
                      auth.signOut(); 
                  } 
              }, (error) => { 
                  errorMessage.textContent = error.message;
                  console.log("error sa sign-out " );
                  auth.signOut();
              });
               */
      
             /*  .catch((error) => {
              console.log("error sa kina-ubsan" );
              errorMessage.textContent = error.message; 
        }); */
  });

  })

