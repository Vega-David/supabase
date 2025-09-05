// Importa la función para traer datos desde el módulo de Supabase
import { traerDatos } from './supabaseModule.js';

// Función para mostrar los datos en el DOM, con filtro opcional por Color
async function mostrarDatos() {
	const filtro = document.getElementById('filtroColumna').value.trim().toLowerCase();
	const { data, error } = await traerDatos();
	const contenedor = document.getElementById('contenedorDatos');
	contenedor.innerHTML = '';
	if (error) {
		contenedor.innerHTML = `<div style="color:red;">Error al traer datos: ${error.message}</div>`;
		return;
	}
	if (!data || data.length === 0) {
		contenedor.innerHTML = '<div>No hay datos cargados.</div>';
		return;
	}
	// Filtra por Cuadrilla si hay filtro
	const filtrados = filtro
		? data.filter(item => (item.Cuadrilla || '').toLowerCase().includes(filtro))
		: data;
	if (filtrados.length === 0) {
		contenedor.innerHTML = '<div>No hay datos que coincidan con el filtro.</div>';
		return;
	}
	filtrados.forEach(item => {
		contenedor.innerHTML += `<div>
		Elemento: <b>${item.Elemento}</b> - 
		Caracteristica: <b>${item.Caracteristica}</b> - 
		Codigo Unico: <b>${item.codigoUnico}</b> - 
		Estado: <b>${item.Estado}</b> - 
		Cuadrilla: <b>${item.Cuadrilla}</b>
		</div>`;
	});
}


// Hace el filtro dinámico mientras el usuario escribe
const filtroInput = document.getElementById('filtroColumna');
if (filtroInput) {
	filtroInput.addEventListener('input', mostrarDatos);
}

// Carga los datos automáticamente al entrar a la página
mostrarDatos();
