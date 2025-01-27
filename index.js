let amount = document.getElementById('amount');
let term = document.getElementById('term');
let rate = document.getElementById('rate');

let calculateBtn = document.getElementById('calculate-button');
let result = document.getElementById('results-section');
console.log(result);
function amountFunc(input) {
    let inputValue = Number(input.value);
    return inputValue;
}

function termFunc(input) {
    let inputValue = Number(input.value);
    return inputValue;
}

function rateFunc(input) {
    let inputValue = Number(input.value);
    return inputValue;
}

function calculateAmount() {
    let p = amountFunc(amount);
    let t = termFunc(term);
    let r = rateFunc(rate) / 100;
    let n = 12;

    let Mp = ((p * (r/n))/(1 - (1 + r/n) ** ((-1) * n*t))).toFixed(2);

    let allPayment = parseFloat(Mp) * n * t
    // result.innerHTML = `Mp: ${Mp}`;
    result.innerHTML = `
        <h2 class="text-light fw-bold">Your Results</h2>
        <p style="font-size: 18px;" class="text-secondary mt-5">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again.</p>
        <div style="width: 90%; height: 35vh; background-color: rgb(6, 6, 48); border-radius: 0 0 18px 18px;" class="m-auto mt-4 p-3">
            <h5 class="text-secondary">Oylik To'lov</h5>
            <h id="monthlyPayment" class="fw-bold text-warning display-4 mt-3">${Mp}</h>
            <div style="width: 100%; height: 2px; background-color: gray;" class="mt-4"></div>
            <h5 class="text-secondary mt-4">Jami Summa</h5>
            <h2 id="totalRepayment" class="fw-bold text-light mt-3">${allPayment}</h2>
        </div>
    `;

    // console.log("p: " + p + " t: " + t + " r: " + r );
}