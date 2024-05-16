<template>
    <!-- Elemento span con condicional de clase -->
    <span :class="{'activate': seleccionado}">
        <!-- Texto dinámico del span -->
        {{text}}
    </span>
</template>

<script setup>
// Importa defineProps de Vue para definir las propiedades del componente
import { defineProps } from 'vue';

// Define las propiedades del componente
const props = defineProps({
    // Texto del span
    text: {
        type: String,
        default: "" // Valor predeterminado vacío
    },
    // Estado booleano para activar una clase específica
    seleccionado: {type: Boolean} // No hay valor predeterminado
});
</script>

<style scoped>
/* Estilos generales para el span */
span {
    display: flex; /* Flexbox para alinear elementos horizontalmente */
    align-items: center; /* Alineación vertical de los elementos */
    width: fit-content; /* Ancho ajustado al contenido */
    height: 100%; /* Altura completa del elemento padre */
    box-sizing: border-box; /* Modelo de caja para incluir padding y border en el ancho total */
    gap: 8px; /* Espacio entre los elementos flexibles */
    padding-top: 4px; /* Espaciado superior del span */

    /* Estilos de fuente */
    color: #1A2771; /* Color del texto */
    font-size: 16px; /* Tamaño de fuente del texto */
    font-family: Poppins; /* Fuente del texto */
    font-weight: 400; /* Pesantez del texto */
    line-height: 26px; /* Altura de línea del texto */
    word-wrap: break-word; /* Salto de línea de palabras largas */
    text-decoration: none; /* Elimina la decoración por defecto del span */
    cursor: pointer; /* Cambia el cursor al pasar el mouse */
}

/* Estilo para el span activado */
span.activate {
    border-bottom: #1A245B 4px solid; /* Borde inferior sólido para indicar estado activado */
}
</style>
