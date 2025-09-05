// Función para obtener todos los registros de la tabla 'misPruebas'
export async function traerDatos() {
  // Selecciona todos los registros de la tabla
  const { data, error } = await supabase
    .from('Informacion')
    .select('*');
  // Devuelve los datos y cualquier error
  return { data, error };
}
// Importa la función para crear el cliente de Supabase desde el CDN
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


// URL y clave pública (anon) de tu proyecto Supabase
const supabaseUrl = "https://xfhwuawmiovbaufsonli.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmaHd1YXdtaW92YmF1ZnNvbmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzMxNDcsImV4cCI6MjA3MjY0OTE0N30.8dOHjSewjhWrazttd5HGiHL3JdA9VqZsB4z3Fq5k4TE";

// Crea el cliente de Supabase para interactuar con la base de datos
export const supabase = createClient(supabaseUrl, supabaseKey);


// Función para guardar datos en la tabla 'Informacion' de Supabase
export async function guardarDatos(nombre, apellido, documento, email, servicio, cuadrilla, elemento, caracteristica, codigoUnico, estado) {
  // Inserta un nuevo registro con los valores de nombre y color
  const { data, error } = await supabase
    .from('Informacion')
    .insert([
      { Nombre: nombre, Apellido: apellido, Documento: documento, Email: email, Servicio: servicio, Cuadrilla: cuadrilla, Elemento: elemento, Caracteristica: caracteristica, codigoUnico: codigoUnico, Estado: estado }
    ]);
  // Devuelve el resultado y cualquier error
  return { data, error };
}


// Función para inicializar el formulario y manejar el evento de envío
export function inicializarFormulario() {
  // Obtiene el formulario por su ID
  const form = document.getElementById('miFormulario');
  if (!form) return; // Si no existe, no hace nada

  // Agrega un listener para el evento submit del formulario
  form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Previene el comportamiento por defecto (recargar la página)
    // Obtiene los valores de los campos
    const nombre = document.getElementById('Nombre').value;
    const apellido = document.getElementById('Apellido').value;
    const documento = document.getElementById('Documento').value;
    const email = document.getElementById('Email').value;
    const servicio = document.getElementById('Servicio').value;
    const cuadrilla = document.getElementById('Cuadrilla').value;
    const elemento = document.getElementById('Elemento').value;
    const caracteristica = document.getElementById('Caracteristica').value;
    const codigoUnico = document.getElementById('codigoUnico').value;
    const estado = document.getElementById('Estado').value;
    // Llama a la función para guardar los datos en Supabase
    const { error } = await guardarDatos(nombre, apellido, documento, email, servicio, cuadrilla, elemento, caracteristica, codigoUnico, estado);
    if (error) {
        alert('Error al guardar: ' + error.message); // Muestra error si ocurre
    } else {
        document.getElementById('Nombre').value = ''; // Limpia el campo nombre
        document.getElementById('Apellido').value = ''; // Limpia el campo apellido
        document.getElementById('Documento').value = ''; // Limpia el campo documento
        document.getElementById('Email').value = ''; // Limpia el campo email
        document.getElementById('Servicio').value = ''; // Limpia el campo servicio
        document.getElementById('Cuadrilla').value = ''; // Limpia el campo cuadrilla
        document.getElementById('Elemento').value = ''; // Limpia el campo elemento
        document.getElementById('Caracteristica').value = ''; // Limpia el campo caracteristica
        document.getElementById('codigoUnico').value = ''; // Limpia el campo codigoUnico
        document.getElementById('Estado').value = ''; // Limpia el campo estado
        alert('Datos guardados correctamente'); // Muestra éxito si todo sale bien
    }
  });
}
