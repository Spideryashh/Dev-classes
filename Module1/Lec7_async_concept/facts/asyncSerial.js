//multiple files
//async function
//simuntaneously read all the files and get data
// f1=>f2=>f3
const fs = require("fs");

console.log("start");

fs.readFile("./f1.txt",function(error,data){
    console.log(data+"");
    fs.readFile("./f2.txt",function (error,data){
        console.log(data+"");
        fs.readFile("./f3.txt",function (error,data){
            console.log(data+"");
        });        
    });
});

console.log("end");