// In devclasses main folder 
// npm init -y
// npm install cheerio

const fs = require("fs");
const cheerio = require("cheerio");

let htmlKaData = fs.readFileSync("./recap.html");

let ch = cheerio.load(htmlKaData);//html is loded in cheerio

//In web browser you can directly write -> document.querySelector("h1");
let h1KaData = ch("h1").text();
console.log(h1KaData);