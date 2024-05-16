<template>
    <!-- Div de navegación con clase dinámica -->
    <div class="nav-contend" :class="{'nav-contend-hoverclose': activate}">
        <!-- Slot para insertar contenido dinámicamente -->
        <slot name="direccion"></slot>
    </div>
</template>

<script setup>
// Importa defineProps de Vue para definir las propiedades del componente
import { defineProps } from 'vue';

// Define las propiedades del componente
const props = defineProps({
    // Estado booleano para activar una clase específica
    activate: {
        type: Boolean,
        default: false // Valor predeterminado falso
    }
});
</script>

<style>
/* Estilos generales para el div de navegación */
div.nav-contend {
    display: flex; /* Flexbox para alinear elementos horizontalmente */
    align-items: center; /* Alineación vertical de los elementos */
    padding: 14px; /* Espaciado interno del div */
    cursor: pointer; /* Cambia el cursor al pasar el mouse */
    margin-bottom: 1px; /* Margen inferior del div */
    font-size: 1.1rem; /* Tamaño de fuente del texto */
    gap: 6px; /* Espacio entre los elementos flexibles */
    align-items: center; /* Alineación vertical de los elementos */
}

/* Estilo para el hover del div de navegación */
div.nav-contend:hover {
    background-color: #1A2771; /* Cambia el color de fondo al pasar el mouse sobre el div */
    transition: all 0.3s ease-in-out; /* Transición suave de todos los estilos */
}

/* Estilos internos del botón aplicados a lo que recibe */
div.nav-contend > a {
    display: flex; /* Flexbox para alinear elementos horizontalmente */
    align-items: center; /* Alineación vertical de los elementos */
    width: 100%; /* Ancho completo del div */
    height: 100%; /* Altura completa del div */
    gap: 8px; /* Espacio entre los elementos flexibles */
    margin: auto; /* Centrado automático de los elementos */
}

/* Oculta el span por defecto */
div.nav-contend > a > span {
    display: none; /* Oculta el span */
}

/* Clase para mostrar el div de navegación con efecto de cerrar */
.nav-contend-hoverclose {
    display: block; /* Muestra el div de navegación */
    position: absolute; /* Posicionamiento absoluto para superponer el div */
}
</style>
