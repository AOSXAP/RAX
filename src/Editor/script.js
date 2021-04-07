//dependencies
let fs = require('fs');
let { spawn,execFile} = require('child_process');
let path = require('path');

//files
let historyFile = require('../History/history.json');
let fsops = require('../../functions/fsops');
let methods = require('./methods/Methods');
let pref = require('../History/preferances.json');

//classes and helpers
let hashTable = [];
let Helper = new fsops.Operations();
let Methods = new methods.Methods(hashTable);

//path variables
let pathx = historyFile[historyFile['length']-1].path; 
let outpath = path.dirname(pathx); let rpath = path.join(outpath+"/"+"index.out");


//Highlighting functions
let syntaxHighlighter = require('./Highlighting/syntaxHighlighter');
let dH = require('./Highlighting/dynamicH');

//variables
let prefs = [pref.main_color,pref.secondary_color,pref.third_color]; 
let bs = ['--main-bg-color','--secondary-color','--third-color'];

async function load(){ 

    document.getElementById("timey").innerHTML = Date();

    for(i in bs) document.documentElement.style.setProperty(bs[i],prefs[i]);
    
    fs.readFile(pathx, 'utf-8' , async(err,data) => {
        data = syntaxHighlighter(data)
        document.getElementById("txtarea").innerHTML = data;
    })

    //recursive find all files in folder
    Methods.traverse(outpath,"",hashTable);

    //display files from the file directory
    Methods.display();

    //Color the active file
    Methods.color(pref)
}

function save(){
    const newtext = document.querySelector("#txtarea").innerText; //get value of #txtarea
    console.log( document.querySelector("#txtarea").innerText,  document.querySelector("#txtarea").innerHTML);
    Methods.save(newtext,pathx,rpath); //save file
}

function run(){
    Methods.run(pathx,rpath);
}

function fsx(){Methods.switchx("block","none")}


function terminal(){(() => Methods.switchx("none","block"))()}

let keys = [')','(',';','>','<'];

document.getElementById('txtarea').addEventListener('keydown', function(e) {

    //Dynamic Highlighting
    for(i in keys){
        if(e.key == keys[i]){
            let el = e.key;  el == "<" ? el='&lt;' : (el == ">" ? el = '&gt;' : el = el);
            dH(pref.secondary_color,el);
        }
    }
  });

document.getElementById("sendxx").addEventListener("click",()=>{
    window.location.href="../index.html";
})

var now = new Date().getTime();

//time script
setInterval(()=> {
    Methods.timeHandler()
},1000)