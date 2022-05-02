const fs = require('fs');

const readNewFile = (path) => {
    return new Promise ((resolve, reject)=> {
        fs.readFile(path, 'UTF-8', (error, file) => {
            if (error){
                reject(error);
                throw error;
            }  
             console.log(file);
             resolve(file);
           });
           console.log('this is a file content');
    })
}
readNewFile('./testFile.md').then (()=>{
    console.log('Im the write function')
});
