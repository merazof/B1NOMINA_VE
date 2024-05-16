<template>
    <!-- Componente de botón con un ícono de basura y texto dinámico -->
    <button type="button">
        <!-- Ícono de basura importado desde otro archivo -->
        <trashIcon />
        <!-- Texto dinámico del botón -->
        <span>{{ texto }}</span>
    </button>        
</template>

<script setup>
// Importa defineProps de Vue para definir las propiedades del componente
import { defineProps } from 'vue';
// Importa el componente de ícono de basura
import trashIcon from '../icons/trash-icon.vue';

// Define las propiedades del componente
const props = defineProps({
    // Propiedad de texto con valor predeterminado
    texto: {
        type: String,
        default: "Descartado"
    } 
});

</script>

<style scoped>
/* Estilos para el botón */
button {
    border-radius: 15px; /* Radio de las esquinas del botón */
    height: 28px; /* Altura del botón */
    width: fit-content; /* Ancho del botón ajustado al contenido */
    box-sizing: border-box; /* Modelo de caja para incluir el padding y border en el ancho total */
    padding: 12px; /* Espaciado interno del botón */
    display: flex; /* Display flexible para organizar los hijos */
    flex-direction: row; /* Dirección de los elementos flexibles */
    gap: 6px; /* Espacio entre los elementos flexibles */
    border: rgba(227,42,64,1) solid 1px; /* Borde del botón con color RGBA y grosor especificados */
    cursor: pointer; /* Cambio del cursor al pasar el mouse */
    background-color: #d42e274c; /* Color de fondo del botón */
    align-items: center; /* Alineación vertical de los elementos flexibles */
}

/* Estilos para el texto dentro del botón */
button > span {
    color: rgba(227,42,64,1); /* Color del texto con color RGBA */
    font-size: 16px; /* Tamaño de fuente del texto */
    font-family: Poppins; /* Fuente del texto */
    font-weight: 400; /* Pesantez del texto */
    line-height: 26px; /* Altura de línea del texto */
    word-wrap: break-word; /* Salto de línea de palabras largas */
    letter-spacing: 0; /* Espaciado entre letras */
}
</style>
