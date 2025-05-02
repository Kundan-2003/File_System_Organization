const fs = require("fs");
const path = require("path");

function oraganizeFn(dirPath){
    // console.log("Organize command implementd for ",dirPath);
    //1.input->directory path given 
    let destpath;
    if(dirPath==undefined){
        destpath=process.cwd();
        // console.log("kindly enter the path");
        return;
    }else{ 
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            //2.create->oraganised_files->directory
            destpath =path.join(dirPath,"organized_files");
            if(fs.existsSync(destpath)==false){
                fs.mkdirSync(destpath);
            }
            // path.join
        }else{
            console.log("kindly enter the the correct path");
            return;
        }
    }
    organizeHelper(dirPath,destpath);
}
    function organizeHelper(src,dest){
        //3.identify categories of all the files present in that input directory
        let childnames=fs.readdirSync(src);
        console.log(childnames);
        for(let i=0; i<childnames.length; i++){
            let childAddress=path.join(src,childnames[i]);
            let isFile=fs.lstatSync(childAddress).isFile();
            if(isFile){
                // console.log(childnames[i]);
                let category=getcategory(childnames[i]);
                //4.copy/cut files to that oragnised directory inside of any of category folder
                sendFiles(childAddress,dest,category);
            }
        }
    } 
    function sendFiles(srcFilePath,dest,category){
        let categoryPath=path.join(dest,category); 
        if(fs.existsSync(categoryPath)==false){
            fs.mkdirSync(categoryPath);
        }
        let fileName=path.basename(srcFilePath);
        let destFilepath=path.join(categoryPath,fileName);
        fs.copyFileSync(srcFilePath,destFilepath);
        fs.unlinkSync(srcFilePath);
        console.log(fileName,"copied to ",category);
    }
    function getcategory(name){
        let ext=path.extname(name);
        ext=ext.slice(1);
        // console.log(ext);
        for(let type in types){
            let cTypeArray=types[type];
            for(let i=0; i<cTypeArray.length; i ++){
                if(ext==cTypeArray[i]){
                    return type;
                }
            }
        }
        return "others";
    } 

module.exports={
    organizeKey:oraganizeFn
}