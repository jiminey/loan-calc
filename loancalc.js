"use strict";

function monthlyPaymentCalc(loanAmount, interestRate,downPayment,loanTermInYears) {
  let monthlyInterestRate;

  //conditional to determine interest rate in percentage or decimal
  if (parseInt(interestRate) === 0) {
    monthlyInterestRate = interestRate / 12;
  } else {
    monthlyInterestRate = interestRate / 100 / 12;
  }

  //convert terms into months
  const monthlyTerm = loanTermInYears * 12;

  //calculate the monthly payment
  //monthlyPayment = ((loan amount - down payment) *  monthlyInterest) / (1 - (1 + monthlyInterest)^ -months))
  return (
    ((loanAmount - downPayment) * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -monthlyTerm))
  );
}
 
function errorChecks(args) {
    const keys = Object.keys(args);
    for (let i = 0; i < keys.length; i++) {
        switch (i) {
            case 0 :
                if (keys[i].toLowerCase().replace(/\s+/g,"") === 'amount'){
                    args.amount = args[keys[i]] 
                }
                break;
            case 1 :
                if (keys[i].toLowerCase().replace(/\s+/g,"") === 'interest'){
                    args.interest = args[keys[i]] 
                }
                break;
            case 2 :
                if (keys[i].toLowerCase().replace(/\s+/g,"") === 'downpayment'){
                    args.downpayment = args[keys[i]] 
                }
                break;
            case 1 :
                if (keys[i].toLowerCase().replace(/\s+/g,"") === 'term'){
                    args.term = args[keys[i]] 
                }
                break;
        }
    }

  //case for when written in "$140,000" dollar-sign/comma format
  if (isNaN(args.amount)) {
    args.amount = parseFloat(args.amount.replace(/[^0-9\.]+/g, ""));
  }

  if (isNaN(args.downpayment)) {
    args.downpayment = parseFloat(args.downpayment.replace(/[^0-9\.]+/g, ""));
  }

  //case for when interest is written with a % symbol
  if (isNaN(args.interest)) {
        args.interest = parseFloat(args.interest)
  }

  // throw errors for anything but a positive number
  if (typeof args.amount === "undefined" || isNaN(parseFloat(args.amount)) || args.amount <= 0) {
    throw new Error(
      "The loan amount you entered was invalid. Please specify a positive loan amount."
    );
  }

  if (typeof args.interest === "undefined" || isNaN(parseFloat(args.interest)) || args.interest < 0) {
    throw new Error(
      "The interest rate you entered was invalid. Please specify a positive interest rate."
    );
  }

  if (typeof args.downpayment === "undefined" || isNaN(parseFloat(args.downpayment))) {
    throw new Error(
      "The downpayment you entered was invalid. Please specify your downpayment as 0 or a positive amount."
    );
  }

  if (typeof args.term === "undefined" || isNaN(parseFloat(args.term)) || args.term <= 0) {
    throw new Error(
      "The term amount you entered was invalid. Please specify a positive length for your term."
    );
  }

  return {
    amount: args.amount,
    interest: args.interest,
    downpayment: args.downpayment,
    term: args.term
  };
}

//takes in an object with amount, interest, downpayment, term as keys

exports.monthlyPayment = function(args) {
  args = errorChecks(args);

  // calculate monthly payment
  let monthlyPayment = monthlyPaymentCalc(
    args.amount,
    args.interest,
    args.downpayment,
    args.term
  );

  // round the payment to two decimal places
  monthlyPayment = Math.round(monthlyPayment * 100) / 100;

  return monthlyPayment;
};

exports.totalInterest = function(args) {
  args = errorChecks(args);

  //calculate monthly payment
  let monthlyPayment = monthlyPaymentCalc(
    args.amount,
    args.interest,
    args.downpayment,
    args.term
  );

  const termsInMonths = args.term * 12;
  //total interest is remainded of total amount paid subtract by total amount originally owed
  let totalInterest =
    monthlyPayment * termsInMonths - (args.amount - args.downpayment);

  totalInterest = Math.round(totalInterest * 100) / 100;
  // round the value to two decimal places
  return totalInterest;
};

exports.totalPayment = function(args) {
  args = errorChecks(args);
  const monthlyPayment = monthlyPaymentCalc(
    args.amount,
    args.interest,
    args.downpayment,
    args.term
  );
  const termsInMonths = args.term * 12;

  let totalPayment = monthlyPayment * termsInMonths;

  totalPayment = Math.round(totalPayment * 100) / 100;
  
  return totalPayment;
};


exports.all = function (args) {
    args = errorChecks(args);
    
    const monthlyPayment = this.monthlyPayment(args)
    const totalInterest = this.totalInterest(args)
    const totalPayment = this.totalPayment(args)

    const JSONobj = {
        "monthly payment":monthlyPayment,
        "total interest":totalInterest,
        "total payment":totalPayment,
    }

    return console.log(JSON.stringify(JSONobj))
}