// url link
let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

// using npm packages required
const request = require("request");
const cheerio = require("cheerio");

//requesting data from url
request(matchLink,cb);

function cb(error,response,data){
    gethHighestSixes(data);
}

//function for getting highest sixes
function gethHighestSixes(data){
    
    // initializing variables to be used
    let highestSixes;
    let batsmanName;
    let strikeRate;

    //using cheerio for loading url data
    let myDocument = cheerio.load(data);

    //passing selectors to get both batsman table
    let bothBatsmanTable = myDocument(".table.batsman");
    
    //loop for iterating over both teams batsman table
    for(let i=0; i<bothBatsmanTable.length; i++){
        let oneBatsmanTable = myDocument(bothBatsmanTable[i]);

        let allTrs = oneBatsmanTable.find("tbody tr");
        //loop for iterating over rows data 
        for(let j=0;j<allTrs.length;j++){
            let allTds = myDocument(allTrs[j]).find("td");
            if(allTds.length>1){
                // inside valide tr

                //condition for printing required colm result when we are at first row ,which things to be printed
                if(i==0 && j==0){
                    batsmanName = myDocument(allTds[0]).text();
                    highestSixes = myDocument(allTds[6]).text();
                    strikeRate = myDocument(allTds[7]).text();
                }
                //now when we iterate if player has higher no of sixes than the values got updated 
                else{
                    let currentSixes = myDocument(allTds[6]).text();
                    let currentStrikeRate = myDocument(allTds[7]).text();
                    if(currentSixes > highestSixes || (currentSixes == highestSixes && currentStrikeRate > strikeRate)){
                    batsmanName = myDocument(allTds[0]).text();
                    highestSixes = currentSixes;
                    strikeRate = currentStrikeRate;
                    }
                }
            }
        }
    }
    //printing the final result 
    console.log("BatsmanName = " + batsmanName);
    console.log("Sixes = " + highestSixes);
    console.log("StrikeRate ="+ strikeRate); 
}