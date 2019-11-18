'use strict'


const monthlyPayment = function (loanAmount, interestRate, downPayment, loanTermInYears) {
    
    const monthlyInterestRate;

    //calculate monthly interest rate
    //conditional to determine interest rate in percentage or decimal
    if (parseInt(interestRate) === 0) {
        monthlyInterestRate  = interestRate / 12 
    } else {
       monthlyInterestRate = (interestRate / 100) / 12;
    }

    const monthlyTerm = loanTermInYears * 12; 

    // calculate the monthly payment
    // monthlyPAyment = principal * ( monthlyInterest / (1 - (1 + monthlyInterest)^ -months))
    return loanAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -(monthlyTerm))));
};