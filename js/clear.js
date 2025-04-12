import { amountInput, termInput, rateInput, activeSection, staticSection, amountWrapper, termWrapper, rateWrapper } from "../main.js" ;
import toggleActive from "./activate.js";

export function clearAll() {
    // clear all
    amountInput.value = "";
    termInput.value = "";
    rateInput.value = "";
  
    let mortgageTypes = document.querySelectorAll(".repayment-type");
    mortgageTypes.forEach((type) => {
      if (type.classList.contains("active-border")) {
        type.classList.remove("active-border", "active-bg-payment");
        type.querySelector(".checkbox").classList.remove("hidden");
        type.querySelector(".active-checkbox").classList.add("hidden");
      }
    });
  
    activeSection.classList.add("hidden");
    staticSection.classList.remove("hidden");
  
    // Inputlarni tekshirish
    toggleActive(amountWrapper);
    toggleActive(termWrapper);
    toggleActive(rateWrapper);
  
  }