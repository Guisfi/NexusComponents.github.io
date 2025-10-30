document.addEventListener('DOMContentLoaded', () => {
    const carrusel = document.getElementById('carrusel');
    
    // Si el carrusel no existe, salimos
    if (!carrusel) return;
    
    const tarjetas = carrusel.querySelectorAll('.tarjeta-producto');
    
    // Si no hay tarjetas o solo hay una, no necesitamos el desplazamiento
    if (tarjetas.length <= 1) return;

    // Constantes de configuración
    const VELOCIDAD_DESPLAZAMIENTO = 3000; // Desplaza cada 3000ms (3 segundos)
    const GAP_CSS = 20; // Asegúrate de que este valor coincida con el gap en CSS
    
    let indiceActual = 0;

    function desplazarCarrusel() {
        // Obtener el ancho real de la primera tarjeta en el DOM
        // Se debe hacer dentro de la función por si el viewport cambia.
        const anchoTarjeta = tarjetas[0].offsetWidth; 
        const anchoTarjetaConGap = anchoTarjeta + GAP_CSS;
        
        // 1. Incrementa el índice para ir al siguiente producto
        indiceActual++;

        // 2. Si hemos llegado al final de los productos...
        if (indiceActual >= tarjetas.length) {
            // Vuelve al inicio
            indiceActual = 0;
            // Desplaza directamente al inicio (sin animación suave)
            carrusel.scrollLeft = 0;
            // Después del salto instantáneo al inicio, regresamos y animamos el primer elemento en el siguiente ciclo.
            return; 
        }

        // 3. Calcula la nueva posición de desplazamiento
        const nuevaPosicion = indiceActual * anchoTarjetaConGap;

        // 4. Aplica el desplazamiento suave (gracias a scroll-behavior: smooth; en el CSS)
        carrusel.scrollLeft = nuevaPosicion;
    }

    // Inicia el desplazamiento automático
    setInterval(desplazarCarrusel, VELOCIDAD_DESPLAZAMIENTO);
});