// Load credit card data and set up card management functionality
let creditCardInfo, allAvailableCards;

let defaultCard1 = JSON.stringify(td_cash_back_visa_infinite_card)
localStorage.setItem('userData', defaultCard1);


function initializeDefaultCards() {
    // Check if we've already initialized cards
    if (localStorage.getItem('cardsInitialized')) {
      return;
    }

    // Get user data or create new
    const userData = JSON.parse(localStorage.getItem('userData')) || {
      uid: 'local-user',
      displayName: 'Local User',
      cards: {}
    };

    // Only add default cards if user has no cards


    if (Object.keys(userData.cards).length === 0) {
      // Add two default cards from our loaded cardInfo - keep exact same format
      if (window.creditCardInfo) {
        // First default card
        if (creditCardInfo.td_cash_back_visa_infinite_card) {
          // Copy the card exactly as it is in the JSON file
          userData.cards['default_card_1'] = JSON.parse(JSON.stringify(
            creditCardInfo.td_cash_back_visa_infinite_card
          ));
        }
        console.log('userData', userData)

        // Second default card
        if (creditCardInfo.tangerine_money_back) {
          // Copy the card exactly as it is in the JSON file
          userData.cards['default_card_2'] = JSON.parse(JSON.stringify(
            creditCardInfo.tangerine_money_back
          ));
          console.log('userData2', userData)
        }
      }

      // Save updated user data
      localStorage.setItem('userData', JSON.stringify(userData));

      // Mark as initialized so we don't do this again
      localStorage.setItem('cardsInitialized', 'true');
    }
  }

document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Load credit card data
    const response = await fetch('credit_card_info.json');
    creditCardInfo = await response.json();

    // Initialize all available cards for search
    allAvailableCards = Object.entries(creditCardInfo).map(([id, card]) => ({
      id,
      name: card.name,
      bank: card.bank,
      image: card.image,
      ...card
    }));

    // Setup card list
    setupCardList();

    // Setup search
    setupCardSearch();

    // Setup manual card addition
    setupManualAddCard();

    // Fix add card button
    setupAddCardButton();
  } catch (error) {
    console.error("Error loading credit card data:", error);
  }
});

function setupCardList() {
  // Get user cards from localStorage
  const userData = JSON.parse(localStorage.getItem('userData')) || { cards: {} };
  const userCards = userData.cards || {};

  // Get the container
  const container = document.getElementById('userWalletCardsFlex');
  if (!container) return;

  // Find search and add buttons
  const searchButton = container.querySelector('[data-bs-target="#searchCardModal"]');
  const addButton = container.querySelector('[data-bs-target="#signInPromptModal"]');

  // Clear container except for search and add buttons
  Array.from(container.children).forEach(child => {
    if (child.contains(searchButton) || child.contains(addButton)) {
      // Keep these elements
    } else {
      container.removeChild(child);
    }
  });

  // Add user cards
  Object.entries(userCards).forEach(([cardId, cardData]) => {
    const cardElement = createCardElement(cardId, cardData);
    // Insert before the buttons
    if (searchButton && searchButton.parentElement) {
      container.insertBefore(cardElement, searchButton.parentElement);
    } else {
      container.appendChild(cardElement);
    }
  });

  // Move buttons to the end
  if (searchButton && searchButton.parentElement) {
    container.appendChild(searchButton.parentElement);
  }
  if (addButton && addButton.parentElement) {
    container.appendChild(addButton.parentElement);
  }
}

function createCardElement(cardId, cardData) {
  const cardContainer = document.createElement('div');
  cardContainer.className = 'wallet-card-container m-2';
  cardContainer.dataset.cardId = cardId;

  cardContainer.innerHTML = `
    <div class="wallet-card border border-3 position-relative">
      <img src="${cardData.image}" class="img-fluid" alt="${cardData.name}">
      <div class="card-overlay p-2">
        <h5 class="card-title">${cardData.name}</h5>
        <p class="card-bank">${cardData.bank}</p>
      </div>
    </div>
  `;

  cardContainer.querySelector('.wallet-card').addEventListener('click', () => {
    showCardDetails(cardId, cardData);
  });

  return cardContainer;
}

