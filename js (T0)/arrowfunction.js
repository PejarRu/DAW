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