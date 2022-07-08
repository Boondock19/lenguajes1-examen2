# Entrega examen 1

## Josè Matìas Gonzàlez Valarezo
### 15-10627

--- 

#### Indicaciones 



En la carpeta Examen1 , se encuentran subcarpetas para cada una de las preguntas del examen, a su vez hay un package.json para poder utilizar scripts para ejecutar los programas (Deben ser utlizados desde el directorio Examen1) , dichos scripts seran especificados a continuación.

##### Nota
Los programas estan hechos en Javascript y python, por lo que para poder ejecutarlos se necesita tener instalado Node.js y python respectivamente.

- `npm run modulo` ejecutara el script para correr el programa de la pregunta 1b-1. En caso de querrer correr directamente el programa sin script se puede realizar con el comando `node ./1/main.js modulo`.

- `npm run matrix` ejecutara el script para correr el programa de la pregunta 1b-2. En caso de querrer correr directamente el programa sin script se puede realizar con el comando `node ./1/main.js matrix`.

- `npm run buddySystem` ejecutara el script para correr el programa de la pregunta 3, en el comando buddySystem esta pasado como argumento en el script tamaño 20 para la memoria, si desea cambiarlo puede hacerlo directamente en el script o puede ejecutar el programa con el comando `node ./3/buddySystem.js <tamañoDeMemoria>` .

- La pregunta 4 fue programada en python, y la libreria que contiene la solucion para la clase cuaternarios es cuaternarios.py. Para poder crear una instancia de las clase Cuaternario se le deben pasar como argumentos los valores a,b,c y d como floats ( Cuaternario(2.0, 5.2 , 11.2 , 3.25) ). Para poder realizar la importacion de la clase Cuaternario debe agregar esta linea al principio de archivo .py `from cuaternarios import Cuaternario`. Adicionalmente el operador & fue reemplazado por el operador unario y prefijo +, ya que python permite hacer sobrecarga de operadores mas no cambiar la cantidad de argumentos de los mismos.Por ultimo junto a la libreria se encuentra un main.py el cual fue utilizado para realizar el desarrollo/prueba de la libreria, puede ser utilizado para probar la libreria, pero si desea hacer modificaciones a como es presentado o que cuaternarios son operados y bajo cuales operandos se debera modificar la estructura del main.py, para poder correrlo debe usar `python ./4/main.py` o en su defecto `npm run cuaternarios`.

- `npm run diagramasT` ejecutara el script para correr el programa de la pregunta 5. En caso de querrer correr directamente el programa sin script se puede realizar con el comando `node ./5/T.js`.

- Para la pregunta 1a y 2 se han agregado un PDF dentro de las carpetas 1 y 2 respectivamente.