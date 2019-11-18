let LoanCalc = require("./app.js");

exports[
  "A $100,000 loan , with 5.5% interest rate, $20,000 down payment, and 30 year term should be repaid at $454.23 per month"
] = function(test) {
  test.equal(
    LoanCalc.monthlyPaymentCalc({
      amount: 100000,
      rate: 5.5,
      downpayment: 20000,
      term: 30
    }),
    454.23
  );
  test.done();
};
