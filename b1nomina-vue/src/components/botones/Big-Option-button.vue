<template>
    <button type="button" class="big-Options-Contend">
        <div class="big-Optios-up">
            <h3 class="big-Options-TextAction">{{Accion}}</h3>
            <img src="../icons/svg/OneRigth-black-icon.svg" alt=">">    
        </div>
        <div class="big-Optios-down">
            <p class="big-Options-Descripcion">{{ Texto }}</p>
        </div>
    </button>
</template>

<script setup>
import { defineProps } from 'vue';

//valores a recibir del componente padre
const props = defineProps({
    //titulo del boton
    Accion: {
        String,
        default: ""
    },
    //descripcion del boton
    Texto: {
        String,
        default: ""
    }
});


</script>

<style scoped>
/* Estilos para el botón de opciones */
button.big-Options-Contend {
    background-color: #F8F8F8; /* Color de fondo del botón */
    box-sizing: content-box; /* Especifica cómo se calcula el tamaño del elemento */
    padding:  24px; /* Espaciado interno del botón */
    gap:  12px; /* Espaciado entre elementos flexibles */
    border: none; /* Sin bordes */
    border-radius:  6px; /* Bordes redondeados */
    height: fit-content; /* Altura del contenido del botón */
    cursor: pointer; /* Cambia el cursor a un puntero al pasar sobre el botón */
}

/* Estilo para el botón al pasar el cursor sobre él */
button.big-Options-Contend:hover {
    background-color: #f1f1f1; /* Cambia el color de fondo al pasar el cursor */
}

/* Estilos para el texto de acción */
h3.big-Options-TextAction {
    font-size:  24px; /* Tamaño de fuente */
    font-family: Poppins; /* Fuente utilizada */
    font-weight:  500; /* Peso de la fuente */
    line-height:  34px; /* Altura de línea */
    word-wrap: break-word; /* Permite que las palabras se rompan en líneas nuevas */
    box-sizing: border-box; /* Especifica cómo se calcula el tamaño del elemento */
    margin:  0; /* Sin márgenes */
}

/* Estilos para el contenedor de opciones superior */
div.big-Optios-up {
    display: flex; /* Usa el modelo de caja flexible */
    justify-content: space-between; /* Distribuye el espacio de manera uniforme entre los elementos */
    align-items: center; /* Centra los elementos a lo largo del eje cruzado */
    align-self: center; /* Centra el elemento a lo largo del eje principal */
    box-sizing: border-box; /* Especifica cómo se calcula el tamaño del elemento */
}

/* Estilos para el contenedor de opciones inferior */
div.big-Optios-down {
    display: flex; /* Usa el modelo de caja flexible */
    justify-content: start; /* Alinea los elementos al inicio del eje principal */
    align-items: center; /* Centra los elementos a lo largo del eje cruzado */
    align-self: center; /* Centra el elemento a lo largo del eje principal */
    box-sizing: border-box; /* Especifica cómo se calcula el tamaño del elemento */
}

/* Estilos para la descripción de opciones */
p.big-Options-Descripcion {
    width:  439px; /* Ancho del párrafo */
    font-family: "Poppins-Regular", Helvetica; /* Fuente utilizada */
    font-weight:  400; /* Peso de la fuente */
    color: #000000; /* Color del texto */
    font-size:  16px; /* Tamaño de fuente */
    letter-spacing:  0; /* Espaciado entre letras */
    line-height:  26px; /* Altura de línea */
    text-align: start; /* Alinea el texto al inicio */
    margin:  0; /* Sin márgenes */
}
</style>
