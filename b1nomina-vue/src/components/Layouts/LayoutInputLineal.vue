<template>
    <div class="contend-select">
        <p>
            {{textLabel}}
            <span v-show="requerido">*</span>
        </p>
        <div>
            <slot>
                
            </slot>
        </div>
    </div>
</template>

<script setup>
/*Uso 
    <LayoutInputLineal textLabel="Género">
        <template v-slot>
                   
        </template>
    </LayoutInputLineal>
*/

import { defineProps } from 'vue';

const props = defineProps({
    textLabel:{
        type: String,
        default: 'Titulo Layout'
    },
    requerido: {
        type: Boolean,
        default: false
    }
});

</script>

<style scoped>
    /* Establece el estilo para un contenedor de selección, utilizando flexbox para organizar sus elementos hijos en una columna. */
    div.contend-select {
        display: flex; /* Utiliza flexbox para el diseño. */
        flex-direction: column; /* Organiza los elementos hijos en una columna vertical. */
        width: 100%; /* Ocupa el ancho completo del contenedor padre. */
        gap: 1px; /* Define un espacio de 1px entre los elementos hijos. */
        
    }

    /* Establece el estilo para los divs directamente dentro del contenedor de selección. */
    div.contend-select > div {
        display: flex; /* Utiliza flexbox para el diseño. */
        gap: 16px; /* Define un espacio de 16px entre los elementos hijos. */
        min-height: 35px; /* Establece una altura mínima de 35px para los elementos. */
        border-bottom-right-radius: #E32A40 solid 3px;
    }

    /* Establece el estilo para los párrafos dentro del contenedor de selección. */
    p {
        font-size: 13px; /* Establece el tamaño de fuente a 13px. */
        font-family: Poppins; /* Utiliza la fuente Poppins. */
        font-weight: 500; /* Establece el peso de la fuente a 500 (medio). */
        word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea. */
        color: #888888; /* Establece el color del texto a un gris claro. */
        margin: 1px; /* Establece un margen de 1px alrededor del párrafo. */
    }

    /* Establece el estilo para los spans dentro de los párrafos. */
    p span{
        color: #E32A40; /* Establece el color del texto a un rojo vibrante. */
        font-size: 13px; /* Establece el tamaño de fuente a 13px. */
        font-family: Poppins; /* Utiliza la fuente Poppins. */
        font-weight: 500; /* Establece el peso de la fuente a 500 (medio). */
        word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea. */
    }
</style>
