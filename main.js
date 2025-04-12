import sendFormValues from "./js/sendInput.js";
import { clearAll } from "./js/clear.js";

window.clearAll = clearAll; // Funksiyani global obyektga qo‘shamiz

window.sendFormValues = sendFormValues; // Funksiyani global obyektga qo‘shamiz

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


let activeSection = document.querySelector(".active-section");
let staticSection = document.querySelector(".static-result-section");


let monthlyPrice = activeSection.querySelector(".monthly-price");
let totalPayment = activeSection.querySelector(".total-price");

export {
  amountInput,
  termInput,
  rateInput,
  activeSection,
  staticSection,
  amountWrapper,
  termWrapper,
  rateWrapper,
  purposeForShowValue,
  mortageTypeWrapper,
  monthlyPrice,
  totalPayment
};
