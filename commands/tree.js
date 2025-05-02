const fs = require("fs");
const path = require("path");

function treeFn(dirPath){
    let destpath;
    if(dirPath==undefined){
        // console.log("kindly enter the path");
        treeHelper(process.cwd(),"");
        return;
    }else{ 
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){ 
            treeHelper(dirPath,"");
        }else{
            console.log("kindly enter the the correct path");
            return;
        }
    }
}

function treeHelper(dirPath,indent){
    //is file or folder
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirPath);
        console.log(indent+"├──"+fileName);
    }else{
        let dirName=path.basename(dirPath);
        console.log(indent+"└──"+dirName);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0; i<childrens.length; i++){
            let childpath=path.join(dirPath,childrens[i]);
            treeHelper(childpath,indent+"\t");
        }
    }
}

module.exports={
    treeKey:treeFn
}