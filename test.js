let LoanCalc = require("./app.js");

//Test for correct monthly payment
exports["Correct monthly payment: A $100,000 loan , with 5.5% interest rate, $20,000 down payment, and 30 year term should be repaid at $454.23 per month"
] = function(test) {
  test.equal(
    LoanCalc.monthlyPayment({
      amount: 100000,
      interest: 5.5,
      downpayment: 20000,
      term: 30
    }),
    454.23
  );
  test.done();
};

//Test for correct total interest paid
exports["Corrent total interest paid: A $100,000 loan , with 5.5% interest rate, $20,000 down payment, and 30 year term should have a total interest of $83523.23"
] = function(test) {
  test.equal(
    LoanCalc.totalInterest({
      amount: 100000,
      interest: 5.5,
      downpayment: 20000,
      term: 30
    }),
    83523.23
  );
  test.done();
};

//Test for correct total payment
exports["Correct total payment: A $100,000 loan , with 5.5% interest rate, $20,000 down payment, and 30 year term should have a total payment of $163523.23"
] = function(test) {
  test.equal(
    LoanCalc.totalPayment({
      amount: 100000,
      interest: 5.5,
      downpayment: 20000,
      term: 30
    }),
    163523.23
  );
  test.done();
};


//Test for interest input as a digit/decimal
exports[ "Correct output with interest in decimal: A $100,000 loan , with 0.055 interest rate, $20,000 down payment, and 30 year term should be repaid at $454.23 per month"
] = function(test) {
  test.equal(
    LoanCalc.monthlyPayment({
      amount: 100000,
      interest: 0.055,
      downpayment: 20000,
      term: 30
    }),
    454.23
  );
  test.done();
};

//Test for interest input as a perecentage (with symbol)
exports[
  "Correct output with interest as a percentage (with symbol %): A $100,000 loan , with 0.055 interest rate, $20,000 down payment, and 30 year term should be repaid at $454.23 per month"
] = function(test) {
  test.equal(
    LoanCalc.monthlyPayment({
      amount: 100000,
      interest: "5.5%",
      downpayment: 20000,
      term: 30
    }),
    454.23
  );
  test.done();
};


//Test for human error Upper cases
exports[
  "Correct output with uppercases: amount as AmOunt"
] = function(test) {
  test.equal(
    LoanCalc.monthlyPayment({
      AmOunt: 100000,
      interest: "5.5%",
      downpayment: 20000,
      term: 30
    }),
    454.23
  );
  test.done();
};

//Test for human error extra white spaces
exports[
  "Correct output with extra white spaces: amount as '   amo  unt  ' "
] = function(test) {
  test.equal(
    LoanCalc.monthlyPayment({
      '   amo  unt  ': 100000,
      interest: "5.5%",
      downpayment: 20000,
      term: 30
    }),
    454.23
  );
  test.done();
};


//Test for correct JSON format output; console.logs(returning consolelog outputs the result in test cases)
exports[
  "Correct JSON format output"
] = function(test) {
  test.equal(
    LoanCalc.all({
      amount: 100000,
      interest: "5.5%",
      downpayment: 20000,
      term: 30
    }),
    console.log(JSON.stringify({
      "monthly payment": 454.23,
      "total interest": 83523.23,
      "total payment": 163523.23
    }))
  );
  test.done();
};
