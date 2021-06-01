// async => it can be used before a function name !!
// await => it can be only used inside a async function !!
// IIFE => Immediatery Invoked Function Expression !!

const fs = require("fs");

console.log("start");

async function callMe(){
    console.log("hello yash");
    let f1KaData = fs.promises.readFile("./f1.txt","utf-8");
    let f2KaData = fs.promises.readFile("./f2.txt","utf-8");
    let bothFilesData = await Promise.all([ f1KaData , f2KaData]);
     console.log(bothFilesData);
}
callMe();

console.log("end");