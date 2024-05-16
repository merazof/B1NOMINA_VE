<template>
    <!-- Botón con clase dinámica y slot para texto -->
    <button class="nav-button" :class="{'activate': activar}" type="button">
        <!-- Texto dinámico dentro del botón -->
        <span>{{texto}}</span>
    </button>
</template>

<script setup>
// Importa defineProps de Vue para definir las propiedades del componente
import { defineProps } from 'vue';

// Define las propiedades del componente
const props = defineProps({
    // Estado booleano para activar una clase específica
    activar: {
        type: Boolean,
        default: false // Valor predeterminado falso
    },
    // Texto del botón
    texto: {
        type: String,
        default: 'Texto Default' // Valor predeterminado 'Texto Default'
    }
});
</script>

<style scoped>
/* Estilos generales para el botón */
.nav-button {
    height: fit-content; /* Altura ajustada al contenido */
    width: 217px; /* Ancho fijo del botón */
    padding: 12px 12px; /* Espaciado interno del botón */
    background: white; /* Color de fondo del botón */
    border-radius: 6px; /* Radio de las esquinas del botón */
    border: 2px #1A2771 solid; /* Borde del botón */
    justify-content: center; /* Alineación horizontal de los elementos internos */
    align-items: center; /* Alineación vertical de los elementos internos */
    gap: 12px; /* Espacio entre los elementos internos */
    display: inline-flex; /* Display flexible para organizar los elementos internos */
}

/* Estilo para el hover del botón */
.nav-button:hover {
    background: rgb(237, 237, 237); /* Cambia el color de fondo al pasar el mouse sobre el botón */
}

/* Estilos para el texto dentro del botón */
.nav-button span {
    color: #002E99; /* Color del texto */
    font-size: 16px; /* Tamaño de fuente del texto */
    font-weight: 550; /* Pesantez del texto */
    line-height: 28px; /* Altura de línea del texto */
    word-wrap: break-word; /* Salto de línea de palabras largas */
}

/* Estilo para el botón activado */
.nav-button.activate {
    background: #1A2771; /* Cambia el color de fondo al estar activado */
    border: 2px #0f163f solid; /* Cambia el borde al estar activado */
}

/* Estilo para el texto dentro del botón activado */
.nav-button.activate span {
    color: #F8F8F8; /* Cambia el color del texto al estar activado */
}
</style>
