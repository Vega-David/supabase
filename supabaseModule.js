// Función para obtener todos los registros de la tabla 'misPruebas'
export async function traerDatos() {
  // Selecciona todos los registros de la tabla
  const { data, error } = await supabase
    .from('misPruebas')
    .select('*');
  // Devuelve los datos y cualquier error
  return { data, error };
}
// Importa la función para crear el cliente de Supabase desde el CDN
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


// URL y clave pública (anon) de tu proyecto Supabase
const supabaseUrl = "https://vavozyezvfbotoxqwlpa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdm96eWV6dmZib3RveHF3bHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5Mzg1NDYsImV4cCI6MjA3MjUxNDU0Nn0.b7If0mvIYS-qgnCFvUnBEmgGViyyQ30A_lPxRrmaY2Y";

// Crea el cliente de Supabase para interactuar con la base de datos
export const supabase = createClient(supabaseUrl, supabaseKey);


// Función para guardar datos en la tabla 'misPruebas' de Supabase
export async function guardarDatos(nombre, color) {
  // Inserta un nuevo registro con los valores de nombre y color
  const { data, error } = await supabase
    .from('misPruebas')
    .insert([
      { Nombre: nombre, Color: color }
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
    const color = document.getElementById('Color').value;
    // Llama a la función para guardar los datos en Supabase
    const { error } = await guardarDatos(nombre, color);
    if (error) {
        alert('Error al guardar: ' + error.message); // Muestra error si ocurre
    } else {
        document.getElementById('Nombre').value = ''; // Limpia el campo nombre
        document.getElementById('Color').value = ''; // Limpia el campo color
        alert('Datos guardados correctamente'); // Muestra éxito si todo sale bien
    }
  });
}
