Md-Links
===

**Descripción**
Md-Links es una libreria que utiliza Node.js para leer y analizar archivos en formato Markdown y verificar los links que contengan adicionando algunas estadísticas.

**Instrucciones de Uso**
Módulo instalable directamente desde este repositorio de Github via npm install <NanaValencia>/md-links

**Versión**
0.1.0 : Soporte para archivos Markdown, incluye cuatro funcionalidades:

- Sin pasar ninguna opción: Lee el archivo y consigue su ruta absoluta (href), texto que aparece dentro del link (text) y  ruta del archivo donde se encontró el link (file).
- --validate: Valida los links encontrados en el archivo y muestra su status y statuscode.
- --stats: Calcula el total de links y los unicos.
- --validate --stats: Muestra el total de links, los unicos y los rotos.

**Argumentos**
- path: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, debe resolverse como absoluta al directorio desde donde se invoca node - currentworking directory).
- options: Un objeto con las siguientes propiedades:
  - validate: Valor que determina si se desea validar los links encontrados en el archivo.
  - stats: Valor que determina si se desea calcular los stats de de los links encontrados en el archivo.
  - validate and stats: Valores que calculan los stats de los links encontrados incluyendo los rotos.

**CLI (Línea de comando)**
El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente manera a través de la terminal:
node.js <path-to-file> [no options/options]

Por ejemplo:
![No options](C:\Users\ASUS\Desktop\LABORATORIA\BOG004-md-links\img\noOption.jpg)

El comportamiento por defecto, analizar el archivo Markdown e imprimir los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.

*Options*
**--validate**
Si pasamos la opción --validate, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.
![validate](C:\Users\ASUS\Desktop\LABORATORIA\BOG004-md-links\img\validate.jpg)

Vemos que el output en este caso incluye la palabra ok o fail después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.

**--stats**
Si pasamos la opción --stats el output (salida) será un texto con estadísticas básicas sobre los links.
![stats](C:\Users\ASUS\Desktop\LABORATORIA\BOG004-md-links\img\stats.png)

**--validate --stats**
También podemos combinar --stats y --validate para obtener estadísticas que necesiten de los resultados de la validación.
![validateAndStats](C:\Users\ASUS\Desktop\LABORATORIA\BOG004-md-links\img\validateAndStats.png)

Es importante que esta opción se pase siempre en este orden estricto. 

**Keywords**
markdown statdistics links count
