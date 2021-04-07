const syntaxHighlighter = require('../Highlighting/syntaxHighlighter');

class Methods{
    constructor(hashTable){
        this.hashTable = hashTable;
    }

    save(newtext,pathx,rpath){
        fs.writeFile(pathx,newtext,(err) =>  err ? console.log(err) : null);
       
        execFile('g++',[pathx,'-o',rpath],(err,stdout,stderr) => err ? err : null);
        
    }

    traverse(path,x){
        let files = fs.readdirSync(path,{encoding:'utf-8'}); x+="  ";

        for(let i = 0; i<files.length;i++){

            let obj = {path:x,file:files[i],root:path};

            this.hashTable.push(obj);

            let dir = path+"/"+files[i];

            if(fs.lstatSync(dir).isDirectory() && files[i]!="node_modules" && files[i]!=".git"){
                this.traverse(dir,x);
            }
        }
    }

    display(){
        for(let i = 0; i<this.hashTable.length;i++){

            let string = hashTable[i].path + hashTable[i].file;

            var node = document.createElement("P"); var textnode = document.createTextNode(string);

            node.setAttribute("id",hashTable[i].root + "/" + hashTable[i].file);

            node.appendChild(textnode); 

            document.getElementById("list").appendChild(node);

        }
    }

    run(pathx,rpath){
        execFile('g++',[pathx,'-o',rpath],(err,stdout,stderr) =>{
            err ? document.getElementById("output").innerText = err : null;
        });
        
        var child = spawn(rpath); child.stdin.setEncoding('utf-8');
        var val = document.getElementById("inp").value;  child.stdin.write(`${val}`);
    
        child.stdout.on('data', (data) => document.getElementById("output").innerText = data.toString());

        child.stderr.on('data', (data) => document.getElementById("output").innerText = data.toString());

        child.stdin.end();
    }

    switchx(a,b){
        document.getElementById("files").style.display=a;
        document.getElementById("output").style.display = b;
    }

    color(pref){
        [...document.getElementsByTagName('p')].forEach((item) => {
            if(item.id == pathx){
                item.style.color = "white";
            }else{
                item.style.color=pref.secondary_color;
            }
            item.addEventListener('click', () => {
    
                console.log(item);
    
                let pathData = [item.id,item.id.slice(-3)];
    
                if(pathData[1] == "cpp"){
    
                    console.log("invocation");
                    
                    fs.readFile(pathData[0], 'utf-8' , async(err,datax) => {
                        if(err) console.log(err);
                        else{
                            let data = syntaxHighlighter(datax);document.getElementById("txtarea").innerHTML = data;
                        }

                        [...document.getElementsByTagName('p')].forEach((item) => {
                            
                            item.style.color=pref.secondary_color;

                        })
                        
                        pathx = pathData[0];item.style.color = pref.third_color;    
                    })
                }
            })
        })
    }

    timeHandler(){
        var newDate = new Date().getTime(); var timePast = newDate - now;
    
        var hours = Math.floor((timePast % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
        var minutes = Math.floor((timePast % (1000 * 60 * 60)) / (1000 * 60));  var seconds = Math.floor((timePast % (1000 * 60)) / 1000);
        var time = [hours,minutes,seconds];
    
        for(i in time) time[i]<= 9 ? time[i] = "0"+time[i] : null;
    
        document.getElementById("timex").innerHTML = `${time[0]}:${time[1]}:${time[2]}`; document.getElementById("timey").innerHTML = Date();
    }
}

module.exports = {Methods};