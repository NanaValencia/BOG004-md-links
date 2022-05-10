const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');

//Esta constante guarda la ruta que se ingresa en consola
const userPath = process.argv[2];

//Para convertir la ruta relativa en absoluta
const pathValidation = (route) => {
    const absoluteRoute = path.resolve(route).normalize();
    if(!path.isAbsolute(userPath)){
        // console.log('La ruta debe ser transformada como absoluta', absoluteRoute);
        return absoluteRoute;
    } else {
        return userPath;
    }
};

//Identifica si el archivo es .md
const identifyFile = (userPath) => {
    const ismdFile = path.extname(pathValidation(userPath)) === '.md';
    return ismdFile;
};

//Función para leer el archivo
const readNewFile = (userPath) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(userPath, 'UTF-8', (error, file) => {
            if (error) {
                throw error;    
            }
            if (!identifyFile(userPath)) {
                reject('No se puede leer el archivo');
            }  

           resolve(file); 
        });
    });
};

//Función para crear el objeto con los datos href, text, file, status y statuscode. Además cambia alive a ok y dead a fail
const validateLink = (objectArray) => {
    return new Promise ((resolve, reject) => {
        const objectLink = objectArray.href;
        linkCheck(objectLink, (error, result) => {
if (error) {
    console.log(error, 'SOY ERROR');
    reject('No fue posible realizar la petición a:' + link);
    return;
}
let statusResponse = '';
if (result.status === 'alive') {
    statusResponse = 'ok';
} else {
    statusResponse = 'Fail';
}
resolve ({
    file: objectArray.file, 
    href: objectArray.href,
    statusCode: result.statusCode, 
    status: statusResponse, 
    text: objectArray.text
     });   
   });
 });
};

//Función que crea la respuesta para --stats con total y unique
const linkStats = (arrayObject) => {
    const total = arrayObject.length;
    const sizeLinks = arrayObject.map((e) => e.href);
    const uniqueLinks = new Set(sizeLinks);
    const unique = [...uniqueLinks].length;
    return {total, unique};
} 

const validateAndStats = (arrayObject, totalUnique) => {
    let broken = arrayObject.filter ((e) => e.status === 'Fail').length;
    //Desestructura el objeto totalUnique para crear uno nuevo que incluya broken 
    return {...totalUnique, broken:broken};
}

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        //Ingresa path
        //Función para convertir la ruta en absoluta
        const absoluteRoute = pathValidation(userPath);
        //Función que evalua si la ruta es un archivo .md
        identifyFile(absoluteRoute);
        //Función que lee el archivo y crea el objeto
        const basicInfoLinks = [];
        readNewFile(absoluteRoute)
        .then((file) => {
            //Se crea una constante para usar la libreria markdownLinkExtractor, para extraer los links
            const { links } = markdownLinkExtractor(file,(extended = true));
            const arrayLinks = links.map((link) => {
            let linksObject = {};
            linksObject.file = userPath,
            linksObject.href = link.href,
            linksObject.text = link.text,
            basicInfoLinks.push(linksObject);
            return linksObject;
        });
        return basicInfoLinks;
         })
    .then((res) => {
        if((options.validate !== true) && (options.stats !== true)){
            return (res);
        }else if ((options.validate === true) && (options.stats === true))  {
            return(Promise.all(res.map((e) => validateLink(e))));
        }
        else if (options.stats === true) {
            return(linkStats(res));
        }  
        else {
            return(Promise.all(res.map((e) => validateLink(e))));
        }
    })
    .then((res) => {
        if((options.validate !== true) && (options.stats !== true)) {
            resolve(res.map((e) => `${e.file} ${e.href} ${e.test}\n`).join(''));  
        } else if ((options.validate === true) && (options.stats === true)) {
            resolve (validateAndStats(res,linkStats(res)));
        } else if (options.stats === true) {
            resolve(`Total: ${res.total}\nUnique: ${res.unique}`);
        } else {
            resolve(res.map((e) => `${e.file} ${e.href} ${e.statusCode} ${e.status} ${e.text}\n`).join(''));
        }
    })
    .catch ((error) => {
        console.log(error);
        reject('hubo un problema con la ejecución');
    });
    //Función que valida el estado de los links
    //Función de estadísticas
});
};
module.exports = mdLinks;

// mdLinks(userPath, thirdPosition())
// .then((res) => {
//     console.log(res, 'Se ha resuelto la promesa')
// })
// .catch ((err) => {
//     console.log(err, 'Cayó en error')
// });

