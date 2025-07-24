const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromDrop = document.querySelector(".from select");
const toDrop = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with country codes
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Function to update flag image based on selected country
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
};

// Event listener for button click to fetch conversion
btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let amount = document.querySelector(".amount input").value;
    if (amount === "" || isNaN(amount) || amount <= 0) {
        amount = 1;
    }

    const fromCurr = fromDrop.value.toLowerCase();
    const toCurr = toDrop.value.toLowerCase();

    const URL = `${BASE_URL}/${fromCurr}.json`;

    try {
        let res = await fetch(URL);
        let data = await res.json();


        let rate = data[fromCurr][toCurr];

        let converted = (amount * rate).toFixed(2);

        msg.innerText = `${amount} ${fromCurr.toUpperCase()} = ${converted} ${toCurr.toUpperCase()}`;
    } catch (err) {
        msg.innerText = "Error fetching exchange rate.";
        console.error("Fetch error:", err);
    }
});
