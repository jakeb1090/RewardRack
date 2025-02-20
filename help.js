console.log('help.js loaded');
document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");
  const dropdown = document.getElementById("dropdown");

  // Load JSON data from localStorage
  let creditCards = JSON.parse(localStorage.getItem("creditCards")) || [];

  // Function to display dropdown results
  function showResults(filteredCards) {
      dropdown.innerHTML = ""; // Clear previous results

      if (filteredCards.length === 0) {
          dropdown.style.display = "none";
          return;
      }

      dropdown.style.display = "block";
      filteredCards.forEach(card => {
          const item = document.createElement("li");
          item.innerHTML = `
              <img src="${card.image}" alt="${card.name}" width="40">
              <span>${card.name} - ${card.bank}</span>
          `;
          item.addEventListener("click", () => {
              searchBar.value = card.name;
              dropdown.style.display = "none";
          });
          dropdown.appendChild(item);
      });
  }

  // Event listener for search input
  searchBar.addEventListener("input", function () {
      const query = searchBar.value.toLowerCase();
      const filteredCards = creditCards.filter(card =>
          card.name.toLowerCase().includes(query) || card.bank.toLowerCase().includes(query)
      );
      showResults(filteredCards); // Ensure showResults() is used here
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (event) {
      if (!searchBar.contains(event.target) && !dropdown.contains(event.target)) {
          dropdown.style.display = "none";
      }
  });
});
