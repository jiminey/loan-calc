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


var errorChecks = function (args) {
    //case for when written in "$140,000" dollar-sign/comma format
    if (isNaN(args.amount)) {
        args.amount = parseFloat(args.amount.replace(/[^0-9\.]+/g, ''));
    }

    // throw errors for strings and unsupported numerical valuess
    if (typeof args.amount === 'undefined' || isNaN(parseFloat(args.amount)) || args.amount <= 0) {
        throw new Error('The loan amount you entered was invalid. Please specify a positive loan amount.');
    }

    if (typeof args.interest === 'undefined' || isNaN(parseFloat(args.interest)) || args.interest < 0) {
        throw new Error('The interest rate you entered was invalid. Please specify a positive interest rate.');
    }

    if (typeof args.downpayment === 'undefined' || isNaN(parseFloat(args.downpayment))) {
        throw new Error('The downpayment you entered was invalid. Please specify your downpayment as 0 or a positive amount.');
    }

    if (typeof args.term === 'undefined' || isNaN(parseFloat(args.term)) || args.term <= 0) {
        throw new Error('The term amount you entered was invalid. Please specify a positive length for your term.');
    }

    return {
        amount: args.amount,
        interest: args.interest,
        downpayment: args.downpayment,
        term: args.term
    };
};

//takes in an object with amount, interest, downpayment, term as keys

exports.monthlyPaymentCalc = function (args) {

    args = errorChecks(args);

    // calculate monthly payment
    const monthlyPayment = monthlyPaymentCalc(args.amount, args.interest, args.downpayment, args.term);

    // round the payment to two decimal places
    return roundNum(monthlyPayment);
};

exports.totalInterest = function (args) {

    args = errorChecks(args);

    // calculate the monthly payment
    var monthlyPayment = paymentCalc(args.amount, args.interest, args.downpayment, args.term);

    // subtract the original loan amount from the total amount paid to get the raw interest paid
    var rawInterest = (monthlyPayment * args.termMonths) - args.amount;

    // round the value to two decimal places
    return roundNum(rawInterest);
};