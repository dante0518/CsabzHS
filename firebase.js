import './script.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnJLhLO_5-BCBP_w5bVDbZ70BCvQe67VY",
  authDomain: "csabzhs.firebaseapp.com",
  projectId: "csabzhs",
  storageBucket: "csabzhs.appspot.com",
  messagingSenderId: "476878392253",
  appId: "1:476878392253:web:be2bbcaeb7836fcafb20d4",
  measurementId: "G-C2X0JNZWQ6",
   databaseURL: "https://csabzhs-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Function to register a new user
window.register = function() {
  // Get all our inputs
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  // Validate input fields
  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Your credentials do not match the requirements.');
    return;
  }

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Get the signed-in user
      const user = userCredential.user;

      // Add to database
      const databaseRef = ref(database, 'users/' + user.uid);
      // Create user data
      const userData = {
        email: email,
        password: password,
        last_login: Date.now(),
      };

      set(databaseRef, userData)
        .then(() => {
            // Check if .login-popup has the 'active' class and remove it
            const loginPopup = document.querySelector('.login-popup');
            if (loginPopup.classList.contains('active')) {
                loginPopup.classList.remove('active');
            }
            alert('User created, you can now login!');
          //hide popup
        })
        .catch((error) => {
            console.error('Error saving user data:', error);
        });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      alert('Error creating user: ' + error.message);
    });
}


// Attach the login function to the window object
window.login = function() {
    // Get all our inputs
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
  
    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password)) {
      alert('Your credentials do not match.');
      return;
    }
  
    // Authenticate the user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get the signed-in user
        const user = userCredential.user;
  
        // Create user data
        const userData = {
          last_login: Date.now(),
        };
  
        // Add to database
        const databaseRef = ref(database, 'users/' + user.uid);
        update(databaseRef, userData)
          .then(() => {
            alert('User logged in successfully!');

          })
          .catch((error) => {
            console.error('Error updating user data:', error);
          });
      })
      .catch((error) => {
        console.error('Error signing in user:', error);
        alert('Error signing in user: ' + error.message);
      });
  };
  




// VALIDATION

function validateEmail(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateField(field) {
  return field != null && field.length > 0;
}


