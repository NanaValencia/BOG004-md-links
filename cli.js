/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const {mdLinks} = require('./index.js');

// const routeUnique = process.argv[2];
// console.log('soy route', routeUnique);
const thirdPosition = (options) => {
  let option;
  if(process.argv[3] === '--validate' && process.argv[4] === '--stats'){
    option = {validate:true, stats:true};
  } else if (process.argv[3] === '--stats') {
    option = {stats:true};
  } else if (process.argv[3] === '--validate'){
    option = {validate:true};
  } else {
    option = {};
  }
  return option;
};
 
mdLinks(path = process.argv[2], thirdPosition(process))
.then((res) => {
  console.log(res);
})
.catch((err) => err, 'Esto es un error de mdlink');

module.exports = { mdLinks };