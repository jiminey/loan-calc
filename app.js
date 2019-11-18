'use strict'


const paymentCalc = function (loanAmount, interestRate, downPayment, loanTermInYears) {
    
    const monthlyInterestRate;

    //calculate monthly interest rate
    //conditional to determine interest rate in percentage or decimal
    if (parseInt(interestRate) === 0) {
        monthlyInterestRate  = interestRate / 12 
    } else {
       monthlyInterestRate = (interestRate / 100) / 12;
    }


    // calculate the monthly payment
    // MonthlyPayment = Principal * ( MonthlyInterest / (1 - (1 + MonthlyInterest)^ -Months))
    return loanAmt * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -(loanTerm))));
};