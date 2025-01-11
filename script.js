// Get references to DOM elements
const input = document.getElementById("amount");
const currencyPara = document.getElementById("rate");
const toCurrency = document.getElementById("to-currency");
const fromCurrency = document.getElementById("from-currency");

// Populate currency dropdowns
countriesCurrencies.forEach((code) => {
  let child = document.createElement("option");
  child.value = code.currency;
  child.textContent = code.country;
  code.country == "PK" && (child.selected = true);
  toCurrency.appendChild(child);
});

countriesCurrencies.forEach((code) => {
  let child = document.createElement("option");
  child.value = code.currency;
  child.textContent = code.country;
  code.country == "US" && (child.selected = true);
  fromCurrency.appendChild(child);
});

// Update flag image
const updateImage = (currencySelector, imgElement) => {
  let name =
    currencySelector.options[currencySelector.selectedIndex].textContent;
  imgElement.src = `https://flagsapi.com/${name}/flat/64.png`;
};

// Convert currency
const convertCurrency = async () => {
  let currencyName = fromCurrency.value;
  let requiredCurrencyName = toCurrency.value;
  const URL = `https://v6.exchangerate-api.com/v6/92b934d0119f8abaf3f99409/latest/${currencyName}`;

  let response = await fetch(URL);
  let data = await response.json();
  let exchangeRate = data.conversion_rates[requiredCurrencyName];
  let amount = input.value;
  let roundedAmount = (amount * exchangeRate).toFixed(2);
  currencyPara.innerText = `${roundedAmount} ${toCurrency.value.toLowerCase()}`;
};

// Event listeners for dropdown changes
fromCurrency.addEventListener("change", () => {
  updateImage(fromCurrency, document.querySelector(".label1 img"));
  convertCurrency();
});

toCurrency.addEventListener("change", () => {
  updateImage(toCurrency, document.querySelector(".label2 img"));
  convertCurrency();
});

// Initial conversion
convertCurrency();
