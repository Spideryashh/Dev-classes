// function body
function fun(){
    console.log("fun says hii frnd have fun!!!");
}

//fun call
fun();

// other method to call function
// in js , function acts like a variable

// this is a function expression
let sayHi = function(){
    console.log("sayHi function says hello fun , have fun too")
}
sayHi(); 

//example of hof(high order function)
function getFirstname(fullName){
    fullName = fullName.split(" ");
    return fullName[0];
}

function getLastname(fullName){
    fullName = fullName.split(" ");
    return fullName[1];
}

function fun2(fullName,cb){
    let name = cb(fullName);
    console.log(name);
}

fun2("Himanshu Sharma",getFirstname);
fun2("Yash Varshney",getLastname)