import {
  purposeForShowValue,
  amountInput,
  termInput,
  rateInput,
  amountWrapper,
  termWrapper,
  rateWrapper,
  activeSection,
  staticSection,
  mortageTypeWrapper,
  totalPayment,
  monthlyPrice
} from "../main.js";
import { toggleError } from "./error.js";
import { findMortgagePrice } from "./fmp.js";

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

  if (isRateValid && isPurposeValid && isTermValid && isRateValid) {
    activeSection.classList.remove("hidden");
    staticSection.classList.add("hidden");

    monthlyPrice.textContent =
      "£ " + findMortgagePrice(amount, term, rate).monthlyPayment;
    totalPayment.textContent =
      "£ " + findMortgagePrice(amount, term, rate).totalPayment;
  } else {
    console.log("Form is not valid");
  }
}

export default sendFormValues;
