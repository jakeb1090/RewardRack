// loginflow.js - Simplified version that uses localStorage

var loginBtnHtml = `<img style="width: 20px; padding-top:3px; margin-left:3px; margin-right:3px; float: left;" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" /><div class="logintext">Sign in with Google</div>`;
var logoutBtnHtml = `<img style="width: 20px; padding-top:3px; margin-left:3px; margin-right:3px; float: left;" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" /><span class="signouttext">`;
var uid = 'local-user';

// Initialize user data with sample cards
function initializeUserData() {
  if (!localStorage.getItem('userData')) {
    fetch('credit_card_info.json')
      .then(response => response.json())
      .then(creditCardInfo => {
        // Choose three sample cards
        const sampleCards = {};
        const sampleCardKeys = [
          'rbc_cashback_mastercard',
          'td_cash_back_visa_infinite_card',
          'tangerine_money_back'
        ];

        sampleCardKeys.forEach((key, index) => {
          if (creditCardInfo[key]) {
            sampleCards[`card${index+1}`] = creditCardInfo[key];
          }
        });

        // Create default user
        const userData = {
          uid: 'local-user',
          displayName: 'Local User',
          cards: sampleCards
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        simulateSignIn(userData);
      })
      .catch(err => {
        console.error("Error loading credit card data:", err);
        // Create empty user if we can't load cards
        const userData = {
          uid: 'local-user',
          displayName: 'Local User',
          cards: {}
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        simulateSignIn(userData);
      });
  } else {
    simulateSignIn(JSON.parse(localStorage.getItem('userData')));
  }
}

function simulateSignIn(userData) {
  let googleLoginBtn = document.getElementById("google-login-button");
  if (googleLoginBtn) {
    googleLoginBtn.innerHTML = logoutBtnHtml + userData.displayName + "</span>";
    googleLoginBtn.classList.remove("logged-out");
    googleLoginBtn.classList.add("logged-in");
    googleLoginBtn.removeEventListener("click", signInGoogle);
    googleLoginBtn.addEventListener("click", signOut);
  }

  // Signal to other components that user is logged in
  document.dispatchEvent(new CustomEvent('userLoggedIn', {
    detail: userData
  }));
}

function signInGoogle() {
  initializeUserData();
}

function signOut() {
  let googleLoginBtn = document.getElementById("google-login-button");
  googleLoginBtn.innerHTML = loginBtnHtml;
  googleLoginBtn.removeEventListener("click", signOut);
  googleLoginBtn.addEventListener("click", signInGoogle);
  googleLoginBtn.classList.remove("logged-in");
  googleLoginBtn.classList.add("logged-out");

  // Signal to other components that user is logged out
  document.dispatchEvent(new CustomEvent('userLoggedOut'));
  return Promise.resolve();
}

// Auto sign-in on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeUserData();

  let googleLoginBtn = document.getElementById("google-login-button");
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", signInGoogle);
  }
});