function showCardDetails(cardId, cardData) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('cardDetailsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'cardDetailsModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'cardDetailsModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cardDetailsModalLabel">Card Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-5">
                <img id="detailCardImage" src="" class="img-fluid" alt="Card Image">
              </div>
              <div class="col-md-7">
                <h3 id="detailCardName"></h3>
                <p id="detailCardBank"></p>
                <p id="detailCardType"></p>

                <h4 class="mt-3">Rewards</h4>
                <div id="detailCardRewards"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" id="removeCardBtn">Remove Card</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // Set remove button handler
  document.getElementById('removeCardBtn').onclick = function() {
    removeCard(cardId);
    bootstrap.Modal.getInstance(modal).hide();
  };

  // Update modal content
  document.getElementById('detailCardImage').src = cardData.image;
  document.getElementById('detailCardName').textContent = cardData.name;
  document.getElementById('detailCardBank').textContent = `Bank: ${cardData.bank}`;

  const typeText = cardData.type + (cardData.point_type ? ` - ${cardData.point_type}` : '');
  document.getElementById('detailCardType').textContent = `Type: ${typeText}`;

  // Show rewards
  const rewardsContainer = document.getElementById('detailCardRewards');
  rewardsContainer.innerHTML = '';

  const categoryFriendlyNames = {
    general: "General Purchases",
    restaurant: "Restaurants",
    grocery: "Grocery",
    drug: "Pharmacies",
    drug_store: "Pharmacies",
    gas: "Gas Stations",
    travel: "Travel",
    entertainment: "Entertainment",
    bill_payments: "Bill Payments"
  };

  // Normal rewards
  if (cardData.points) {
    Object.entries(cardData.points).forEach(([category, value]) => {
      if (category === 'store_specific') return;

      const categoryName = categoryFriendlyNames[category] || category;
      if (typeof value === 'number') {
        const rewardItem = document.createElement('div');
        rewardItem.className = 'mb-2';
        rewardItem.innerHTML = `
          <strong>${categoryName}:</strong> ${value}%
        `;
        rewardsContainer.appendChild(rewardItem);
      }
    });
  }

  // Store-specific rewards
  if (cardData.points && cardData.points.store_specific) {
    const storeSpecificHeader = document.createElement('h5');
    storeSpecificHeader.className = 'mt-3';
    storeSpecificHeader.textContent = 'Store Specific Rewards';
    rewardsContainer.appendChild(storeSpecificHeader);

    Object.entries(cardData.points.store_specific).forEach(([storeKey, storeData]) => {
      const storeItem = document.createElement('div');
      storeItem.className = 'mb-2';
      storeItem.innerHTML = `
        <strong>${storeData.name}:</strong> ${storeData.cashback}%
      `;
      rewardsContainer.appendChild(storeItem);
    });
  }

  // Show modal
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}

function removeCard(cardId) {
  // Get user data
  const userData = JSON.parse(localStorage.getItem('userData')) || { cards: {} };

  // Remove card
  delete userData.cards[cardId];

  // Save updated data
  localStorage.setItem('userData', JSON.stringify(userData));

  // Refresh card list
  setupCardList();
}

function setupAddCardButton() {
  // Update add card button to not require login
  const addCardBtn = document.querySelector('#userWalletAddCard');
  if (addCardBtn) {
    addCardBtn.setAttribute('data-bs-target', '#addCardModal');
  }
}

