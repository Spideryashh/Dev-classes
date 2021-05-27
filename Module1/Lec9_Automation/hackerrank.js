const puppeteer = require("puppeteer");
const id = "labivos809@sc2hub.com"
const pswd = "87654321"
let tab;

let browserOpenPromise = puppeteer.launch({headless: false,defaultViewport: null,args: ["--start-maximized"]});
console.log(browserOpenPromise);

browserOpenPromise.then(function(browser){
    console.log("browser is opened !");
    return browser.pages();
})
.then(function(pages){
    tab = pages[0];
    return tab.goto("https://www.hackerrank.com/auth/login"); // website homepage to visit
})
// login automate using selectors
.then(function(){
    return tab.type("#input-1",id);
})
.then(function(){
    return tab.type("#input-2",pswd);
})
// button click
.then(function(){
    return tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
})
//wait for pg to update url 
.then(function(){
    return waitAndClick("#base-card-1-link");
})
.then(function(){
    return waitAndClick("a[data-attr1='warmup']");
})
.then(function(){
    return tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});
})
// working on dom 
.then(function(){
    return tab.$$(".js-track-click.challenge-list-item"); //.$$ function helps to run querySelectorAll in dom 
})
.then(function(allQuesArray){
    // [ <a/> <a/> <a/> <a/>]
    let allPendingPromises = [];
    for(let i=0;i<allQuesArray.length;i++){
        let oneATag = allQuesArray[i];
        let pendingPromise = oneATag.evaluate(function(element){  //evaluate runs the function in dom 
            return element.getAttribute("href");
        },oneATag);
        allPendingPromises.push(pendingPromise);
    }
    // [ promise<pending> , promise<pending , promise<pending> , promise<pending>]
    console.log(allPendingPromises);
    let allCombinedPromises = Promise.all(allPendingPromises);
    //promise<pending>
    return allCombinedPromises;
})
.then(function(allQuesLinks){
    console.log(allQuesLinks);
})

.catch(function(err){
    console.log(err);
})

function waitAndClick(selector){
    return new Promise(function(scb,fcb){
        let waitPromise = tab.waitForSelector(selector , {visible: true});
        waitPromise.then(function(){
            return tab.click(selector);    
    })
    .then(function(){
        scb();
    })
    .catch(function(){
        fcb();
    })
    });
}

//js-track-click challenge-list-item