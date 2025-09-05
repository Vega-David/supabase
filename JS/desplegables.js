// script.js
// Maneja los desplegables dinámicos de servicios y cuadrillas

document.addEventListener('DOMContentLoaded', function() {
    fetch('./necesario/cuadrillas.json')
        .then(response => response.json())
        .then(data => {
            const servicios = data.servicios;
            const servicioSelect = document.getElementById('Servicio');
            const cuadrillaSelect = document.getElementById('Cuadrilla');
            // Llenar el primer desplegable
            Object.keys(servicios).forEach(servicio => {
                const option = document.createElement('option');
                option.value = servicio;
                option.textContent = servicio;
                servicioSelect.appendChild(option);
            });
            // Evento para actualizar cuadrillas
            servicioSelect.addEventListener('change', function() {
                cuadrillaSelect.innerHTML = '<option value="">-- Selecciona una cuadrilla --</option>';
                const seleccion = servicios[this.value];
                if (seleccion) {
                    seleccion.forEach(cuadrilla => {
                        const option = document.createElement('option');
                        option.value = cuadrilla;
                        option.textContent = cuadrilla;
                        cuadrillaSelect.appendChild(option);
                    });
                }
            });
        });
});
