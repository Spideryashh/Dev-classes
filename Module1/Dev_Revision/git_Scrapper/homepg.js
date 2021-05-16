const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const getTopicProjects = require("./getTopicProjects");

request("https://github.com/topics",function(err,res,data){
    processData(data);
})

// let githubTopics = [];

function processData(html){
    let mydocument = cheerio.load(html);
    let allTopicsDiv = mydocument(".topic-box");
    
    for(let i=0;i<allTopicsDiv.length;i++){
        let topicATag = mydocument(allTopicsDiv[i]).find("a");
        let topicLink = "https://github.com" + topicATag.attr("href");
        let TopicName = topicATag.find(".f3").text().split("\n")[1].trim();
        let topicFolderPath = `./Topics/${TopicName}`;
        fs.mkdirSync(topicFolderPath);
        getTopicProjects(TopicName,topicLink);
    }
    // console.log(githubTopics);
}    