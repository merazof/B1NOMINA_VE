<template>
    <!-- Contenedor principal que cubre toda la pantalla con un fondo semi-transparente -->
    <div class="contend">
        <!-- Tarjeta que contiene el indicador de carga y el mensaje -->
        <div class="card">
            <!-- Contenedor para el indicador de carga -->
            <div class="loader">
            </div>
            <!-- Mensaje que se muestra junto al indicador de carga -->
            <span>Cargando Información...</span>
        </div>
    </div>
</template>

<style scoped>
/* Estilos para el contenedor principal */
.contend {
    background: #00000060; /* Fondo semi-transparente */
    width: 100vw; /* Ancho completo de la ventana */
    height: 100vh; /* Alto completo de la ventana */
    justify-content: center; /* Centrado horizontal */
    align-self: center; /* Centrado vertical */
    align-items: center; /* Centrado vertical */
    transition: all 1.5s; /* Transición suave para todos los cambios */
    display: flex; /* Uso de Flexbox para el diseño */
    z-index: 999; /* Posicionamiento en la capa superior */
    box-sizing: border-box; /* Incluye el padding y el borde en el tamaño total */
    box-shadow: 0px 4px 4px 0px #00000040; /* Sombra alrededor del contenedor */
}

/* Estilos para la tarjeta que contiene el indicador de carga y el mensaje */
.card {
    display: flex; /* Uso de Flexbox para el diseño */
    gap:16px; /* Espacio entre elementos flexibles */
    flex-direction: column; /* Elementos flexibles en dirección de columna */
    width: fit-content; /* Ancho basado en el contenido */
    height: 130px; /* Altura fija */
    background: white; /* Fondo blanco */
    border:#1A2771 2px solid; /* Borde sólido */
    box-sizing: border-box; /* Incluye el padding y el borde en el tamaño total */
    justify-content: center; /* Centrado vertical */
    align-items: center; /* Centrado horizontal */
    align-self: center; /* Centrado vertical */
    border-radius: 6px; /* Bordes redondeados */
    padding: 24px; /* Espacio interno */
}

/* Estilos para el mensaje de carga */
span {
    color:#1A2771; /* Color del texto */
    font-size: 18px; /* Tamaño de fuente */
    font-weight: 500; /* Peso de la fuente */
    line-height: 40px; /* Altura de línea */
    text-align: left; /* Alineación del texto */
}

/* Estilos para el indicador de carga */
div.loader,
div.loader::before,
div.loader::after {
    color: #bec3e1; /* Color del indicador */
    border-radius: 50%; /* Forma circular */
    width: 2.5em; /* Ancho */
    height: 2.5em; /* Alto */
    animation: animacion 1.5s infinite ease-in-out; /* Animación */
    position: absolute; /* Posicionamiento absoluto */
}

/* Estilos específicos para el contenedor del indicador de carga */
div.loader {    
    font-size: 6px; /* Tamaño de fuente */
    position: relative; /* Posicionamiento relativo */
    animation-delay: -0.16s; /* Retraso en la animación */
    bottom: 2em; /* Posicionamiento desde la parte inferior */
}

/* Estilos para los pseudo-elementos ::before y ::after del indicador de carga */
div.loader::before,
div.loader::after {
 content: ''; /* Contenido vacío */
 position:absolute; /* Posicionamiento absoluto */
}

/* Estilos específicos para el pseudo-elemento ::before del indicador de carga */
div.loader::before {
   left: -5em; /* Posicionamiento desde la izquierda */
   animation-delay: -0.32s; /* Retraso en la animación */
}

/* Estilos específicos para el pseudo-elemento ::after del indicador de carga */
div.loader::after {
   left: 5em; /* Posicionamiento desde la izquierda */
}

/* Definición de la animación */
@keyframes animacion {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em; /* Sombra para el efecto de carga */
    }

    35% {
        box-shadow: 0 2.5em 0 0; /* Sombra para el efecto de carga */
        color: #1A2771; /* Color del indicador */
    }
}
</style>
