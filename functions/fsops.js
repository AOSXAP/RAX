const fs = require('fs');
const chalk = require('chalk');
const error = require('./errors/error');

class Operations{
    async readFile(file){
        var datax="a";
    
        await fs.readFile(`${file}`, 'utf-8' , async(err,data) => {
            datax = data;console.log(data);
        })
        
        console.log(datax);
        return datax;
    }

    writeFile(file,content){
        fs.writeFile(`${file}`,`${content}`, (err) => {
            if (err) throw err;
            console.log(chalk.green('Saved!'));
        })
    }

    allFiles(file){
        fs.readdir(file,(err,data)=>{
            if(err) error(err);
            else console.log(data);
        })
    }

    appendFile(file,content){
        fs.appendFile(`${file}`,`${content}`, (err) => {
            if (err) throw err;
            console.log(chalk.green('Data Apended!'));
        })
    }
}

module.exports = {Operations}