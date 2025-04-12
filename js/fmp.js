function textFormatter(number) {
  let formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedNumber;
}

export function findMortgagePrice(amount, term, rate) {
  let p = amount;
  let r = rate / 100;
  let n = 12;
  let t = term;

  let MonthlyPayment = ((p * (r / n)) / (1 - (1 + r / n) ** (-n * t))).toFixed(
    2
  );
  let TotalPayment = (parseFloat(MonthlyPayment) * n * t).toFixed(2);

  return {
    monthlyPayment: textFormatter(MonthlyPayment),
    totalPayment: textFormatter(TotalPayment),
  };
}
