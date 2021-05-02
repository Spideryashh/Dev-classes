// fs => file System

const fs = require("fs");

let f1data = fs.readFileSync("./story.txt","utf-8"); //it reads the file and bring the data
//console.log(f1data);

fs.writeFileSync("index.txt","Hello is written by code."); // it put the data in the given filename if it doesn't exist than it creates the folder .

fs.writeFileSync("../activity/activity.js","HEllo world again.");

