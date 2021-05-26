const puppeteer = require("puppeteer");

// puppeteer has promisified functions
// by default headless = true ,we put it false to see opened browser

let browserOpenPromise = puppeteer.launch({headless: false,defaultViewport: null,args: ["--start-maximized"]});
console.log(browserOpenPromise);

browserOpenPromise.then(function(browser){
    console.log("browser is opened !");
    return browser.pages();
})
.then(function(pages){
    let tab = pages[0];
    return tab.goto("https://www.google.com");
})
.then(function(){
    console.log("On google homepage !!")
})