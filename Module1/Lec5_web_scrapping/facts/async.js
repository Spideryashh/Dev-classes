const fs = require("fs");

console.log("start");

//async function => accepts callback
fs.readFile("./f1.txt",function(error, data){
    console.log(data+"");
});

console.log("end");