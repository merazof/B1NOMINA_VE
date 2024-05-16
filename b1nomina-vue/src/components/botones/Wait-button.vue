<!-- Plantilla del componente que contiene un botón con un icono y un texto -->
<template>
    <button type="button">
        <!-- Icono de reloj importado como componente -->
        <RelojIconVue />
        <!-- Elemento span que muestra el texto definido por la propiedad 'Texto' -->
        <span>
            {{ Texto }}
        </span>
    </button>    
</template>

<script setup>
// Importar la función defineProps de Vue para definir las propiedades del componente
import { defineProps } from 'vue';
// Importar el componente de icono específicamente diseñado para representar un reloj
import RelojIconVue from '../icons/Reloj-icon.vue';

// Definir las propiedades que el componente aceptará
const props = defineProps({
    // Texto que se mostrará dentro del botón, con valor predeterminado "Sin Iniciar"
    Texto: {
        type: String,
        default: "Sin Iniciar"
    },
});
</script>

<style scoped>
/* Estilos aplicados al botón */
button {
    border-radius: 15px; /* Redondear las esquinas del botón */
    height: 28px; /* Altura del botón */
    width: fit-content; /* Ancho ajustable según el contenido */
    box-sizing: border-box; /* Asegurar que el padding y border sean inclusivos en el tamaño total */
    padding: 12px; /* Espaciado interno alrededor del contenido */
    display: flex; /* Usar Flexbox para organizar los elementos internos */
    flex-direction: row; /* Alinear los elementos hijos horizontalmente */
    gap: 6px; /* Espaciado entre los elementos hijos */
    border: #FAB400 solid 1px; /* Borde sólido de color #FAB400 */
    cursor: pointer; /* Cambiar el cursor a puntero al pasar el mouse sobre el botón */
    background-color: rgba(237.56, 199.55, 0, 0.30); /* Color de fondo con transparencia */
    align-items: center; /* Alinear verticalmente los elementos hijos al centro */
}

/* Estilos aplicados al texto dentro del botón */
button > span {
    color: #FAB400; /* Color del texto */
    font-size: 16px; /* Tamaño de fuente del texto */
    font-family: Poppins; /* Fuente del texto */
    font-weight: 400; /* Pesaje de la fuente del texto */
    line-height: 26px; /* Altura de línea del texto */
    word-wrap: break-word; /* Permitir que las palabras largas se rompan en líneas nuevas */
    letter-spacing: 0; /* Sin espacio entre letras */
}
</style>
