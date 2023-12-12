const express = require("express");
const { programacion } = require("../datos/cursos").infoCursos;
const routerProgramacion = express.Router();
//Middleware
routerProgramacion.use(express.json()); //<====================

//GET
routerProgramacion.get("/", (req, res) => {
  res.send(JSON.stringify(programacion));
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  if (req.query.ordenar === "vistas") {
    return res.send(
      JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas))
    );
  }

  res.send(JSON.stringify(resultados));
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );

  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} con el nivel ${nivel}...`);
  }
  res.send(JSON.stringify(resultados));
});

//POST
routerProgramacion.post("/", (req, res) => {
  const cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  //.push() agrega un elemento nuevo al final de un arreglo
  res.send(JSON.stringify(programacion));
});

//PUT
routerProgramacion.put("/:id", (req, res) => {
  /*Aqui le decimos que nuestro criterio sera actualizar segun el id*/
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);
  //.findIndex() permite encontrar el indice en un arreglo con base a un criterio.
  if (indice >= 0) {
    //Validacion para asegurar que el tipo de dato es correcto
    programacion[indice] = cursoActualizado;
  }
  res.send(JSON.stringify(programacion));
});

//PATCH
routerProgramacion.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
    /*Object.assign(), permite modificar algunas propiedades de 
      un objeto, primer parametro es el objeto a modificar, segundo 
      parametro, un objeto con propiedades y valores.*/
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    programacion.splice(indice, 1);
    /*.splice permite eliminar un elemento, en el primer parametro 
    ponemos el criterio para eliminar y en el segundo parametro que 
    cantidad de elementos eliminamos a partir de ahi*/
  }
  res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;
