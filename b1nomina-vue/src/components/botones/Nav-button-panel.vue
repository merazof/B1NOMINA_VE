<template>
    <!-- Router link con condicional de clase y navegación -->
    <router-link :class="{'activate': seleccionado}" :to="{name: direccion}">
        <!-- Texto dinámico del enlace -->
        {{text}}
        <!-- Cantidad dinámica mostrada en un span -->
        <span class="cantidad">
            {{ cantidad }}
        </span>
    </router-link>
</template>

<script setup>
// Importa defineProps de Vue para definir las propiedades del componente
import { defineProps } from 'vue';

// Define las propiedades del componente
const props = defineProps({
    // Texto del enlace
    text: {
        type: String,
        default: "" // Valor predeterminado vacío
    },
    // Nombre de la ruta a la que navega el enlace
    direccion: {type: String}, // No hay valor predeterminado
    // Cantidad a mostrar junto al texto
    cantidad: {
        type: String,
        default: '0' // Valor predeterminado '0'
    },
    // Estado booleano para activar una clase específica
    seleccionado: {type: Boolean} // No hay valor predeterminado
});
</script>

<style scoped>
/* Estilos generales para el enlace */
a {
    display: flex; /* Flexbox para alinear elementos horizontalmente */
    align-items: center; /* Alineación vertical de los elementos */
    width: fit-content; /* Ancho ajustado al contenido */
    height: 100%; /* Altura completa del elemento padre */
    box-sizing: border-box; /* Modelo de caja para incluir padding y border en el ancho total */
    gap: 8px; /* Espacio entre los elementos flexibles */
    padding-top: 4px; /* Espaciado superior del enlace */

    /* Estilos de fuente */
    color: #1A2771; /* Color del texto */
    font-size: 16px; /* Tamaño de fuente del texto */
    font-family: Poppins; /* Fuente del texto */
    font-weight: 400; /* Pesantez del texto */
    line-height: 26px; /* Altura de línea del texto */
    word-wrap: break-word; /* Salto de línea de palabras largas */
    text-decoration: none; /* Elimina la decoración por defecto del enlace */
}

/* Estilos para el span de cantidad */
a > span.cantidad {
    padding: 1px; /* Espaciado interno del span */
    min-width: 24px; /* Ancho mínimo del span */
    width: fit-content; /* Ancho ajustado al contenido */
    height: 24px; /* Altura del span */
    box-sizing: border-box; /* Modelo de caja para incluir padding y border en el ancho total */
    padding: 8px 4px; /* Espaciado interno del span */
    background: #CDE0F1; /* Color de fondo del span */
    border-radius: 4px; /* Radio de las esquinas del span */
    flex-direction: column; /* Dirección de los elementos flexibles */
    justify-content: center; /* Alineación vertical de los elementos flexibles */
    align-items: center; /* Alineación horizontal de los elementos flexibles */
    gap: 8px; /* Espacio entre los elementos flexibles */
    display: inline-flex; /* Display flexible para organizar los elementos internos */

    /* Estilos de fuente */
    color: #1A245B; /* Color del texto */
    font-size: 12px; /* Tamaño de fuente del texto */
    font-weight: 600; /* Pesantez del texto */
    line-height: 14.40px; /* Altura de línea del texto */
    word-wrap: break-word; /* Salto de línea de palabras largas */
}

/* Estilo para el enlace activado */
a.activate {
    border-bottom: #1A245B 4px solid; /* Borde inferior sólido para indicar estado activado */
}
</style>
