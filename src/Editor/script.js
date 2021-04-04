//dependencies
let fs = require('fs');
let { spawn,execFile} = require('child_process');
let path = require('path');

//files
let historyFile = require('../History/history.json');
let fsops = require('../../functions/fsops');
let methods = require('./methods/Methods');

//classes
let Helper = new fsops.Operations();
let Methods = new methods.Methods();

//path variables
let pathx = historyFile[historyFile['length']-1].path; 
let outpath = path.dirname(pathx); let rpath = path.join(outpath+"/"+"index.out");


async function load(){
    fs.readFile(pathx, 'utf-8' , async(err,data) => {
        console.log(data);
        document.getElementById("txtarea").innerHTML = data;
    })

    let hashTable = [];

    //recursive find all files in folder
    function traverse(path,x){
        let files = fs.readdirSync(path,{encoding:'utf-8'});
        x+="  "
        for(let i = 0; i<files.length;i++){
            let obj = {path:x,file:files[i]};
            hashTable.push(obj);
            //console.log(x,files[i]);
            let dir = path+"/"+files[i];
            if(fs.lstatSync(dir).isDirectory() && files[i]!="node_modules" && files[i]!=".git"){
                traverse(dir,x);
            }
        }
    }
    
    traverse(outpath,"");

    //display files from the file directory
    for(let i = 0; i<hashTable.length;i++){
        let string = hashTable[i].path + hashTable[i].file;
        var node = document.createElement("P"); 
        var textnode = document.createTextNode(string); node.appendChild(textnode);
        document.getElementById("list").appendChild(node);
    }
};


function save(){
    //get value of #txtarea
        const newtext = document.querySelector("#txtarea").value; 
    //save file
        Methods.save(newtext,pathx,rpath);
}

function run(){
    execFile('g++',[pathx,'-o',rpath],(err,stdout,stderr) =>{
        if(err) document.getElementById("output").innerText = err;
    });
    
    var child = spawn(rpath);
    child.stdin.setEncoding('utf-8');
    var val = document.getElementById("inp").value;

    child.stdin.write(`${val}`);

    child.stdout.on('data', function(data){
        document.getElementById("output").innerText = data.toString();
    });

    child.stderr.on('data', function(data){
        document.getElementById("output").innerText = data.toString();
    });
    child.stdin.end();
}

function fsx(){
    document.getElementById("files").style.display="block";
    document.getElementById("output").style.display = "none";
}

function terminal(){
    document.getElementById("files").style.display="none";
    document.getElementById("output").style.display = "block";
}


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
