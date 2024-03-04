const dictVocales = {
    'a': "ai",
    'e': "enter",
    'i': "imes",
    'o': "ober",
    'u': "ufat"
  };

 /*
  * variable para almacenar la cadena encriptada
  * por secciones
  */
  var arregloCadenaEncriptada = [];

 /*Funcion para limpiar el cache del navegador*/
  document.addEventListener("DOMContentLoaded", function() {
    localStorage.clear();
  });

  /**
  * funcion para encriptar la cadena
  * (version 1 - sin usar el metodo replaceAll())
  * @param str - cadena a encriptar
  * @return la cadena encriptada
  */

  function encriptarCadena(str) {
    /* variable para almacenar la cadena encriptada */
    let cadenaEncriptada = "";
    /* ciclo para verificar la cadena caracter por caracter */
    for (let char of str) {
    /*
    * si el diccionario contiene la propiedad correspondiente
    * al caracter a evaluar, concatena el valor del diccionario
    * en la variable a retornar, asi como establecerlo en el arreglo
    * para su posterior evaluacion
    */
      if (dictVocales.hasOwnProperty(char)) {
        cadenaEncriptada += dictVocales[char];
        arregloCadenaEncriptada.push(dictVocales[char]);
      } else {
        cadenaEncriptada += char;
        arregloCadenaEncriptada.push(char);
      }
    }
    localStorage.setItem("cadenaEncriptada", arregloCadenaEncriptada);
    return cadenaEncriptada;
  }

  /**
  * funcion para desencriptar la cadena
  * (version 1 - sin usar el metodo replaceAll())
  * @param str - cadena a encriptar
  * @return la cadena desencriptada
  */
  function desencriptarCadena(str){
    //variable para cotejar la cadena a desencriptar
    let cadenaEncriptada;

    //variable para cotejar la cadena a desencriptar
    let cadenaDesencriptada = "";

    //revisar el cache interno por si la referencia original esta vacia
    if (localStorage.getItem("cadenaEncriptada") === null) {
      cadenaDesencriptada = str;
      for (let key in vowelShift) {
          cadenaDesencriptada = cadenaDesencriptada.split(dictVocales[key]).join(key);
      }
      return cadenaDesencriptada;
    }else{
      cadenaEncriptada = localStorage.getItem("cadenaEncriptada").split(",").join("");
      arregloCadenaEncriptada = localStorage.getItem("cadenaEncriptada").split(",");

      //verificar si ambas cadenas coinciden
      if(str === cadenaEncriptada){
          //let decrypted = "";

          //ciclo para iterar en cada posicion del arreglo de la cadena encriptada
          for(let char of arregloCadenaEncriptada){

              //bandera de verificacion de valor encontrado en el diccionario
              let charEncontrado = false;

              //ciclo para iterar por cada elemento en el diccionario
              for (const key in dictVocales) {

                  //si existe la llave en el diccionario, extraer el valor
                  if (dictVocales[key] === char) {
                      cadenaDesencriptada += key;
                      charEncontrado = true;
                      break;
                  }
              }
              if (!charEncontrado) {
                  cadenaDesencriptada += char;
                }
          }
          return cadenaDesencriptada;
      }else{
          return cadenaDesencriptada = "Las cadenas no coinciden"
      }
    }
  }
  
 /*
 * funcion para seleccionar la accion de cada boton y mostrar el resultado en
 * el area de texto
 */
  function encriptarDesencriptar(event) {
    let text = document.getElementById("name").value;
    let msg = document.getElementById("message");
    let btnPressed = event.name;
    switch (btnPressed) {
        case 'btnEncriptar':
            msg.value = encriptarCadena(text);
            break;
        case 'btnDesencriptar':
            msg.value = desencriptarCadena(text);
            break;
        default: break;
    }
  }
