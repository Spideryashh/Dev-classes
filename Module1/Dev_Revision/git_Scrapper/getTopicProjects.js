const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

function getTopicProjects(topicName, topicLink){
request(topicLink,function(error,res,data){
    processData(topicName ,data);
})
}

function processData(topicName,data){
    let mydocument = cheerio.load(data);
    let allProjectH1Tags = mydocument(".f3.color-text-secondary");
    let topicFolderPath = `./Topics/${topicName}`;
    let projectsFile = [];
    for(let i=0;i<10;i++){
        let projectH1Tag = allProjectH1Tags[i];
        let bothATags = mydocument(projectH1Tag).find("a");
        let projectATag = mydocument(bothATags[1]); 
        let projectName = projectATag.text().split("/n")[1].trim();
        let projectLink = "https://www.github.com"+projectATag.attr("href");
        projectsFile.push( {projectName, projectLink});
}    
fs.writeFileSync(`${topicFolderPath}/projects.json`, JSON.stringify(projectATag));
}
module.exports = getTopicProjects;