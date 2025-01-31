// VARIABLES
let amountInput = document.getElementById("amount");
let termInput = document.getElementById("term");
let rateInput = document.getElementById("rate");

// EVENT LISTENERS
let calculateBtn = document.querySelector(".calculate-repayments");
let amountWrapper = document.querySelector("#amount-wrapper");
let termWrapper = document.querySelector("#term-wrapper");
let rateWrapper = document.querySelector("#rate-wrapper");
let mortageTypeWrapper = document.querySelector(".mortage-type-wrapper");
let errorMsg = mortageTypeWrapper.querySelector(".error-message");
let mortgageTypes = mortageTypeWrapper.querySelectorAll(".repayment-type");
let purposeForShowValue = null; // 'interest' yoki 'payment'

mortgageTypes.forEach((type) => {
  type.addEventListener("click", () => {
    // Barcha elementlardan active class va checkboxlarni olib tashlash
    mortgageTypes.forEach((el) => {
      el.classList.remove("active-border", "active-bg-payment");

      let checkboxCircle = el.querySelector(".checkbox-circle");
      let checkbox = el.querySelector(".checkbox");
      let activeCheckbox = el.querySelector(".active-checkbox");

      if (checkboxCircle) checkboxCircle.classList.remove("active-bg");
      if (checkbox) checkbox.classList.remove("hidden");
      if (activeCheckbox) activeCheckbox.classList.add("hidden");
    });

    // Tanlangan elementga active class qo‘shish
    type.classList.add("active-border", "active-bg-payment");

    let checkboxCircle = type.querySelector(".checkbox-circle");
    let checkbox = type.querySelector(".checkbox");
    let activeCheckbox = type.querySelector(".active-checkbox");

    if (checkboxCircle) checkboxCircle.classList.add("active-bg");
    if (checkbox) checkbox.classList.add("hidden");
    if (activeCheckbox) activeCheckbox.classList.remove("hidden");

    // Qiymatni olish
    let label = type.querySelector(".type-label").textContent.trim();
    purposeForShowValue = label === "Repayment" ? "payment" : "interest";
  });
});

function validateInput(input) {
  let previousValue = input.value;
  input.addEventListener("input", (event) => {
    let inputValue = event.target.value;
    if (!/^\d*\.?\d*$/.test(inputValue)) {
      input.value = previousValue;
    } else {
      previousValue = inputValue;
    }
  });
}

// Uchta input uchun validatsiyani qo‘llash
[amountInput, termInput, rateInput].forEach(validateInput);

// Activated form groups
function activeFormGroup(input, inputWrapper) {
  let formControlEl = inputWrapper.querySelector(".form-control-group");
  let formIcon = inputWrapper.querySelector(".form-control-group-icon");

  input.addEventListener("focus", () => {
    formControlEl.classList.add("active-border");
    formControlEl.classList.remove("static-border");

    formIcon.classList.add("active-bg");
    formIcon.classList.remove("static-bg");
  });
}

activeFormGroup(amountInput, amountWrapper);
activeFormGroup(termInput, termWrapper);
activeFormGroup(rateInput, rateWrapper);

// Xatoliklarni ko'rsatish yoki yashirish funksiyasi
function toggleError(inputWrapper, isError) {
  let formControlEl = inputWrapper.querySelector(".form-control-group");
  let formIcon = inputWrapper.querySelector(".form-control-group-icon");
  let errorMsg = inputWrapper.querySelector(".error-message");

  if (isError) {
    formControlEl.classList.add("error-border");
    formControlEl.classList.remove("static-border");

    formIcon.classList.add("error-bg");
    formIcon.classList.remove("static-bg");

    errorMsg.classList.remove("hidden");
  } else {
    formControlEl.classList.remove("error-border");
    formControlEl.classList.remove("active-border");
    formControlEl.classList.add("static-border");

    formIcon.classList.remove("error-bg");
    formIcon.classList.remove("active-bg");
    formIcon.classList.add("static-bg");

    errorMsg.classList.add("hidden");
  }
}

let activeSection = document.querySelector(".active-section");
let staticSection = document.querySelector(".static-result-section");

let monthlyPrice = activeSection.querySelector(".monthly-price");
let totalPayment = activeSection.querySelector(".total-price");

// Formni tekshirish funksiyasi
function sendFormValues() {
  let isAmountValid = amountInput.value.trim() !== "";
  let isTermValid = termInput.value.trim() !== "";
  let isRateValid = rateInput.value.trim() !== "";
  let isPurposeValid = purposeForShowValue !== null;

  let amount = Number(amountInput.value.trim());
  let term = Number(termInput.value.trim());
  let rate = Number(rateInput.value.trim());

  // Inputlarni tekshirish
  toggleError(amountWrapper, !isAmountValid);
  toggleError(termWrapper, !isTermValid);
  toggleError(rateWrapper, !isRateValid);

  // Mortgage turini tekshirish
  let errorMsg = mortageTypeWrapper.querySelector(".error-message");
  if (!isPurposeValid) {
    errorMsg.classList.remove("hidden");
  } else {
    errorMsg.classList.add("hidden");
  }

  // Javab berish
  if (isAmountValid && isTermValid && isRateValid && isPurposeValid) {
    activeSection.classList.remove("hidden");
    staticSection.classList.add("hidden");

    monthlyPrice.textContent =
      "£ " + findMortgagePrice(amount, term, rate).monthlyPayment;
    totalPayment.textContent =
      "£ " + findMortgagePrice(amount, term, rate).totalPayment;
    // clearAll();
  } else {
    console.log("Forma is not submitted due to validation errors");
  }
}

function findMortgagePrice(amount, term, rate) {
  let p = amount;
  let t = term;
  let r = rate / 100;
  let n = 12;

  let Mp = ((p * (r / n)) / (1 - (1 + r / n) ** (-1 * n * t))).toFixed(2);

  let allPayment = (parseFloat(Mp) * n * t).toFixed(2);

  return {
    monthlyPayment: textFormatter(Mp),
    totalPayment: textFormatter(allPayment),
  };
}

function textFormatter(number) {
  let formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedNumber;
}

function clearAll() {
  amountInput.value = "";
  termInput.value = "";
  rateInput.value = "";
  let mortageTypes = mortageTypeWrapper.querySelectorAll(".repayment-type");
  mortageTypes.forEach((type) => {
    if (type.classList.contains("active-border")) {
      console.log(type);
      type.classList.remove("active-border", "active-bg-payment");
      type.querySelector(".checkbox").classList.remove("hidden");
      type.querySelector(".active-checkbox").classList.add("hidden");
    }
  });

  activeSection.classList.add("hidden");
  staticSection.classList.remove("hidden");
}
