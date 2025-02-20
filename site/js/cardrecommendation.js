// cardrecommendation.js - Uses localStorage instead of Firebase

var loggedIn = true; // Always consider user logged in for demo
var uid = 'local-user';
let rakutenData = null;

const categoryFriendlyNames = {
  bill: "Bill Payments",
  drug: "Pharmacies",
  entertainment: "Entertainment",
  gas: "Gas Stations",
  general: "General",
  grocery: "Grocery",
  restaurant: "Restaurant",
  travel: "Travel"
};

const quickCategoryButtons = document.getElementsByClassName("quick-category-btn");

// Initialize data and enable UI
document.addEventListener('DOMContentLoaded', function() {
  // Enable all inputs
  document.getElementById("storeSearchInput").removeAttribute("disabled");
  document.getElementById("storeGeolocateButton").removeAttribute("disabled");

  // Enable all category buttons
  for (let element of quickCategoryButtons) {
    element.removeAttribute("disabled");
    element.setAttribute("onclick", element.getAttribute("onclick-placeholder"));
  }

  // Load Rakuten data
  fetch('rakuten.json')
    .then(response => response.json())
    .then(data => {
      rakutenData = data;
      initializeSearchAutocomplete();
    })
    .catch(err => console.error("Error loading Rakuten data:", err));
});

// Listen for user login/logout events
document.addEventListener('userLoggedIn', function(event) {
  loggedIn = true;
  uid = event.detail.uid;
});

document.addEventListener('userLoggedOut', function() {
  loggedIn = true; // Keep as true for demo
  uid = 'local-user';
});

function recommendCardFromType(placeType) {
  // Highlight selected category button
  for (let element of quickCategoryButtons) {
    if (element.classList.contains("btn-secondary")) {
      element.classList.add("btn-outline-secondary");
      element.classList.remove("btn-secondary");
    }
  }

  if(event && event.srcElement) {
    event.srcElement.classList.add("btn-secondary");
    event.srcElement.classList.remove("btn-outline-secondary");
  }

  // Get user cards from localStorage
  const userData = JSON.parse(localStorage.getItem('userData')) || { cards: {} };
  const userCards = userData.cards || {};

  // Set up suggestion objects
  let cardSuggestions = {
    selectedType: placeType || 'general',
    highestCashBackCard: {
      name: null,
      cashback: {
        bill: -1,
        drug: -1,
        entertainment: -1,
        gas: -1,
        general: -1,
        grocery: -1,
        restaurant: -1,
        travel: -1
      }
    },
    secondCashbackCard: {
      name: null,
      cashback: {
        bill: -1,
        drug: -1,
        entertainment: -1,
        gas: -1,
        general: -1,
        grocery: -1,
        restaurant: -1,
        travel: -1
      }
    }
  };

  // Find best cards for category
  Object.entries(userCards).forEach(([_, checkCard]) => {
    const categoryField = placeType || 'general';
    let categoryValue = 0;

    // Get the correct points field
    if (checkCard.points) {
      if (categoryField === 'drug' && checkCard.points['drug_store']) {
        categoryValue = checkCard.points['drug_store'];
      } else if (categoryField === 'bill' && checkCard.points['bill_payments']) {
        categoryValue = checkCard.points['bill_payments'];
      } else {
        categoryValue = checkCard.points[categoryField] || 0;
      }
    }

    // Check if better than current best
    if (categoryValue > cardSuggestions.highestCashBackCard.cashback[categoryField]) {
      cardSuggestions.secondCashbackCard = cardSuggestions.highestCashBackCard;
      cardSuggestions.highestCashBackCard = checkCard;
      // Update the cashback value for comparison
      cardSuggestions.highestCashBackCard.cashback[categoryField] = categoryValue;
    }
    else if (categoryValue > cardSuggestions.secondCashbackCard.cashback[categoryField]) {
      cardSuggestions.secondCashbackCard = checkCard;
      // Update the cashback value for comparison
      cardSuggestions.secondCashbackCard.cashback[categoryField] = categoryValue;
    }
  });

  // Display results or error
  if(cardSuggestions.highestCashBackCard.name) {
    displayCardSuggestions(cardSuggestions);
  } else {
    document.getElementById("suggestionNoCardsContainer").innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>No cards in your wallet!</strong> We can't give you suggestions without any cards. Head over to the wallet page and add some now!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
  }

  // Hide Rakuten section
  hideRakuten();
}

function displayCardSuggestions(cardSuggestions) {
  if (!cardSuggestions.highestCashBackCard.name) return;

  // Hide previous suggestions
  document.getElementById("bestCardImgCollapse").classList.remove("show");
  document.getElementById("bestCardDescCollapse").classList.remove("show");

  // Set best card name
  document.getElementById("bestCardDescName").innerHTML = cardSuggestions.highestCashBackCard.name;

  // Set card image
  const imgElement = document.getElementById("creditCardPreviewImg");
  imgElement.onload = function() {
    const collapseElement = document.getElementById("bestCardImgCollapse");
    new bootstrap.Collapse(collapseElement, { toggle: false }).show();
  };
  imgElement.src = cardSuggestions.highestCashBackCard.image;

  // Determine reward type and value
  let rewardType = "Cashback";
  if (cardSuggestions.highestCashBackCard.point_type) {
    rewardType = cardSuggestions.highestCashBackCard.point_type;
  }

  const categoryType = cardSuggestions.selectedType;
  const categoryName = categoryFriendlyNames[categoryType] || categoryType;

  // Get the cashback value, handling different field names
  let cashbackValue = 0;
  if (categoryType === 'drug' && cardSuggestions.highestCashBackCard.points['drug_store']) {
    cashbackValue = cardSuggestions.highestCashBackCard.points['drug_store'];
  } else if (categoryType === 'bill' && cardSuggestions.highestCashBackCard.points['bill_payments']) {
    cashbackValue = cardSuggestions.highestCashBackCard.points['bill_payments'];
  } else {
    cashbackValue = cardSuggestions.highestCashBackCard.points[categoryType] || 0;
  }

  // Display cashback info
  document.getElementById("bestCardDescCashback").innerHTML =
    `${categoryName} • ${cashbackValue}%`;
}

// Function to filter cards based on search query
function filterCards(query) {
  const cards = JSON.parse(localStorage.getItem('creditCardInfo'));
  const results = [];

  for (const cardId in cards) {
    const card = cards[cardId];
    if (card.name.toLowerCase().includes(query.toLowerCase())) {
      results.push(card);
    }
  }

  return results;
}

// Function to render search results
function renderSearchResults(results) {
  const searchCardQueryList = document.getElementById('searchCardQueryList');
  searchCardQueryList.innerHTML = '';

  results.forEach(card => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex align-items-center';
    listItem.innerHTML = `
      <img src="${card.image}" alt="${card.name}" class="me-2" style="width: 40px; height: 25px;">
      ${card.name}
    `;
    searchCardQueryList.appendChild(listItem);
  });
}

// Event listener for search input
document.getElementById('searchCardQuery').addEventListener('input', function() {
  const query = this.value;
  const results = filterCards(query);
  renderSearchResults(results);
});