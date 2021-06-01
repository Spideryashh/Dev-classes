const puppeteer = require("puppeteer");
const id = "labivos809@sc2hub.com";
const pswd = "87654321";
let challenges = require("./challenges");

async function login(){
    let browser = await puppeteer.launch({
        headless : false ,
        defaultViewport : null ,
        args: ['--start-maximized'],
     });

    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type('#input-1',id);
    await tab.type('#input-2',pswd);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    console.log("logged in !");
    await tab.waitForSelector(".ui-icon-chevron-down.down-icon",{visible:true});
    await tab.click(".ui-icon-chevron-down.down-icon")
    await tab.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']",{visible:true});
    await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await tab.waitForSelector("a[href='/administration/challenges']",{visible:true});
    await tab.click('a[href="/administration/challenges"]');
    let createChallengeElement = await tab.$('.btn.btn-green.backbone.pull-right');
    let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href"); }   ,  createChallengeElement)
    createChallengeLink = "https://www.hackerrank.com"+createChallengeLink;
    // console.log(createChallengeLink);
    let newTab = await browser.newPage();
    await newTab.goto(createChallengeLink);

    let challenge = challenges[0];
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problemStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    await newTab.waitForTimeout(2000);
    await newTab.type("#name" , challengeName);
    await newTab.type("#preview" , description);
    await newTab.type('#problem_statement-container .CodeMirror textarea' , problemStatement);
    await newTab.type('#input_format-container .CodeMirror textarea' , inputFormat);
    await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
    await newTab.type('#output_format-container .CodeMirror textarea' , outputFormat);
    await newTab.type('#tags_tag' , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green'); 
};
login();
