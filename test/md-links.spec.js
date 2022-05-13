const {readNewFile} = require('../index.js')
const {pathValidation} = require('../index.js')
const {identifyFile} = require('../index.js')
const {validateLink} = require('../index.js')
const linkCheck = require('link-check')

jest.mock('link-check');

describe('pathValidation', () => {
  it('debería retornar una ruta absoluta', () =>{
    expect(pathValidation('./prueba.md')).toEqual('C:\\Users\\ASUS\\Desktop\\LABORATORIA\\BOG004-md-links\\prueba.md')
  })
});

describe ('Prueba de lectura de archivo', () => {
  it('Función read resuelta', async () => {
    await expect(readNewFile('C:\\Users\\ASUS\\Desktop\\LABORATORIA\\BOG004-md-links\\test\\prueba.md')).resolves.toBe('Este es un archivo de prueba');
  })
});


const objectTest =
{
  file: './testFile',
  href: 'http://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown'
}
const objectResolve =
{
  file: './testFile',
  href: 'http://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  statusCode: 200,
  status: 'ok'
}

describe('Prueba para validar el estado de los links', () => {
  const linkCheck = require('link-check')
  it('validateLink', () => 
    validateLink(objectTest)
    .then((objectResolve) => {
      expect(objectResolve.statusCode).toBe(200);
    })
    .catch((err) => console.log(err, ('Está cayendo en el error')))

  );

describe('prueba para validar el estado de los links', () => {
  const linkCheck = require('link-check')
  it('validateLink', async () => {
    await expect(validateLink(objectTest)).resolves.toEqual(objectResolve)})
})
});