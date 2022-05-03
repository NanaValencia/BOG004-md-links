const { resolve, extname } = require('path');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
const mdLinkExtractor = require('markdown-link-extractor');


const userPath = process.argv[2];

const pathValidation = (route) => {
    const newRoute = path.resolve(route).normalize();
    if(!path.isAbsolute(userPath)){
        console.log('la ruta se ha transformado', newRoute);
        return newRoute;
    } else {
        console.log('la ruta es absoluta', userPath)
        return userPath;
    }
}
const identifyFile = (userPath) => {
if (path.extname(pathValidation(userPath))==='.md'){
    console.log('Es un archivo .md')
}else {
    console.log('no se encontró archivo .md');
}
}
identifyFile(userPath);

// const readNewFile = (userPath) => {
//     return new Promise ((resolve, reject) => {
//         fs.readFile(userPath, 'UTF-8', (error, file) => {
//             if (error){
//                 reject(error);
//                 throw error;
//             }  
//              console.log(mdLinkExtractor(file));
//              resolve(file);
//            });
//            console.log('Este es el contenido del archivo')
//     })
// }
// readNewFile(userPath).then (()=>{
//     console.log('si se está leyendo la función')
// });
