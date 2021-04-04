class Methods{
    save(newtext,pathx,rpath){
        fs.writeFile(pathx,newtext,(err) => {
            err ? console.log(err) : null;
        });
       
        execFile('g++',[pathx,'-o',rpath],(err,stdout,stderr) =>{
            err ? err : null;
        });
        
    }
}

module.exports = {Methods};