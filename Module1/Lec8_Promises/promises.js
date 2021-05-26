const fs = require("fs");

let pendingPromise = fs.promises.readFile("./f1.txt","utf8");
console.log(pendingPromise);

//promise ka object uskai pass 2 function then() and catch()

// then function
pendingPromise.then(function(data){
    console.log("inside scb");
    //console.log(pendingPromise);
    console.log(data+"");
});

// catch function
pendingPromise.catch(function(error){
    console.log("inside fcb");
    console.log(error);
});

// there are 3 types: sync function, async function and promisified function.