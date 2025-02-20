import cclist from '../resource/credit_card_info.json';

// Convert JSON file into JavaScript object
const creditCardList = JSON.parse(JSON.stringify(cclist));

// Store JSON string in local storage
localStorage.setItem('cclist', JSON.stringify(creditCardList));

// Function to render credit card list
function renderCreditCardList() {
    const storedCreditCardListJSON = localStorage.getItem('cclist');
    const storedCreditCardList = JSON.parse(storedCreditCardListJSON);

    const container = document.getElementById('creditCardListContainer');
    container.innerHTML = '';

    storedCreditCardList.cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">Cashback: ${card.cashback}</p>
            </div>
        `;
        container.appendChild(cardElement);
    });
}

// Call the function to render the credit card list
// renderCreditCardList();
console.log('hello there')