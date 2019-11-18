'use strict'


const monthlyPaymentCalc = function (loanAmount, interestRate, downPayment, loanTermInYears) {

    const monthlyInterestRate;

    //calculate monthly interest rate
    //conditional to determine interest rate in percentage or decimal
    if (parseInt(interestRate) === 0) {
        monthlyInterestRate  = interestRate / 12 
    } else {
       monthlyInterestRate = (interestRate / 100) / 12;
    }

    //convert terms into months
    const monthlyTerm = loanTermInYears * 12; 

    //calculate the monthly payment
    //monthlyPAyment = principal * ( monthlyInterest / (1 - (1 + monthlyInterest)^ -months))
    return (loanAmount - downPayment) * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -(monthlyTerm))));
};


var cleanOpts = function (opts) {
    // clean up US currency formatted strings
    if (isNaN(opts.amount)) {
        opts.amount = parseFloat(opts.amount.replace(/[^0-9\.]+/g, ''));
    }

    // throw errors for strings and unsupported numerical valuess
    if (typeof opts.amount === 'undefined' || isNaN(parseFloat(opts.amount)) || opts.amount <= 0) {
        throw new Error('Please specify a loan amount as a positive number');
    }

    if (typeof opts.rate === 'undefined' || isNaN(parseFloat(opts.rate)) || opts.rate < 0) {
        throw new Error('Please specify a loan rate as a number');
    }

    if (typeof opts.termMonths === 'undefined' || isNaN(parseFloat(opts.termMonths)) || opts.termMonths <= 0) {
        throw new Error('Please specify the length of the term as a positive number');
    }

    return {
        amount: opts.amount,
        rate: opts.rate,
        termMonths: opts.termMonths || 360
    };
};

exports.paymentCalc = function (opts) {

    opts = cleanOpts(opts);

    // calculate monthly payment
    const monthlyPayment = monthlyPaymentCalc(opts.amount, opts.rate, opts.termMonths);

    // round the payment to two decimal places
    return roundNum(monthlyPayment);
};

exports.totalInterest = function (opts) {

    opts = errorChecks(opts);

    // calculate the monthly payment
    var monthlyPayment = paymentCalc(opts.amount, opts.rate, opts.termMonths);

    // subtract the original loan amount from the total amount paid to get the raw interest paid
    var rawInterest = (monthlyPayment * opts.termMonths) - opts.amount;

    // round the value to two decimal places
    return roundNum(rawInterest);
};