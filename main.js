// VARIABLES
let amountInput = document.getElementById("amount");
let termInput = document.getElementById("term");
let rateInput = document.getElementById("rate");
let result = document.getElementById("result");

// EVENT LISTENERS
let calculateBtn = document.querySelector(".calculate-repayments");
let amountWrapper = document.querySelector("#amount-wrapper");
let termWrapper = document.querySelector("#term-wrapper");
let rateWrapper = document.querySelector("#rate-wrapper");
let mortageTypeWrapper = document.querySelector(".mortage-type-wrapper");

let mortgageTypes = mortageTypeWrapper.querySelectorAll(".repayment-type");
let errorMsg = mortageTypeWrapper.querySelector(".error-message");

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

    // Xatolikni yashirish
    errorMsg.classList.add("hidden");

    console.log("Tanlangan tur:", purposeForShowValue);
  });
});

// Input faqat raqam qabul qilishi uchun validatsiya
function validateInput(input) {
  let previousValue = input.value;

  input.addEventListener("input", (e) => {
    let inputValue = e.target.value;

    if (!/^\d*\.?\d*$/.test(inputValue)) {
      input.value = previousValue;
    } else {
      previousValue = inputValue;
    }
  });
}

// Uchta input uchun validatsiyani qo‘llash
[amountInput, termInput, rateInput].forEach(validateInput);

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
    formControlEl.classList.add("static-border");

    formIcon.classList.remove("error-bg");
    formIcon.classList.add("static-bg");

    errorMsg.classList.add("hidden");
  }
}

// Formni tekshirish funksiyasi
function sendFormValues() {
  let isAmountValid = amountInput.value.trim() !== "";
  let isTermValid = termInput.value.trim() !== "";
  let isRateValid = rateInput.value.trim() !== "";
  let isPurposeValid = purposeForShowValue !== null;

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

  // Barcha maydonlar to'g'ri bo'lsa, hisoblashni boshlash
  if (isAmountValid && isTermValid && isRateValid && isPurposeValid) {
    console.log("Form muvaffaqiyatli yuborildi!");
  }
}

// function calculateAmount() {
//     let p = amountFunc(amount);
//     let t = termFunc(term);
//     let r = rateFunc(rate) / 100;
//     let n = 12;

//     let Mp = ((p * (r/n))/(1 - (1 + r/n) ** ((-1) * n*t))).toFixed(2);

//     let allPayment = parseFloat(Mp) * n * t
// }
