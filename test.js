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

//Test for correct monthly total interest paid
exports["A $100,000 loan , with 5.5% interest rate, $20,000 down payment, and 30 year term should have a total intest of $83523.23"] = function(test) {
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