function setupCardSearch() {
  const searchInput = document.getElementById('searchCardQuery');
  const resultsList = document.getElementById('searchCardQueryList');

  if (!searchInput || !resultsList) return;

  // Add styles for dropdown
  const style = document.createElement('style');
  style.textContent = `
    #searchCardQueryList {
      position: absolute;
      z-index: 100;
      width: 100%;
      max-height: 300px;
      overflow-y: auto;
      box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    }

    #searchCardQueryList li {
      cursor: pointer;
    }

    #searchCardQueryList li:hover {
      background-color: #f8f9fa;
    }

    #searchCardQueryContainer {
      position: relative;
    }
  `;
  document.head.appendChild(style);

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();

    // Clear previous results
    resultsList.innerHTML = '';

    if (query.length < 2) return;

    // Find matching cards
    const matches = allAvailableCards.filter(card =>
      card.name.toLowerCase().includes(query) ||
      card.bank.toLowerCase().includes(query)
    ).slice(0, 5);

    // Generate result list with thumbnails
    matches.forEach(card => {
      const item = document.createElement('li');
      item.className = 'list-group-item d-flex align-items-center';

      // Create thumbnail
      const thumbnail = document.createElement('img');
      thumbnail.src = card.image;
      thumbnail.alt = card.name;
      thumbnail.style.width = '50px';
      thumbnail.style.marginRight = '10px';
      thumbnail.style.objectFit = 'contain';

      // Create text container
      const textContainer = document.createElement('div');
      textContainer.className = 'flex-grow-1';

      // Card name and bank
      const cardName = document.createElement('div');
      cardName.className = 'font-weight-bold';
      cardName.textContent = card.name;

      const bankName = document.createElement('small');
      bankName.className = 'text-muted';
      bankName.textContent = card.bank;

      // Assemble elements
      textContainer.appendChild(cardName);
      textContainer.appendChild(bankName);

      item.appendChild(thumbnail);
      item.appendChild(textContainer);

      // Add click handler
      item.addEventListener('click', () => {
        searchInput.value = card.name;
        resultsList.innerHTML = '';
        displaySearchCardPreview(card);
      });

      resultsList.appendChild(item);
    });

    // Show the list if we have results
    if (matches.length > 0) {
      resultsList.style.display = 'block';
    } else {
      resultsList.style.display = 'none';
    }
  });

  // Hide list when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target !== searchInput && e.target !== resultsList) {
      resultsList.style.display = 'none';
    }
  });

  // Setup add button
  const addBtn = document.getElementById('searchCardAddBtn');
  if (addBtn) {
    addBtn.addEventListener('click', function() {
      const currentCardName = searchInput.value;
      if (!currentCardName) return;

      const selectedCard = allAvailableCards.find(card =>
        card.name === currentCardName
      );

      if (selectedCard) {
        addCardToUserData(selectedCard);
        const modal = document.getElementById('searchCardModal');
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          } else {
            $(modal).modal('hide');
          }
        }
      }
    });
  }
}

function displaySearchCardPreview(card) {
  // Show card image
  const previewImg = document.getElementById('searchCardPreviewImg');
  if (previewImg) {
    previewImg.src = card.image;
    previewImg.classList.remove('invisible');
  }

  // Update cashback fields if they exist
  if (card.points) {
    try {
      if (document.getElementById('searchCardFieldGeneralCashback'))
        document.getElementById('searchCardFieldGeneralCashback').value = card.points.general || 0;
      if (document.getElementById('searchCardFieldRestaurantCashback'))
        document.getElementById('searchCardFieldRestaurantCashback').value = card.points.restaurant || 0;
      if (document.getElementById('searchCardFieldGroceryCashback'))
        document.getElementById('searchCardFieldGroceryCashback').value = card.points.grocery || 0;
      if (document.getElementById('searchCardFieldDrugCashback'))
        document.getElementById('searchCardFieldDrugCashback').value = card.points.drug || 0;
      if (document.getElementById('searchCardFieldGasCashback'))
        document.getElementById('searchCardFieldGasCashback').value = card.points.gas || 0;
      if (document.getElementById('searchCardFieldTravelCashback'))
        document.getElementById('searchCardFieldTravelCashback').value = card.points.travel || 0;
      if (document.getElementById('searchCardFieldEntertainmentCashback'))
        document.getElementById('searchCardFieldEntertainmentCashback').value = card.points.entertainment || 0;
      if (document.getElementById('searchCardFieldBillCashback'))
        document.getElementById('searchCardFieldBillCashback').value = card.points.bill_payments || 0;
    } catch (e) {
      console.log("Error setting field values:", e);
    }
  }
}

