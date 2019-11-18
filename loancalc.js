let LoanCalc = require("./calculation.js");

const readline = require('readline')

const fs = require('fs');

const readInterface = readline.createInterface({
    //Change pathway to file
    input: fs.createReadStream('./inputs.txt'),
    output: process.stdout,
    console: false
});

let inputObject = {};
let tempKeyValuePair = [];

readInterface.on('line', function (line) {
    if (line.toString() === '') {
        tempKeyValuePair = [];
        LoanCalc.all(inputObject)
        inputObject = {}
    } else {
        tempKeyValuePair = line.split(":")
        inputObject[tempKeyValuePair[0].trim()] = tempKeyValuePair[1].trim().replace(/\s+/g, "");
    }
});
