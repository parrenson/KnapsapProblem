const capacidad = 8;
const elementos = [ [2, 3], [3, 4], [4, 5], [5, 6] ]
const mochila = [];

function setValues() {
    // Crea un array inicializado con 0 de tamaño elementos + 1, y luego crea un array de tamaño capacidad + 1 para cada elemento del array anterior, 
    // esto es para que el array tenga la forma de una matriz de 9x9.
    const arr = new Array(elementos.length + 1).fill(0).map(() => new Array(capacidad + 1).fill(0));
    for (let i = 1; i <= elementos.length; i++) {
        // Itera sobre cada elemento del array elementos, y luego itera sobre la capacidad de la mochila.
        for (let currentC = 1; currentC <= capacidad; currentC++) {
            // Si el peso del elemento actual es menor o igual a la capacidad actual, entonces se puede agregar a la mochila.
            if (elementos[i - 1][0] <= currentC) {
                // Se obtiene el valor máximo entre agregar el elemento actual y se guarda en la matriz. 
                //El maximo se obtiene evaluando el valor del elemento actual + el valor del elemento anterior.
                arr[i][currentC] = Math.max(
                    elementos[i - 1][1] + arr[i - 1][currentC - elementos[i - 1][0]],
                    arr[i - 1][currentC]
                );
            } else {
                // Si el peso del elemento actual es mayor a la capacidad actual, entonces no se puede agregar a la mochila y se guarda el valor del elemento anterior para seguir iterando.
                arr[i][currentC] = arr[i - 1][currentC];
            }
        }
    }
    let currentC = capacidad;
    // Se recorre la matriz de forma inversa para obtener los elementos que se agregaron previamente a la mochila.
    for (let i = elementos.length; i > 0 && currentC > 0; i--) {
        // Si el valor del elemento actual es diferente al valor del elemento anterior, entonces se agrega a la mochila.
        if (arr[i][currentC] !== arr[i - 1][currentC]) {
            // Se resta la capacidad actual con el peso del elemento actual.
            mochila.unshift(elementos[i - 1]);
            currentC -= elementos[i - 1][0];
        }
    }
    // Se retorna la mochila y el valor total, el valor total se obtiene de la matriz en la posición elementos.length y capacidad.
    let total =  arr[elementos.length][capacidad];
    document.getElementById("vt").innerHTML = total;
    let fila = "";
    mochila.forEach(element => {
        fila += `<tr><td>${element[0]}</td><td>${element[1]}</td></tr>`;
    });
    document.getElementById("mochila").innerHTML = fila;
    document.getElementById("capacidad").innerHTML = capacidad;
    // console.log("arr ", arr[elementos.length])
    // console.log("mochila ", mochila)
    // console.log("capacidad", arr[elementos.length][capacidad])
}