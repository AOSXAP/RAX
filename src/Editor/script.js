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


async function load(){ 
    document.getElementById("timey").innerHTML = Date();
    document.documentElement.style.setProperty('--main-bg-color',pref.main_color)
    document.documentElement.style.setProperty('--secondary-color',pref.secondary_color)
    document.documentElement.style.setProperty('--third-color',pref.third_color)

    fs.readFile(pathx, 'utf-8' , async(err,data) => {
        console.log(data);
        document.getElementById("txtarea").innerHTML = data;
    })

    //recursive find all files in folder
    Methods.traverse(outpath,"",hashTable);

    //display files from the file directory
    Methods.display();

    [...document.getElementsByTagName('p')].forEach((item) => {
        if(item.id == pathx){
            item.style.color = "white";
        }
        item.addEventListener('click', () => {

            console.log(item);

            let pathData = [item.id,item.id.slice(-3)];

            if(pathData[1] == "cpp"){

                console.log("invocation");
                
                fs.readFile(pathData[0], 'utf-8' , async(err,datax) => {
                    if(err) console.log(err);

                    else document.querySelector("#txtarea").value = datax;
                    [...document.getElementsByTagName('p')].forEach((item) => {
                        item.style.color=pref.secondary_color;
                    })
                    pathx = pathData[0];item.style.color = pref.third_color;    
                })
            }
        })
    })

}



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

var now = new Date().getTime();

//time script
setInterval(()=> {
    var newDate = new Date().getTime();
    var timePast = newDate - now;

    var hours = Math.floor((timePast % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timePast % (1000 * 60 * 60)) / (1000 * 60)); var seconds = Math.floor((timePast % (1000 * 60)) / 1000);
    var time = [hours,minutes,seconds];

    for(let i = 0 ; i <= 2 ; i++){
        if(time[i]<=9){
            time[i] = "0"+time[i];
        }
    }

    document.getElementById("timex").innerHTML = `${time[0]}:${time[1]}:${time[2]}`;
    document.getElementById("timey").innerHTML = Date();
},1000)