function setupManualAddCard() {
  // Make saveCard, applyGeneralToBlank and discardCard global
  window.saveCard = saveCard;
  window.applyGeneralToBlank = applyGeneralToBlank;
  window.discardCard = discardCard;

  // Image preview
  const imgPicker = document.getElementById('creditCardImgPickerForm');
  const imgPreview = document.getElementById('creditCardPreviewImg');
  const imgPickerDiv = document.getElementById('creditCardPreviewImgPicker');

  if (imgPicker && imgPreview) {
    imgPicker.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          imgPreview.src = e.target.result;
          imgPreview.classList.remove('invisible');
          if (imgPickerDiv) {
            imgPickerDiv.classList.add('invisible');
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }

  // Form submission - also add direct event listener
  const addCardForm = document.getElementById('addCardForm');
  if (addCardForm) {
    addCardForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveCard();
      return false;
    });
  }
}

function saveCard() {
  // Get form data
  const cardName = document.getElementById('addCardFormName').value;
  if (!cardName) {
    alert('Please enter a card name');
    return false;
  }

  // Parse cashback values with fallbacks
  const generalCashback = parseFloat(document.getElementById('addCardFormGeneralCashback').value) || 0;
  const restaurantCashback = parseFloat(document.getElementById('addCardFormRestaurantCashback').value) || 0;
  const groceryCashback = parseFloat(document.getElementById('addCardFormGroceryCashback').value) || 0;
  const drugCashback = parseFloat(document.getElementById('addCardFormDrugCashback').value) || 0;
  const gasCashback = parseFloat(document.getElementById('addCardFormGasCashback').value) || 0;
  const travelCashback = parseFloat(document.getElementById('addCardFormTravelCashback').value) || 0;
  const entertainmentCashback = parseFloat(document.getElementById('addCardFormEntertainmentCashback').value) || 0;
  const billCashback = parseFloat(document.getElementById('addCardFormBillCashback').value) || 0;

  // Get image
  const imgPreview = document.getElementById('creditCardPreviewImg');
  const cardImage = imgPreview && !imgPreview.classList.contains('invisible') ?
    imgPreview.src : 'https://via.placeholder.com/860x540';

  // Create card data
  const newCard = {
    name: cardName,
    bank: 'Custom',
    image: cardImage,
    type: 'Cashback',
    point_type: false,
    points: {
      general: generalCashback,
      restaurant: restaurantCashback,
      grocery: groceryCashback,
      drug: drugCashback,
      gas: gasCashback,
      travel: travelCashback,
      entertainment: entertainmentCashback,
      bill_payments: billCashback,
      store_specific: false
    }
  };

  console.log("Adding new card:", newCard); // Debug log

  // Add to user data
  addCardToUserData(newCard);

  // Reset form and close modal
  document.getElementById('addCardForm').reset();
  if (imgPreview) {
    imgPreview.classList.add('invisible');
    if (document.getElementById('creditCardPreviewImgPicker')) {
      document.getElementById('creditCardPreviewImgPicker').classList.remove('invisible');
    }
  }

  // Close modal using bootstrap
  const modal = document.getElementById('addCardModal');
  if (modal) {
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
      modalInstance.hide();
    } else {
      $(modal).modal('hide');
    }
  }

  return false; // Prevent form submission
}

function applyGeneralToBlank() {
  const generalValue = document.getElementById('addCardFormGeneralCashback').value;
  if (!generalValue) return;

  const categoryFields = [
    'addCardFormRestaurantCashback',
    'addCardFormGroceryCashback',
    'addCardFormDrugCashback',
    'addCardFormGasCashback',
    'addCardFormTravelCashback',
    'addCardFormEntertainmentCashback',
    'addCardFormBillCashback'
  ];

  categoryFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field && (!field.value || field.value === '0')) {
      field.value = generalValue;
    }
  });
}

function discardCard() {
  // Reset form
  document.getElementById('addCardForm').reset();

  // Reset image preview
  const imgPreview = document.getElementById('creditCardPreviewImg');
  if (imgPreview) {
    imgPreview.classList.add('invisible');
    document.getElementById('creditCardPreviewImgPicker').classList.remove('invisible');
  }
}

function addCardToUserData(card) {
  // Get user data
  const userData = JSON.parse(localStorage.getItem('userData')) || {
    uid: 'local-user',
    displayName: 'Local User',
    cards: {}
  };

  // Generate unique ID
  const cardId = 'card_' + Date.now();
  userData.cards[cardId] = card;

  // Save updated data
  localStorage.setItem('userData', JSON.stringify(userData));

  // Refresh card list
  setupCardList();
}