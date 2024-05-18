import pool from "../config/db.js";

const argumento = process.argv.slice(2);
const opcion = argumento[0];
let nombre = argumento[1];
let rut = argumento[2];
let curso = argumento[3];
let nivel = argumento[4];

//Agregar un nuevo estudiante
const agregarEstudiante = async () => {
  try {
    const text =
      "INSERT INTO estudiantes(nombre, rut, curso, nivel) values($1, $2, $3, $4) returning *";
    const values = [nombre, rut, curso, nivel];
    const respuesta = await pool.query(text, values);
    console.log(`El estudiante ${nombre} fue agregado correctamente`);
  } catch (error) {
    console.log(error.message);
  }
};

//consultar estudiantes registrados
const mostrarEstudiantes = async () => {
  try {
    const text = "select * from estudiantes";
    const { rows } = await pool.query(text);
    console.log("Registro actual: ", rows);
  } catch (error) {
    console.log(error.message);
  }
};

//consoltar estudiantes por rut

const consultaEstudianteRut = async () => {
  try {
    const consulta = "select * from estudiantes where rut = $1";
    const values = [rut];
    const {rows} = await pool.query(consulta, values);
    
    console.log(rows)
  } catch (error) {
    console.log(error.message);
  }
};



//consultaEstudianteRut()
//mostrarEstudiantes()

//agregarEstudiante()
