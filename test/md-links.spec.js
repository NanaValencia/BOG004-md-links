const {readNewFile} = require('../index.js')
const {pathValidation} = require('../index.js')
const {identifyFile} = require('../index.js')
const {validateLink} = require('../index.js')
const linkCheck = require('link-check')
const { mdLinks } = require('../index.js')
const markdownLinkExtractor = require('markdown-link-extractor')

jest.mock('link-check');
// jest.mock('markdown-link-extractor');

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

describe('mdLinks', () => {
  it('mdLinks sin validate', () => {
    let resultExpect = './testFileTwo.md https://es.wikipedia.org/wiki/Markdown Markdown\n' 
    let path = './testFileTwo.md';
    return mdLinks(path, {validate:false})
    .then(respuesta => {
      expect(respuesta).toBe(resultExpect)
    })
    .catch((err) => console.log(err, 'mensaje de error'));
  })
})

describe('mdLinks', () => {
  it('mdLinks con validate', () => {
    let resultExpect = './testFileTwo.md https://es.wikipedia.org/wiki/Markdown 200 ok Markdown\n' 
    let path = './testFileTwo.md';
    return mdLinks(path, {validate:true})
    .then(respuesta => {
      expect(respuesta).toBe(resultExpect)
    })
    .catch((err) => console.log(err, 'mensaje de error'));
  })
})

describe('mdLinks', () => {
  it('mdLinks con stats', () => {
    let resultExpect = 'Total: 1\nUnique: 1' 
    let path = './testFileTwo.md';
    return mdLinks(path, {stats:true})
    .then(respuesta => {
      expect(respuesta).toBe(resultExpect)
    })
    .catch((err) => console.log(err, 'mensaje de error'));
  })
})

describe('mdLinks', () => {
  it('mdLinks con validate y stats', () => {
    let resultExpect = { total: 1, unique: 1, broken: 0 }
    let path = './testFileTwo.md';
    return mdLinks(path, {validate:true, stats: true})
    .then(respuesta => {
      expect(respuesta).toBe(resultExpect)
    })
    .catch((err) => console.log(err, 'mensaje de error'));
  })
})