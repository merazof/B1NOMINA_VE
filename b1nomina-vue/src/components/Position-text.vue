<template>
    <div class="section-box ">
        <span class="circulo" :class="{'form-actual': selecionado == true}"> {{ numero }} </span>
        <span class="form-nombre">{{texto}}</span>
    </div>
</template>

<script setup>
//uso del componente <PositionText numero="" texto="" selecionado="" />

// Importa la función defineProps de Vue para definir las propiedades del componente
import { defineProps } from 'vue';

// Define las propiedades del componente utilizando defineProps
// Cada propiedad tiene un tipo, un valor por defecto y una descripción de su propósito
const props = defineProps({
    // Propiedad 'numero' que espera un valor de tipo String con un valor por defecto de "0"
    // Se utiliza para representar un número en el componente
    numero: {
        type: String,
        default: "0"
    },
    // Propiedad 'texto' que espera un valor de tipo String con un valor por defecto de "TextArea"
    // Se utiliza para mostrar un texto en el componente
    texto: {
        type: String,
        default: "TextArea"
    },
    // Propiedad 'selecionado' que espera un valor de tipo Boolean con un valor por defecto de false
    // Se utiliza para indicar si el componente está seleccionado o no
    selecionado: {
        type: Boolean,
        default: false,
    }
});
</script>


<style scoped>
/* Estilos generales para la sección */
div.section-box {
    display: flex; /* Utiliza flexbox para el diseño */
    flex-direction: column; /* Alinea los elementos en una columna */
    justify-content: center; /* Centra los elementos verticalmente */
    gap:  6px; /* Espacio entre elementos */
}

/* Estilos para los círculos dentro de la sección */
span.circulo{
    display: flex; /* Utiliza flexbox para centrar el contenido */
    justify-content: center; /* Centra el contenido horizontalmente */
    border:  2px solid #1A245B; /* Borde sólido del círculo */
    text-align: center; /* Centra el texto */
    align-items: center; /* Centra el contenido verticalmente */
    align-self: center; /* Asegura que el círculo esté centrado en su contenedor */
    width:  48px; /* Ancho del círculo */
    height:  48px; /* Altura del círculo */
    border-radius:  9999px; /* Forma circular */
    font-size:  18px; /* Tamaño de fuente del texto dentro del círculo */
    font-weight:  500; /* Peso de la fuente */

    color: #1A245B; /* Color del texto */
    background-color: #FFFFFF; /* Color de fondo del círculo */
}
/* Estilos para el ciculo cuado esta seleciconado */
span.form-actual {
    color: #FFFFFF; /* Color del texto */
    background-color: #1A245B; /* Color de fondo */
}
/* Estilos para el nombre dentro de la sección */
span.form-nombre {
    font-size:  13.5px; /* Tamaño de fuente */
    color: black; /* Color del texto */
    font-weight:  400; /* Peso de la fuente */
    text-align: center; /* Centra el texto */
    
}
</style>
