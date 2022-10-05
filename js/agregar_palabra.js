const btnAgregar = document.getElementById("btn-agregar");
const txtAreaNuevaPalabra = document.getElementById("text-area-agregar-palabra");

sessionStorage.clear();

btnAgregar.addEventListener("click", function (event) {

    if (txtAreaNuevaPalabra.value.length < 9) {

        sessionStorage.setItem("nuevaPalabra", txtAreaNuevaPalabra.value); 
        txtAreaNuevaPalabra.value = "";
        txtAreaNuevaPalabra.placeholder = "Palabra agregada.";

    } else {

        txtAreaNuevaPalabra.value = "";
        txtAreaNuevaPalabra.placeholder = "Max. 8 caracteres";

    }    

});


