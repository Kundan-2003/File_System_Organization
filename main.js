#!/usr/bin/env node

let inputArr=process.argv.slice(2);
console.log(inputArr);
let fs=require("fs");
let path =require("path");
let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");
//functions of project:-
//node main.js tree directoryPath 
//node main.js organize directoryPath
//node main.js help

let command =inputArr[0];
let types={
    media:["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg','deb']
}
switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "oraganize":
        oraganizeObj.oraganizeKey(inputArr[1]);
        break; 
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("please,enter right command");
        break;
}

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












//path:-C:\Users\kunda\Downloads