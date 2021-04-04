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

            let obj = {path:x,file:files[i]};

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

            node.appendChild(textnode); document.getElementById("list").appendChild(node);

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
}

module.exports = {Methods};