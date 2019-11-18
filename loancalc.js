"use strict";

function monthlyPaymentCalc(loanAmount, interestRate,downPayment,loanTermInYears) {
  let monthlyInterestRate;

  //Conditional to determine if interest rate is in percentage or decimal form
  if (parseInt(interestRate) === 0) {
    monthlyInterestRate = interestRate / 12;
  } else {
    monthlyInterestRate = interestRate / 100 / 12;
  }

  //Convert terms in years into months
  const monthlyTerm = loanTermInYears * 12;

  //Calculate the monthly payment
  //monthly payment = ((loan amount - down payment) *  monthly interest rate) / (1 - (1 + monthly interest rate)^ -months))
  return (
    ((loanAmount - downPayment) * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -monthlyTerm))
  );
}
 
function errorChecks(args) {

  //Case for human errors uppercases/whitespaces
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

  //Case in which amount is written in dollar-sign/comma format ie. "$140,000"
  if (isNaN(args.amount)) {
    args.amount = parseFloat(args.amount.replace(/[^0-9\.]+/g, ""));
  }

  if (isNaN(args.downpayment)) {
    args.downpayment = parseFloat(args.downpayment.replace(/[^0-9\.]+/g, ""));
  }

  //Case in which interest rate is written with a % symbol
  if (isNaN(args.interest)) {
        args.interest = parseFloat(args.interest)
  }

  //Throw errors for anything but a positive number
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

//Takes in an object, args, with keys: amount, interest, downpayment, term
exports.monthlyPayment = function(args) {
  //Clean and check for human errors
  args = errorChecks(args);

  //Calculate monthly payment
  let monthlyPayment = monthlyPaymentCalc(
    args.amount,
    args.interest,
    args.downpayment,
    args.term
  );

  //Round payment to two decimal places
  monthlyPayment = Math.round(monthlyPayment * 100) / 100;

  return monthlyPayment;
};

exports.totalInterest = function(args) {
  args = errorChecks(args);

  let monthlyPayment = monthlyPaymentCalc(
    args.amount,
    args.interest,
    args.downpayment,
    args.term
  );

  const termsInMonths = args.term * 12;

  //Total interest is remainder of total amount paid subtracted by total amount originally owed
  let totalInterest =
    monthlyPayment * termsInMonths - (args.amount - args.downpayment);

  totalInterest = Math.round(totalInterest * 100) / 100;

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

  //Total payment is monthly payment * amount of monthly terms
  let totalPayment = monthlyPayment * termsInMonths;

  totalPayment = Math.round(totalPayment * 100) / 100;
  
  return totalPayment;
};


exports.all = function (args) {
    args = errorChecks(args);
    
    const monthlyPayment = this.monthlyPayment(args)
    const totalInterest = this.totalInterest(args)
    const totalPayment = this.totalPayment(args)

    //create JSON object
    const JSONobj = {
        "monthly payment":monthlyPayment,
        "total interest":totalInterest,
        "total payment":totalPayment,
    }

    //return stringify of JSON object
    return console.log(JSON.stringify(JSONobj))
}