const fs = require("fs");
const cheerio = require("cheerio");

let htmlKaData = fs.readFileSync("./recap.html");

let ch = cheerio.load(htmlKaData);

let pTags = ch("p").text();
console.log(pTags);