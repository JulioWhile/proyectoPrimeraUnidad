/**
 * Nombre: Contreras Islas Julio César
 * ID: 00000177238
 * Docente: Ramses González
 * Primer proyecto.
 */
const readLine = require('readline-sync');
const fileReader = require('fs');
const regexOpcion = new RegExp(/^([1-8])$/i);
const regexValores = new RegExp(/^([0-9]){1,3}$/i);
const route = 'pruebas.txt';
var array = [];

preguntaOpcion();

/**
 * Esté metodo es encargado de preguntar la opción al usuario, la opción
 * será pasada como parametro al método "seleccionaOpción()."
 */
function preguntaOpcion() {
    console.log(`
        Bienvenido a este Humilde proyecto.
        1. INGRESAR ELEMENTO EN ARREGLO
        2. ELIMINAR UN ELEMENTO EN EL ARREGLO (null)
        3. EDITAR UN ELEMENTO EN EL ARREGLO
        4. BUSCAR ELEMENTO
        5. IMPRIMIR DADO UN INDICE
        6. IMPRIMIR TODO EL ARREGLO
        7. IMPRIMIR SUMA y PROMEDIO
        8. SALIR
        \n
    `);

    let opcion = parseInt(readLine.question("Que opcion desea abrir?: "));
    
    if(regexOpcion.test(opcion) === true) {
        seleccionaOpcion(opcion);
    } else {
        console.log("Dato incorrecto, intente de nuevo...");
        preguntaOpcion();
    }
}
/**
 * Este método se encarga de recibir del método "PreguntaOpcion()" el
 * número de opción que será elegido por el usuario.
 * @param opcion Opción dada por el usuario.
 */
function seleccionaOpcion(opcion) {
    switch (opcion) {
        case 1:
            agregarDatos();
            break;
        case 2:
            eliminaDato();
            break;
        case 3:
            editaDato();
            break;
        case 4:
            buscarDato();
            break;
        case 5:
            buscarDatoIndice();
            break;
        case 6:
            imprimirArreglo();
            break;
        case 7:
            impresionesExtras();
            break;
        case 8:
            break;
    }
}

/**
 * Este método se encarga de agregar al arreglo "array" el número dado por
 * el usuario.
 */
function agregarDatos() {
    let valor = parseInt(readLine.question("Numero que desea agregar? (entre 0 y 999): "));
    
    if(regexValores.test(valor) === true) {
        array.push(valor);
        console.log(array);
        preguntaOpcion();

    } else {
        console.log("Valor fuera de los límites permitidos.");
        agregarDatos();
    }
}
/**
 * Este método se encarga de preguntar al usuario un indice del arreglo, buscarlo
 * y convertirlo a null.
 */
function eliminaDato() {
    if(array.length === 0) {
        console.log("No existen datos, regresando...");
        preguntaOpcion();
    }

    let valor = parseInt(readLine.question(`Posicion que desea eliminar? (minima: 0 - maxima: ${array.length - 1}): `));
    if (valor < 0 || valor > array.length - 1) {
        console.log("Valor no permitido...");
        eliminaDato();

    } else {
        for (let i = 0; i <= valor; i++) {
            if (i === valor) {
                array[i] = null;
            }
        }
        console.log(array);
        preguntaOpcion();
    }
}
/**
 * Este método se encarga de preguntar al usuario un indice del arreglo, buscarlo
 * y editarlo al nuevo valor dado.
 */
function editaDato() {
    if(array.length === 0) {
        console.log("No existen datos, regresando...");
        preguntaOpcion();
    }

    let valor = parseInt(readLine.question(`Posicion que desea editar? (minima: 0 - maxima: ${array.length - 1}): `));
    if (valor < 0 || valor > array.length - 1) {
        console.log("Valor no permitido...");
        editaDato();

    } else {
        let nuevoDato = parseInt(readLine.question("Indique el nuevo valor: "));
        for (let i = 0; i <= valor; i++) {
            if (i === valor) {
                array[i] = nuevoDato;
            }
        }

        console.log(array);
        preguntaOpcion();
    }
}
/**
 * Este método se encarga de preguntar al usuario un valor del arreglo, buscarlo
 * e imprimir el indice donde se encuentra.
 */
function buscarDato() {
    if(array.length === 0) {
        console.log("No existen datos, regresando...");
        preguntaOpcion();
    }

    let valor = parseInt(readLine.question(`Dato que desea buscar?: `));

    if(regexValores.test(valor) === true) {
        var index = array.indexOf(valor);
        console.log("El inidice es: ", index);

        preguntaOpcion();
    } else {
        console.log("Valor fuera de los límites permitidos.");
        preguntaOpcion();
    }
}
/**
 * Este método se encarga de preguntar al usuario un indice del arreglo, buscarlo
 * e imprimir el valor que tiene esa posición.
 */
function buscarDatoIndice() {
    if(array.length === 0) {
        console.log("No existen datos, regresando...");
        preguntaOpcion();
    }

    let valor = parseInt(readLine.question(`Posicion que desea imprimir? (minima: 0 - maxima: ${array.length - 1}): `));
    
    if (valor < 0 || valor > array.length - 1) {
        console.log("Valor no permitido...");
        buscarDatoIndice();

    } else {
        for (let i = 0; i <= valor; i++) {
            if (i === valor) {
                console.log("El valor solicitado es el", array[i]);
            }
        }

        preguntaOpcion();
    }
}
/**
 * Este método se encarga de imprimir los valores contenidos en el arreglo "array".
 */
function imprimirArreglo() {
    if(array.length === 0) {
        console.log("No existen datos, regresando...");
        preguntaOpcion();
    }

    try {
        fileReader.writeFileSync(route, array);
        console.log("Valores impresos en pruebas.txt, regresando...");
        preguntaOpcion();
    } catch (error) {
        console.log("No se pudo imprimir valores en arreglo, regresando...");
        preguntaOpcion();
    }
}
/**
 * Este método se encarga de imprimir la suma de los valores del arreglo
 * "array" y su promedio.
 */
function impresionesExtras() {
    let suma = 0;

    if(array.length === 0) {
        console.log("No existen datos, regresando...");
        preguntaOpcion();
    }

    array.forEach(element => {
        if(element != null) {
            suma += element;
        }
    });

    let promedio = suma / array.length;

    console.log(`La suma es: ${suma} y el promedio es: ${promedio}`);
    preguntaOpcion();
}

