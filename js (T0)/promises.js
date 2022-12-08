/* ***********************
COPIA DE "arrowfunction.js" 
*********************** */
let datos = [
    {nombre: "Nacho", telefono: "966112233", edad: 41},
    {nombre: "Ana", telefono: "911223344", edad: 36},
    {nombre: "Mario", telefono: "611998877", edad: 15},
    {nombre: "Laura", telefono: "633663366", edad: 17}
   ];
   console.log(datos);
   console.log("a");


   let nuevaPersona = ({nombre: nombre, telefono: telefono, edad: edad}) => {
       datos.push({nombre: nombre, telefono:telefono, edad: edad})
   }


   console.log("b");
   nuevaPersona({nombre: "Juan", telefono:"965661564", edad: 60});
   nuevaPersona({nombre: "Rodolfo", telefono:"910011001", edad: 20});
   console.log("c");
   console.log(datos);


   let borrarPersona = (telefonoBorrar) => {
       datos.forEach(persona => {
           if (persona.telefono === telefonoBorrar){}
               datos.pop(persona)
           
       })
   };
   
   borrarPersona("910011001");
   console.log("d");
   console.log(datos);
   console.log("f");
/* ***********************
COPIA DE "arrowfunction.js" 
*********************** */

let buscarTelefono = (telefonoBuscar) => {
    datos.forEach(persona => {
        if (persona.telefono === telefonoBorrar){}
            return true;
    })
    return false;
}

console.log("a2");
//Devuelve a la persona creada (si se crea correctamente)
let nuevaPersona2 = ({nombre: nombre, telefono: telefono, edad: edad})
    .then((persona) =>{
        persona = new Array({nombre: nombre, telefono: telefono, edad:edad});
        if (!buscarTelefono(telefono)){
            datos.push(persona)
            console.log(persona);
        }else{
            throw new error();
        }

    }).catch(error => {
        
        console.log("Error: el telefono ya existe");

    })

console.log("b2");
nuevaPersona({nombre: "Juan", telefono:"965661564", edad: 60});
nuevaPersona({nombre: "Rodolfo", telefono:"965661564", edad: 20});
console.log("c2");
console.log(datos);

let borrarPersona2 = (telefonoBorrar) => {

    if (buscarTelefono(telefonoBorrar)){
        datos.pop(persona)
    }
};

