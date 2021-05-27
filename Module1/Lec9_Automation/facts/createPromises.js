let fs = require("fs");

function myPromisifiedFun(filePath){
    return new Promise( function(scb,fcb){

        //async func
        fs.readFile( filePath , function(error,data){
            if(error){
                fcb("data nhi aaya");
            }
            else{
                scb("testing success callback");
            }
        })
    });
}

let pendingPromise = myPromisifiedFun("./f1.txt");

pendingPromise.then(function(data){
    console.log(data+"");
});

pendingPromise.catch(function(error){
    console.log(error);
});