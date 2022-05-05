const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const mdLinkExtractor = require('markdown-link-extractor');
const linkCheck = require('link-check');

//Esta constante guarda la ruta que se ingresa en consola
const userPath = process.argv[2];

//Para convertir la ruta relativa en absoluta
const pathValidation = (route) => {
    const absoluteRoute = path.resolve(route).normalize();
    if(!path.isAbsolute(userPath)){
        console.log('La ruta debe ser transformada como absoluta', absoluteRoute);
        return absoluteRoute;
    } else {
        console.log('La ruta ahora es absoluta', userPath)
        return userPath;
    }
};

//Identifica si el archivo es .md
const identifyFile = (userPath) => {
    const mdFile = path.extname(pathValidation(userPath)) === 'md';
    return mdFile;
};

//Función para leer el archivo
const readNewFile = (userPath) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(userPath, 'UTF-8', (error, file) => {
            if (error){
                throw error;
            }
            if (!identifyFile(userPath)) {
                reject('No se puede leer el archivo');
            }  

           resolve(file); 
        });
    });
};

// readNewFile(userPath).then ((file)=>{
//     const { links } = mdLinkExtractor(file,extended = true);
//     const basicInfoLinks = [];
  
//     links.forEach((link) => {
//         const basicInfoLink = {};
//         basicInfoLink.href = link.href;
//         basicInfoLink.text = link.text;
//         basicInfoLink.file = userPath;
//         basicInfoLinks.push(basicInfoLink);
//         console.log(basicInfoLinks);
//     })
// });

