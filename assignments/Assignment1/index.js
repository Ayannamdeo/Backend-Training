const {add, mul, div, sub} = require('./lib/math');
const readlineSync = require('readline-sync');
const fs = require('fs');

const num1 = parseInt(readlineSync.question("Enter the First number : "));
const num2 = parseInt(readlineSync.question("Enter the Second number : "));

const addres = add(num1, num2);
const subres = sub(num1, num2);
const mulres = mul(num1, num2);
const divres = div(num1, num2);

const data = `
Opertaion result
add      : ${addres}
subtract : ${subres}
multiply : ${mulres}
division : ${divres}`

fs.writeFile('./assignments/Assignment1/data.csv', data, 'utf-8', (err)=> {
    if (err) console.log(err);
    else console.log("Data saved");
})
// console.log("somethign");
