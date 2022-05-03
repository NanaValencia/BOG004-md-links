const { resolve, extname } = require('path');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
const mdLinkExtractor = require('markdown-link-extractor');
const linkCheck = require('link-check');


const userPath = process.argv[2];

const pathValidation = (route) => {
    const newRoute = path.resolve(route).normalize();
    if(!path.isAbsolute(userPath)){
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

const readNewFile = (userPath) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(userPath, 'UTF-8', (error, file) => {
            if (error){
                reject(error);
                throw error;
            }  

        //     links.forEach(link =>
        //         linkCheck(link, function (err, result){
        //             if (err) {
        //                 console.error(err);
        //                 return;
        //             }
        //             console.log(JSON.stringify(result,null,4));
        //         })
        //    );
           resolve(file);
          
        });
})
}

readNewFile(userPath).then ((file)=>{
    const { links } = mdLinkExtractor(file,extended = true);
    const basicInfoLink = {};
  
    links.forEach((link) => {

        basicInfoLink.href = link.href;
        basicInfoLink.text = link.text;
        basicInfoLink.file = pathValidation(userPath);
        console.log(basicInfoLink.file, basicInfoLink.href, basicInfoLink.text);
    })
});
