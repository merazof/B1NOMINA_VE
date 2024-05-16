<template>
    <!-- Botón con slots para contenido dinámico -->
    <button type="button">
        <!-- Slot para contenido antes del texto predeterminado -->
        <slot name="default"></slot>
        <!-- Texto dinámico del botón -->
        <span>
            {{ text }}
        </span>
        <!-- Slot para contenido después del texto predeterminado -->
        <slot name="post"></slot>
    </button>    
</template>

<script setup>
// Importa ref y defineProps de Vue para manejar la propiedad dinámica
import { ref, defineProps } from 'vue';

// Define las propiedades del componente
const props = defineProps({
    // Texto del botón
    text: ref('') // Utiliza ref para hacer la propiedad reactiva
});
</script>

<style scoped>
/* Estilos generales para el botón */
button {
    box-sizing: border-box; /* Incluye padding y border en el tamaño total del botón */
    padding-left: 15.39px; /* Espaciado interno izquierdo */
    padding-right: 15.39px; /* Espaciado interno derecho */
    padding-top: 9.62px; /* Espaciado interno superior */
    padding-bottom: 9.62px; /* Espaciado interno inferior */
    background: none; /* Sin fondo */
    border-radius: 6px; /* Radio de las esquinas del botón */
    overflow: hidden; /* Oculta cualquier contenido que exceda el tamaño del botón */
    border: none; /* Sin borde */
    justify-content: center; /* Alineación horizontal de los elementos internos */
    align-items: center; /* Alineación vertical de los elementos internos */
    gap: 7.69px; /* Espacio entre los elementos internos */
    display: flex; /* Display flexible para organizar los elementos internos */
    justify-content: space-between; /* Distribuye los elementos internos uniformemente */
    cursor: pointer; /* Cambia el cursor al pasar el mouse */
    width: fit-content; /* Ancho ajustado al contenido */
    height: 48px; /* Altura fija del botón */
}

/* Estilo para el hover del botón */
button:hover {
    background: #ebedf1; /* Cambia el color de fondo al pasar el mouse sobre el botón */
}

/* Estilos para el texto dentro del botón */
span {
    /* Estilos de fuente */
    color: #002E99; /* Color del texto */
    font-size: 16px; /* Tamaño de fuente del texto */
    font-family: Poppins; /* Fuente del texto */
    font-weight: 400; /* Pesantez del texto */
    line-height: 26px; /* Altura de línea del texto */
    word-wrap: break-word; /* Salto de línea de palabras largas */
}
</style>
