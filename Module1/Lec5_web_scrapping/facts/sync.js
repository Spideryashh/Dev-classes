const fs = require("fs");

console.log("start");

let f1KaData = fs.readFileSync("./f1.txt");
console.log(f1KaData+"");

console.log("end");