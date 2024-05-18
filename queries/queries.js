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
    await pool.query(text, values);
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
    const { rows } = await pool.query(consulta, values);

    console.log(rows);
  } catch (error) {
    console.log(error.message);
  }
};

const editarEstudiante = async () => {
  try {
    const text =
      "UPDATE estudiantes set nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *";
    const values = [nombre, curso, nivel, rut];
    const response = await pool.query(text, values);
    console.log(`El estudiante ${nombre} fue editado con exito`);
  } catch (error) {
    console.log(error);
  }
};

const eliminarEstudiante = async () => {
  try {
    const text = "delete from estudiantes where rut = $1";
    const values = [rut];
    const response = await pool.query(text, values);
    console.log(
      `Registro de estudiante con RUT ${rut} eliminado correctamente`
    );
  } catch (error) {
    console.log(error.message);
  }
};

if (opcion === "agregar") {
  agregarEstudiante();
} else if (opcion === "mostrar") {
  mostrarEstudiantes();
} else if (opcion === "consultaRut") {
  consultaEstudianteRut();
  rut = argumento[1]
} else if (opcion === "editar") {
  editarEstudiante();
} else if (opcion === "eliminar") {
    rut = argumento[1]
  eliminarEstudiante();
} else {
  console.log("selecciona una opcion valida");
}
