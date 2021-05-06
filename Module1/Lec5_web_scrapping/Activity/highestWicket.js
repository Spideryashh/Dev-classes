let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

const request = require("request");
const fs = require("fs"); //we use this to get writefilesync function so that we get html data in seprate file.
const cheerio = require("cheerio");
// //request is a high order function

// request(matchLink,cb);

// function cb(error , response , data){
//     // console.log(data)
//     fs.writeFileSync("./match.html",data);
// }

let htmlKaData = fs.readFileSync("./match.html","utf-8");
let myDocument = cheerio.load(htmlKaData);
let bowlingTables = myDocument(".table.bowler");
// console.log(bowlingTables);
fs.writeFileSync("./highestWicketTaker.html",bowlingTables+"");