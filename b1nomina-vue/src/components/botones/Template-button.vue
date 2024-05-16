<!-- Componente personalizado de botón con soporte para contenido dinámico y estilización -->
<template>
    <!-- Botón que acepta un tipo definido por la propiedad 'Tipo' y muestra texto o contenido dinámico -->
    <button :type="Tipo">
        <!-- Espacio reservado para contenido dinámico (slots) -->
        <slot/>
        <!-- Muestra el texto definido por la propiedad 'text' -->
        <span>
            {{ text }}
        </span>
    </button>    
</template>

<script setup>
// Importar funciones necesarias de Vue para trabajar con reactividad y definición de props
import { ref, defineProps } from 'vue';

// Definir las propiedades que el componente aceptará
const props = defineProps({
    // Texto que se mostrará dentro del botón
    text: ref(''),
    // Tipo de botón ('submit', 'reset', etc.), con valor predeterminado 'button'
    Tipo: {
        type: String,
        default: "button"
    },
});
</script>

<style scoped>
/* Estilos aplicados al botón */
button {
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px; 
    padding-top: 9.62px; 
    padding-bottom: 9.62px;
    background: #1A245B;
    box-shadow: 0px 0.9615941643714905px 1.923188328742981px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    overflow: hidden;
    border: 1px #F8F8F8 solid;
    justify-content: center;
    align-items: center;
    gap: 7.69px;
    display: flex;
    justify-content: space-between;
    width: fit-content;
    max-height: 54px;
    min-height: 48px;
    cursor: pointer;
}

/* Cambio de fondo cuando el mouse pasa sobre el botón */
button:hover {
    background: #002E99;
}

/* Estilos aplicados al texto dentro del botón */
button > span {
    color: #F8F8F8;
    font-size: 13.5px;
    font-family: Poppins;
    font-weight: 500;
    line-height: 19.23px;
    word-wrap: break-word;
}
</style>
