let fs = require("fs");                             // it imports the file system module so that we can use it's functions.
let extensionsMapping = require("./util.js");       //we import data from the other file util.js through module.exports
let testFolderPath = "./Downloads";                 // here we put the main folder path in a variable so that we can use it in our code easily.
let allFiles = fs.readdirSync(testFolderPath);      // it reads all the file in passed path and also allow us to extract the data.

for(let i=0 ; i<allFiles.length ; i++){             // it's a loop which iterate over all the indexes of files.
    sortFile(allFiles[i]);
}

function getExtension(file){                        // function to get extension of the file 
    file = file.split(".");                         // using split function we seprate filename and extension through '.' abc.exe 
    return file[1];                                 // returns the extension 
}

function checkExtensionFolder(extension){
    // extension = "doc";
    let extensionFolderName = testFolderPath;       //we define path of extension folder name to downloads folder
    for(let key in extensionsMapping){              // this loop iterates in documet,imag,video... (extensionMapping keys)
        let extensions = extensionsMapping[key];
        if(extensions.includes(extension)){
            extensionFolderName = extensionFolderName+"/"+key;
            break;
        }
    }
    // extensionFolderName = 'Documents'
    // "./Downloads"
    // let folderToBeChecked = testFolderPath+"/"+extensionFolderName;
    // "./Downloads/Documents"
    let isFolderExist =  fs.existsSync(extensionFolderName);
    if(!isFolderExist){
        fs.mkdirSync(extensionFolderName);
    }
    return extensionFolderName;
}

function moveFile(file , extensionFolderName){
    let sourceFile = testFolderPath+"/"+file;
    let destinationFile = extensionFolderName+"/"+file;
    // copy file from the source path to destination path !!
    fs.copyFileSync(sourceFile , destinationFile);
    // then delete file from the source path !!
    fs.unlinkSync(sourceFile);
}

function sortFile(file){
    let extension = getExtension(file);
    // console.log(extension);
    let extensionFolderName = checkExtensionFolder(extension);
    moveFile(file , extensionFolderName );
}