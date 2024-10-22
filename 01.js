
// API algoritmo Quicksort
let api = async () => {
  try {
    let response = await fetch("https://catfact.ninja/breeds");
    let data = await response.json();

    if (Array.isArray(data.data)) {
      return ordenResult(data.data);
    } else {
      throw new Error(
        "La respuesta de la API no contiene un arreglo de datos."
      );
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

function ordenResult(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivote = arr[arr.length - 1];
  const menores = [];
  const mayores = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].pattern < pivote.pattern) {
      menores.push(arr[i]);
    } else {
      mayores.push(arr[i]);
    }
  }
  return [...ordenResult(menores), pivote, ...ordenResult(mayores)];
}

// Exportar las funciones usando la sintaxis CommonJS
module.exports = { api, ordenResult };

(async () => {
  try {
    const res = await api();

  } catch (error) {
   

    return null;
  }
})();
