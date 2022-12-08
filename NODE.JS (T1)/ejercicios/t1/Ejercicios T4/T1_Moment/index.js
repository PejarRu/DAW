const moment = require('moment');
//Variables 
const fechaActual = moment();
const fechaPasada = moment("07/10/2015", "DD/MM/YYYY");
const fechaFutura = moment("07/11/2025", "DD/MM/YYYY");

//Mostramos diferencia entre fechas
console.log("Entre " + fechaActual.format("DD/MM/YYYY") + " y " + fechaPasada.format("DD/MM/YYYY") + " hay: " + moment.duration(fechaPasada.diff(fechaActual)).years());
console.log("Entre " + fechaActual.format("DD/MM/YYYY") + " y " + fechaFutura.format("DD/MM/YYYY") + " hay: " + moment.duration(fechaFutura.diff(fechaActual)).years());
console.log();

//Confrimamos que la fecha es anterio/posterior
if (fechaPasada.isBefore(fechaActual)){
    console.log(" -> La fecha " + fechaPasada.format("DD/MM/YYYY") + " es anterior a " + fechaActual.format("DD/MM/YYYY"))

}
if (fechaFutura.isAfter(fechaActual)){
    console.log(" -> La fecha " + fechaFutura.format("DD/MM/YYYY") + " es popsterior a " + fechaActual.format("DD/MM/YYYY"))
}
console.log();

//Añadimos 1 mes a la fecha actual
console.log("En un mes estaremos a: " + fechaActual.add(1, "M").format("DD/MM/YYYY"));