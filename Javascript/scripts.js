// Empty JS for your own code to be here

var libros = [];  // Creamos un array de libros, que a partir de ahora sera nuestra libreria.

libros[0] = ["img/libro1.jpg", "El secreto de ile-de-sein", 16.70.toFixed(2)];
libros[1] = ["img/libro2.jpg", "La habitacion en llamas", 21.80.toFixed(2)];
libros[2] = ["img/libro3.jpg", "El extraño verano de Tom Harvey", 20.00.toFixed(2)];
libros[3] = ["img/libro4.jpg", "Patria", 15.90.toFixed(2)];
libros[4] = ["img/libro5.jpg", "Calcetines rotos", 16.00.toFixed(2)];
libros[5] = ["img/libro6.jpg", "Los ritos del agua", 21.80.toFixed(2)];
libros[6] = ["img/libro7.jpg", "Cinco días de Octubre", 16.20.toFixed(2)];
libros[7] = ["img/libro8.jpg", "Ocho dias de Marzo", 15.90.toFixed(2)];
libros[8] = ["img/libro9.jpg", "El extranjero", 14.60.toFixed(2)];

console.log(libros[7][2]);


var contenedor = document.getElementById("containerlibros");
var salida = "";
var compra = [];


for (i = 0; i < libros.length; i++) { //Recorremos el array con el for, con el i++ vamos sumando mas 1 a la posición del catalogo de libros(.length), de esta forma avanzamos por el array. 
    

    if (i == 0) {
        salida += "<div class='row'>";
    } else if (i % 4 == 0) { // Si index es igual a 0, es decir cuando hemos recorrido hasta el primer libro de nuevo, crea un <div>. Con else if hacemos que cuando i módulo (%) de 4 sea igual a 0, se cierre el </div> y se empieze otro.
        salida += "</div><div class='row'>";
    }



   
    salida +=   //esto da salida al array, que hemos recorrido con el for para escribir solo una vez a mano, el resto lo repite el programa con javascript. Por lo tanto, creamos strings "", para añadir variables al html utilizamos: "+ X +".
        
        "<div class='col-md-3 producto'><img src='" + 
        libros[i][0] +
        "'\><h3 class='text-primary text-center'>" +
        libros[i][1] +
        "</h3><p>" +
        libros[i][2] +
        "</p><button id='buy-" +
        i +
        "' onClick='addchart(this, " +
        i +
        ")' type='button' class='btn btn-primary active btn-default compra'> Comprar </button></div>";

}


contenedor.innerHTML = salida;



//console.log("hola soy un error");


function addchart(boton, libro) { //Función para añadir libros al carrito (var compra). Primero hacemos un push dentro de compra, creando en memoria el mismo array que en el for de arriba al pulsar el boton comprar. Esto sucede ya que estamos llamando a la función refresh carrito, que imprime el nombre el precio y las cantidades en el propio carrito.

    compra.push([libro,1]);
    refreshCarrito();
    boton.disabled = true;
    
    
    
    
    
} 

function cantidad(libroComprado,incremento){ // Con esta función añadimos la capacidad de almacenar cantidades, a través de unos buttons situados dentro de la línea del propio libro en el carrito. El sumar o restar cantidades esta dentro de los buttons en refrescatabla, esta función sirve para determinar en 1 el minimo de cantidad, para no poder poner así negativos.

  compra[libroComprado][1]+= incremento;
  if (compra[libroComprado][1]<1) {
  compra[libroComprado][1]=1;
  }
    refreshCarrito();
    
}
    
    
function refreshCarrito(){ // con esta función englobamos dos funciones, para poder llamar ambas a la vez con una sola invocación, como en la function de arriba. Sirve para refrescar el carrito, haciendo que vuelva a recorrer el array para que aparezcan imprimidas en el carrito al comprarlas o sumar cantidades.

    refrescaTabla();
    refrescaImporte();
    
}

function refrescaTabla(){ // Función para imprimir el carrito, recorre el array con el (for) y imprime el libro comprado a través del indice, de esta forma sabe que si clickamos en comprar el tercer libro, deberá recorrer el array hasta el número 2, y una vez ahí imprimir el string [1] que en este caso es el nombre, y después imprimir el [2], que se trata del precio, creando así la linea en el carrito junto a los buttons.
    
    var salida="";
    for ( i = 0; i < compra.length; i++) {
    var numero = compra[i][0];
        
 salida += 
     
     "<tr> <td> " +
     (i+1) +
     " </td><td>" +
     libros[numero][1] +
     "</td><td class='+'precio'+'>" +
     libros[numero][2]+
     "</td><td><span onclick='cantidad(" +
     i +
     ",-1)' class='glyphicon glyphicon-minus-sign'</span></td><td> " +
     compra[i][1] +
     " <span onclick='cantidad(" +
     i +
     ",+1)' class='glyphicon glyphicon-plus-sign'></span></td> <td> <button type='button'  onclick='eliminarLibro(" +
     i +
     ")' >Retirar</button></td></tr>";
  }
  document.getElementById("tablacompra").innerHTML=salida;
}

function refrescaImporte(){  // Esta función sirve para llamar a las funciones que contiene en su interior, las cuales se imprimen en el HTML con los .innerHTML, creando así el cuadro de importes que nos muestra el importe sin iva, el descuento aplicado segun la cantidad, nos calcula el iva y por último nos muestra el total después de haber aplicado el descuento y sumado el iva.
    
  var importe = calculaImporte();
  var tasaDto = calculaTasa();
  var descuento = importe*tasaDto/100;
  var iva = (importe-descuento)*0.21;
  var total = (importe - descuento) + iva;
  document.getElementById("subtotal").innerHTML= importe.toFixed(2) +" €";
  document.getElementById("descuento").innerHTML= descuento.toFixed(2)+ " € ("+tasaDto+"%)";
  document.getElementById("iva").innerHTML= iva.toFixed(2)+" €";
  document.getElementById("total").innerHTML= total.toFixed(2)+" €";
    

    function calculaImporte(){  // calcula el importe a traves de un for, que recorre los libros hasta encontrar el precio [i][0], y la casilla de la cantidad [2] (ya que i es el libro escogido y este [2], representa el número de la cantidad seleccionada). Después multiplica el numero de la cantidad por el numero del precio, alojado en el [1] de nuestro array. Con el return nos devuelve esta suma.
      var suma= 0;
      for (i = 0; i < compra.length; i++) {
        suma+= libros[compra[i][0]][2]*compra[i][1];
      }
      return suma;
    }
    function calculaTasa(){  //calcula la tasa recorriendo el array y nos devuelve el numero del descuento que le aplicamos segun el número de libros comprados, si el número de libros es superior a 3, se imprimira a la derecha del precio el 5%, el 7% o el 10%. Esto sucedera cuando arriba añadimos esta función (anidada en la variable tasaDto) en el innerHTML del ID= "descuento".
      var numero = 0;
      for (i = 0; i < compra.length; i++) { 
        numero+= compra[i][1];
      }
      var tasa = 0;
      if (numero >= 7) {
        tasa = 10;
      } else if (numero >= 5) {
        tasa= 7.5;
      }else if (numero >= 3) {
        tasa=5;
      }
      return tasa;
    }
}
    


function eliminarLibro(j){  //Con esta función le damos al button de retirar la capacidad de eliminar la row compra seleccionada, de la misma forma que antes la añadimos con la funcion de push, con splice la eliminamos, llamando a la misma función refreshCarrito(), que recorre el array y elimina el libro que coincida en el indice(j).
    document.getElementById("buy-"+compra[j][0]).disabled = false;
  compra.splice(j,1);
  refreshCarrito();

}


