const cheerio = require("cheerio");
const request = require("request");

let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(matchLink , function(error , response , data){
    processData(data);
})

function processData(html){
    let mydocument = cheerio.load(html);
    let bothInnings = mydocument(".card.content-block.match-scorecard-table .Collapsible");

    for(let i=0; i<bothInnings.length ; i++){
        let oneInning = mydocument(bothInnings[i]);
        
        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName);

        let allTrs = oneInning.find(".table.batsmen tbody tr");
        for(let j=0 ; j<allTrs.length ; j++){
            allTds = mydocument(allTrs[j]).find("td");
            if(allTds.length > 1){
                //batsmanName = allTds[0];
                let batsmanName = mydocument(allTds[0]).text().trim();
                // runs = allTds[2];
                let runs = mydocument(allTds[2]).text().trim();
                let balls = mydocument(allTds[3]).text().trim();
                // fours
                let fours = mydocument(allTds[5]).text().trim();
                // six 
                let sixes = mydocument(allTds[6]).text().trim();
                // sr
                let sr = mydocument(allTds[7]).text().trim();
                console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Four = ${fours} Six = ${sixes} StrikeRate = ${sr}`);
            }
        }
        console.log("#####################################");
    }   
}