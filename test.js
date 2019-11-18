let LoanCalc = require("./app.js");

//Test for correct monthly payment
exports["A $100,000 loan , with 5.5% interest rate, $20,000 down payment, and 30 year term should be repaid at $454.23 per month"] = function(test) {
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
exports["A $100,000 loan , with 5.5% interest rate, $20,000 down payment, and 30 year term should have a total interest of $83523.23"] = function(test) {
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
exports["A $100,000 loan , with 5.5% interest rate, $20,000 down payment, and 30 year term should have a total payment of $163523.23"] = function(test) {
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
exports[ "A $100,000 loan , with 0.055 interest rate, $20,000 down payment, and 30 year term should be repaid at $454.23 per month"] = function(test) {
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
  "A $100,000 loan , with 0.055 interest rate, $20,000 down payment, and 30 year term should be repaid at $454.23 per month"
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


//