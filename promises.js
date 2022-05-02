const { resolve } = require('path');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');

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
pathValidation(userPath);

