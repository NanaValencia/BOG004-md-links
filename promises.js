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
let statsReturn = {};
const linkStats = (arrayObject) => {
    const total = arrayObject.length;
    const sizeLinks = arrayObject.map((e) => e.href);
    const uniqueLinks = new Set(sizeLinks);
    const unique = [...uniqueLinks].length;
    statsReturn.total = total;
    statsReturn.unique = unique;
    return statsReturn;
} 

// const optionsView = {};
let validate = '';
let stats = '';
const thirdPosition = () => {
    if(process.argv[3] === '--validate') {
        validate = true;   
    } else if (process.argv[3] === '--stats') {
        stats = true;
    }
    console.log(validate, 'SOY VALIDATE')
    console.log(stats, 'SOY STATS')
}

const validateAndStats = () => {
    if (process.argv[4] === '--stats') {
        stats = true;
    } 
    console.log(linkStats([
        {
          file: './test.md',
          href: 'https://es.wikipedia.org/wiki/Markdown',
          statusCode: 200,
          status: 'Ok',
          text: 'Markdown'
        },
        {
          file: './test.md',
          href: 'https://nodejs.org/',
          statusCode: 200,
          status: 'Ok',
          text: 'Node.js'
        },
        {
          file: './test.md',
          href: 'https://user-image.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
          statusCode: 500,
          status: 'Fail',
          text: 'md-links'
        },
        {
          file: './test.md',
          href: 'https://developers.google.com/v8/',
          statusCode: 200,
          status: 'Ok',
          text: 'motor de JavaScript V8 de Chrome'
        }
      ]
      ), 'soy info basica')
} 
validateAndStats()

// console.log(validate, isValidate);

// const stats = process.argv[4];
// const isStats = stats === '--stats' ? true : false;
// console.log(stats, isStats);

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
        if((validate !== true) && (stats !== true)){
            resolve (res);
        }else if (stats === true) {
            resolve (linkStats(res))
        }
        else {
            resolve(Promise.all(res.map((e) => validateState(e))))
        }  
    })
    .catch((error) => {console.log(error);
        reject('Hubo un problema con la ejecución')
      });
    });
}

mdLinks(userPath, thirdPosition())
.then((res) => {
    console.log(res, 'Esta es la función validar')
})
.catch ((err) => {
    console.log(err, 'cayó en error')
});
