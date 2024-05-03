const _ = require("lodash");

const add = (n1 , n2) => _.add(n1,n2);

const sub = (n1 , n2) => _.subtract(n1, n2);

const mul = (n1, n2)  => _.multiply(n1, n2);

const div = (n1, n2) => _.divide(n1, n2);


module.exports = {add, sub, mul, div}