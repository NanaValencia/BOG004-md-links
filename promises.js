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
        console.log('La ruta ahora es absoluta', userPath)
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

//Función para crear el objeto con los datos y cambiar alive a ok y dead a fail
const validateState = (objectArray) => {
    return new Promise ((resolve, reject) => {
        const objectLink = objectArray.href;
        linkCheck(objectLink, (error, result) => {
if (error) {
    console.log(error, 'SOY ERROR');
    return;
}
let statusResponse = '';
if (result.status === 'alive') {
    statusResponse = 'ok';
} else {
    statusResponse = 'fail';
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

const validate = process.argv[3];
const isValidate = validate === '--validate' ? true : false;
console.log(validate);
console.log(isValidate);

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
        if(options.validate !== true){
            resolve (res);
        }else {
            resolve(Promise.all(res.map((e) => validateState(e))))
        }  
    })
    .catch((error) => {console.log(error);
        reject('Hubo un problema con la ejecución')
      });
    });
}

mdLinks(userPath, {validate: isValidate})
.then((res) => {
    console.log(res, 'Esta es la función validar')
})
.catch ((err) => {
    console.log(err, 'cayó en error')
});