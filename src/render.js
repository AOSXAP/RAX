const {remote} = require('electron');
const { dialog } = remote;
const path = require('path');
const fs = require('fs');
const { BrowserWindow } = require('electron');
const fsops = require('../functions/fsops');
const historyFile = require('./History/history.json');
const Helper = new fsops.Operations();
const save = path.join(__dirname,"/History",'/history.json');

//Menu for opening files
async function Menu(){
    let pathx = path.dirname(__dirname);
    if(!historyFile) {historyFile = []; Menu();}
    
    //Selection Menu
    let options = {
        title : "Select File RAX", 
        defaultPath:pathx,
        buttonLabel : "Open",
        filters:[
            { name: 'All Files', extensions: ['cpp'] }
        ],
        properties: ['openFile','multiSelections']
       }
    
    //Select a file, then get path of it
    const selectedPaths = await dialog.showOpenDialog(remote.getCurrentWindow(),options);
    const newOBJ = {path:selectedPaths.filePaths[0],time:Date.now()}
    
    //If no error
    if(selectedPaths.canceled == false){
        //Add file to json History file and load Editor
        console.log([...historyFile,newOBJ]);
        const newArray = [...historyFile,newOBJ];
        Helper.writeFile(save, JSON.stringify(newArray));
        window.location.href = "./Editor/index.html";
    }else{
        console.log("Failed")
    }

}   

function load(){
    //verify if fileHistory exists and reload if error
    const fileHistoryV = fs.existsSync(__dirname + "/History/history.json");
    console.log(fileHistoryV);
    
    try {
        let r = fs.readFileSync(__dirname + "/History/history.json",'utf-8');
        if(r == "") {fs.writeFileSync(__dirname + "/History/history.json" , "[]");load();}
        
    } catch (error) {
        console.log(error);
        fs.writeFileSync(__dirname + "/History/history.json" , "[]");
        load();
    }

    
    //last 3 items from history are displayed on main menu
    if(fileHistoryV){
        for(let i = 1;i<=3;i++){
            const pathx = historyFile[historyFile['length']-i].path;
            var node = document.createElement("H6"); 
            var textnode = document.createTextNode(pathx);
            node.appendChild(textnode);
            document.getElementById("last").appendChild(node);
        }
    }

    //if element is selected from history , load it
    var elements = document.querySelectorAll("h6");
    elements.forEach((el) => {
        console.log(el);
        el.addEventListener('click',() => {
            const newOBJ = {path:el.innerText,time:Date.now()}
            const newArray = [...historyFile,newOBJ];
            Helper.writeFile(save, JSON.stringify(newArray));
            window.location.href = "./Editor/index.html";
        })
    })

}


