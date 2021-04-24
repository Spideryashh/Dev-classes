let fs = require('fs');
let extensionMapping = require('./util.js');

let testFolderPath = './Downloads';
sortFolder(testFolderPath);

function sortFolder(testFolderPath){
    let allFilse = fs.readdirSync(testFolderPath);

    for(let i=0 ; i<allFiles.length ; i++){
        sortFile(allFiles[i]);
    }

    function sortFile(file){
        let extension = getExtension(file);
        // we can get extension or actual folder name
        if(extension){
        let extensionFolderName = checkExtensionFolder(extension);
        moveFile(file , extensionFolderName );
        }else{
            let testP = testFolderPath + '/' + file;
            sortFolder(testP);
        }
    }

    function getExtension(file){
        let x = file;
        file = file.split(".");
        if(x == file){
            return 0;
        }else{
        return file[1];
        }
        //if there is no splitter in string the whole string will be returnes as it is
    }
}
