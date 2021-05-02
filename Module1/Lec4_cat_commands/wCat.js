let content = process.argv.slice(2);
let fs = require("fs");

let flags = [];
let files = [];
for( let i=0;i<content.length;i++){
    if(content[i].startsWith('-')){
        flags.push(content[i]);
    }
    else{
        files.push(content[i]);
    }
}
// console.log(flags);
// console.log(files);

//for files output
let fileKaData = "";
for(let i=0;i<files.length;i++){
    fileKaData += fs.readFileSync(files[i]);
    fileKaData += "\r\n";
}
// console.log(fileKaData);

// -n => add count to all lines.
function addLineNumberToAllLines(data){
    for(let i-1;i<data.length+1;i++){
        data[i-1]=`${i}. ${data[i-1]}`;
    } 
    let addedLineNumber = data.join("/n");
    console.log(addedLineNumber);
}
addLineNumberToAllLines(data);

// -b => add count to lines containing some string
let count=1;
function addedLineNumberToEmptyLines(data){
    
}