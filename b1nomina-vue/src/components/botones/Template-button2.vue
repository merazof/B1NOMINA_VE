<!-- Plantilla del componente que utiliza un botón con slots para contenido dinámico y un elemento span para texto fijo -->
<template>
    <button type="button">
        <!-- Slot llamado 'default' donde se puede insertar contenido dinámico antes del texto fijo -->
        <slot name="default"></slot>
        <!-- Elemento span que muestra el texto definido por la propiedad 'text' -->
        <span>
            {{ text }}
        </span>
        <!-- Slot llamado 'post' donde se puede insertar contenido dinámico después del texto fijo -->
        <slot name="post"></slot>
    </button>    
</template>

<script setup>
// Importar funciones necesarias de Vue para trabajar con reactividad y definición de props
import { ref, defineProps } from 'vue';

// Definir las propiedades que el componente aceptará
const props = defineProps({
    // Texto que se mostrará dentro del botón
    text: ref(''),
});
</script>

<style scoped>
/* Estilos aplicados al botón */
button {
    box-sizing: border-box;
    padding-left: 15.39px;
    padding-right: 15.39px; 
    padding-top: 9.62px; 
    padding-bottom: 9.62px;
    background: none;
    box-shadow: 0px 0.9615941643714905px 1.923188328742981px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    overflow: hidden;
    border: 0.96px #1A2771 solid;
    justify-content: center;
    align-items: center;
    gap: 7.69px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: fit-content;
}

/* Cambio de fondo cuando el mouse pasa sobre el botón */
button:hover {
    background: #ebedf1;
}

/* Estilos aplicados al texto dentro del botón */
span {
    /* Estilos de fuente para el texto */
    color: #002E99;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}
</style>
