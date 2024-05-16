<template>
    <!-- Enlace que actúa como un botón con texto dinámico -->
    <a :href="URL" class="button" type="button">
       <!-- Texto dinámico del botón -->
       {{text}}
    </a>
</template>

<script setup>
// Importa defineProps y toRefs de Vue para definir las propiedades y convertirlas en referencias reactivas
import { defineProps, toRefs } from "vue";

// Define las propiedades del componente
const props = defineProps({
    // Texto del botón
    text: String,
    // URL a la que el botón debe dirigir
    URL: String
});

// Convierte las propiedades en referencias reactivas
const { text, URL } = toRefs(props);

</script>

<style scoped>
/* Estilos para el botón */
.button {
    padding: 5px 15px; /* Espaciado interno del botón */
    height: 35px; /* Altura del botón */
    width: 125px; /* Ancho del botón */
    border-radius: 6px; /* Radio de las esquinas del botón */
    background-color: #0d6efd; /* Color de fondo del botón */
    text-align: center; /* Alineación del texto */
    align-items: center; /* Alineación vertical de los elementos internos */
    align-self: center; /* Alineación del botón en su contenedor */
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0,0,0, 0.075); /* Sombra del botón */
    color: white; /* Color del texto */
}

/* Estilo para el hover del botón */
.button:hover {
    background-color: #0d5bd1; /* Cambia el color de fondo al pasar el mouse sobre el botón */
}
</style>
