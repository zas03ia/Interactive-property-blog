const countries = {
    "United States": "USD",
    "Portugal": "EUR",
    "Japan": "JPY",
    "Australia": "AUD",
    "Canada": "CAD",
    "India": "INR",
    "United Kingdom": "GBP",
};

// Declare updateCurrency function in global scope
function updateCurrency() {
    const selectedCountry = document.getElementById("country").value;
    document.getElementById("currency").value = countries[selectedCountry];
}

// Declare saveSettings function in global scope
function saveSettings() {
    const selectedCountry = document.getElementById("country").value;
    localStorage.setItem("selectedCountry", selectedCountry);
    document.getElementById("openModalBtn").innerHTML = `<i class="fa-solid fa-globe"></i> ${selectedCountry}`;
    document.getElementById("countryModal").style.display = "none";
}

// Load settings from localStorage on page load
function loadSettings() {
    const countrySelect = document.getElementById("country");
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
        countrySelect.value = savedCountry;
        document.getElementById("currency").value = countries[savedCountry];
        document.getElementById("openModalBtn").innerHTML = `<i class="fa-solid fa-globe"></i> ${savedCountry}`;
    } else {
        countrySelect.value = "United States";
        document.getElementById("currency").value = countries["United States"];
        document.getElementById("openModalBtn").innerHTML = `<i class="fa-solid fa-globe"></i> United States`;
    }
}

// Execute this code once the page loads
window.onload = function() {
    // Open the modal
    document.getElementById("openModalBtn").onclick = function() {
        document.getElementById("countryModal").style.display = "block";
    };

    // Close the modal
    document.querySelector(".country-close").onclick = function() {
        document.getElementById("countryModal").style.display = "none";
    };

    // Populate countries dropdown
    const countrySelect = document.getElementById("country");
    for (const [country, currency] of Object.entries(countries)) {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }

    loadSettings();
};

// Close modal if clicked outside of it
window.onclick = function(event) {
    if (event.target === document.getElementById("countryModal")) {
        document.getElementById("countryModal").style.display = "none";
    }
};