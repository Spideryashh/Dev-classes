const puppeteer = require("puppeteer");
const id = "labivos809@sc2hub.com"
const pswd = "87654321"
let tab;
let idx;
let gCode;

let browserOpenPromise = puppeteer.launch({headless: false,defaultViewport: null,args: ["--start-maximized"]});
console.log(browserOpenPromise);

browserOpenPromise.then(function(browser){
    console.log("browser is opened !\n");
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
        let pendingPromise = oneATag.evaluate(function(element){  return element.getAttribute("href");},oneATag);
        allPendingPromises.push(pendingPromise);
    }
    // [ promise<pending> , promise<pending , promise<pending> , promise<pending>]
    // console.log(allPendingPromises);
    let allPromisesCombined = Promise.all(allPendingPromises);
    //promise<pending>
    return allPromisesCombined;
})
.then(function(allQuesLinks){
    let oneQuesSolvePromise = solveQuestion(allQuesLinks[0]);
    for(let i=1;i<allQuesLinks.length;i++){
        oneQuesSolvePromise = oneQuesSolvePromise.then(function(){
            let nextQuesSolvePromise = solveQuestion(allQuesLinks[i]);
            return nextQuesSolvePromise;
        })
    }
    return oneQuesSolvePromise;
})
.then(function(){
    console.log("All  ques solved sucessfully.")
})

.catch(function(err){
    console.log(err);
});

function getCode(){
    return new Promise(function(scb,fcb){
        let waitPromise = tab.waitForSelector(".hackdown-content h3",{visible:true});
        waitPromise.then(function(){
            return tab.$$(".hackdown-content h3");
        })
        .then(function(allCodeNamesElement){
            // [<h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3>]
            let allCodeNamesPromise = [];

            for(let i=0;i<allCodeNamesElement.length;i++){
                let codeNamePromise = tab.evaluate(function(elem){ return elem.textContent;} , allCodeNamesElement[i] );
                allCodeNamesPromise.push(codeNamePromise);
            }
            // allCodeNamesPromise = [Promise<pending> , Promise<pending> ,Promise<pending>];
            let combinedPromise = Promise.all(allCodeNamesPromise);
            // Promise<pending> => Promise[data,data,data]
            return combinedPromise;
        })
        .then(function(allCodeNames){
            //[c++,Python,java]
            for(let i=0;i<allCodeNames.length;i++){
                if(allCodeNames[i] == "C++"){
                    idx = i;
                    break;
                }
            }
            return tab.$$(".hackdown-content .highlight"); //document.querySelectorAll
        })
        .then(function(allCodeDiv){
            // [<div></div , <div></div , <div></div];
            let codeDiv = allCodeDiv[idx];
            return tab.evaluate(function(elem){ return elem.textContent; } ,codeDiv);
        })
        .then(function(code){
            gCode = code;
            scb();
        })
        .catch(function(error){
            fcb(error);
        })
    })
}

function pasteCode(){
    return new Promise(function(scb,fcb){
        let waitAndClickPromise = waitAndClick('.checkbox-input');
        waitAndClickPromise.then(function(){
            return tab.waitForTimeout(2000);
        })
        .then(function(){
            return tab.type('.custominput',gCode);
        })
        .then(function(){
            return tab.keyboard.down("Control");
        })
        .then(function(){
            return tab.keyboard.press("A");
        })
        .then(function(){
            return tab.keyboard.press("X");
        })
        .then(function(){
            return tab.click('.monaco-scrollable-element.editor-scrollable.vs');
        })
        .then(function(){
            return tab.keyboard.press("A");
        })
        .then(function(){
            return tab.keyboard.press("V");
        })
        .then(function(){
            return tab.keyboard.up("Control");
        })
        .then(function(){
            scb();
        })
    })
}

function handleLockButton(){
    return new Promise(function(scb , fcb){
      let waitForLockBtn = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
      waitForLockBtn.then(function(){
        return tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
      })
      .then(function(lockButton){
        return tab.evaluate(function(elem){ return elem.click()  } , lockButton);
      })
      .then(function(){
        // Lock Button Found !!
        console.log("Lock Button Found !!");
        scb();
      })
      .catch(function(){
        // Lock Button Not Found !!
        console.log("Lock Button not found !!");
        scb();
      })
    })
  }

function solveQuestion(quesLink){

    return new Promise(function(scb,fcb){
        let gotoPromise = tab.goto("https://www.hackerrank.com"+quesLink);
        gotoPromise.then(function(){
            return waitAndClick('div[data-attr2="Editorial"]')
        })
        .then(function(){
            return handleLockButton();
        })
        .then(function(){
            return getCode();
        })
        .then(function(){
            // console.log("Get C++ code sucessfully");
            // console.log(gCode);
            return tab.click('div[data-attr2="Problem"]')
        })
        .then(function(){
            return pasteCode();
        })
        .then(function(){
            return tab.click('.ui-btn.ui-btn-normal.ui-btn-primary');
        })
        .then(function(){
            scb();
        })
        .catch(function(error){
            fcb(error);
        })
    });
}

function waitAndClick(selector){
    return new Promise(function(scb,fcb){
        let waitPromise = tab.waitForSelector(selector , {visible: true});
        waitPromise
        .then(function(){
            return tab.click(selector);    
    })
    .then(function(){
        scb();
    })
    .catch(function(){
        fcb();
    });
    });
}
  