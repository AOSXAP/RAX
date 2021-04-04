//dependencies
let fs = require('fs');
let { spawn,execFile} = require('child_process');
let path = require('path');

//files
let historyFile = require('../History/history.json');
let fsops = require('../../functions/fsops');
let methods = require('./methods/Methods');

//classes and helpers
let hashTable = [];
let Helper = new fsops.Operations();
let Methods = new methods.Methods(hashTable);

//path variables
let pathx = historyFile[historyFile['length']-1].path; 
let outpath = path.dirname(pathx); let rpath = path.join(outpath+"/"+"index.out");


async function load(){
    fs.readFile(pathx, 'utf-8' , async(err,data) => {
        console.log(data);
        document.getElementById("txtarea").innerHTML = data;
    })

    //recursive find all files in folder
    Methods.traverse(outpath,"",hashTable);

    //display files from the file directory
    Methods.display();
};


function save(){
    //get value of #txtarea
    const newtext = document.querySelector("#txtarea").value; 
    //save file
    Methods.save(newtext,pathx,rpath);
}

function run(){
    Methods.run(pathx,rpath);
}

function fsx(){Methods.switchx("block","none")}


function terminal(){
    //xdxd
    (() => Methods.switchx("none","block"))();
}

//this makes TAB key to work 
document.getElementById('txtarea').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
  
      this.selectionStart =this.selectionEnd = start + 1;
    }
  });

document.getElementById("sendxx").addEventListener("click",()=>{
    window.location.href="../index.html";
})
