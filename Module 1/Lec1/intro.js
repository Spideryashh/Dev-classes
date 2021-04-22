// console.log("Hello World"); //for printing

//to run js file -> node filename.js

// Data Types =>
//              Java-> primitive = int,float,double,boolean
//                     Non-primitive = Arrays , stacks

//              Javascrip-> Number(int,float,double) , Boolean , String("",'')

    // format->
        // java => datatype name = value;
        //      eg: int a = 10;

        // javascript => ES6: Ecma Script 6 (two keyword let and const)
        //      eg: let a = 10; You have declared a variable & initialized it
        
        //Dynamic Casting
        // let a = 10;

        // console.log(a);

        // if(true){
        //     let a = 20;
        //     console.log(a);
        // }
        // console.log(a);

        //const => constant -> block scope and constant
        // declare
            // const pi = 3.14;
            // console.log(pi);

    // let c = true;
    // let d = 3.14;
    // let e = 'Hey i am a string';
    // let f ; // by default it's type is undefined

    // Non primitive data types

        //arrays => int[] a = new int[5];

        // let values = [1,3,5,7,9];
        // console.log(values); 

        // add some data in values array(we can add any data type here in array of javascript)
        // values.push("Captain America !!");
        // console.log(values);

        // values.pop();
        // values.pop();
        // console.log(values);
// push -> add value at the end
// pop  -> remove value from the end
// shift-> delete a element from the starting
// unshift-> add a element at the starting

// console.log(values.shift());
// console.log(values);

// objects => key value pairs
// keys => unique

let obj = {
    name:"Yash Varshney",
    place:"Ghaziabad",
    movies:["Game of thrones","falcon and the winter soldier",{
        bestie : "unknown",
        nickname : "yashhu",
        partner : "spiderman",
        weakness : "brainwash"
    }]
}
console.log(obj.movies[2].weakness);
console.log(obj.movies[2].weakness.substring(5));
console.log(obj.movies[2].weakness.substring(1,5));

// get a value of a key in object
    //dot notation = literal check
    // console.log(obj.name);
//    console.log(obj.movies);

    let key = "place";
    //console.log(obj.key); => it will check if there is a keyword named "key"

    // square brackey notation
    obj["place"];
    
    obj.skill = ["martial Arts","taekondo"];
    obj.place = "New York";

 //   console.log(obj);
    