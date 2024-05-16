<template>
    <!-- Componente de botón con un ícono y texto -->
    <button type="button">
        <!-- Ícono de círculo correcto con color especificado -->
        <CirculoCorrectIcon Stroke="#18B055" />
        <!-- Texto dinámico del botón -->
        <span>{{ texto }}</span>
    </button>        
</template>

<script setup>
// Importa defineProps de Vue para definir las propiedades del componente
import { defineProps } from 'vue';
// Importa el componente de ícono
import CirculoCorrectIcon from '../icons/Circulo-correct-icon.vue';

// Define las propiedades del componente
const props = defineProps({
    // Propiedad de texto con valor predeterminado
    texto: {
        type: String,
        default: "Completado"
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
    border: #18B055 solid 1px; /* Borde del botón con color y grosor especificados */
    cursor: pointer; /* Cambio del cursor al pasar el mouse */
    background-color: #2AE3744D; /* Color de fondo del botón */
    align-items: center; /* Alineación vertical de los elementos flexibles */
}

/* Estilos para el texto dentro del botón */
button > span {
    color: #18B055; /* Color del texto */
    font-size: 16px; /* Tamaño de fuente del texto */
    font-family: Poppins; /* Fuente del texto */
    font-weight: 400; /* Pesantez del texto */
    line-height: 26px; /* Altura de línea del texto */
    word-wrap: break-word; /* Salto de línea de palabras largas */
    letter-spacing: 0; /* Espaciado entre letras */
}
</style>
