// fs => file System

const fs = require("fs");

let f1data = fs.readFileSync("./story.txt","utf-8");
console.log(f1data);

fs.writeFileSync("index.txt","Hello is written by code.")