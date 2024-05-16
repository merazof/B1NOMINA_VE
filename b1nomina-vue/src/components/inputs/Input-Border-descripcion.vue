<template>
    <div class="input-line-contend">
        <label class="input-label">
            {{Titulo}}
            <span v-show="requerido">
                *
            </span>
        </label>
        
        <input class="input-template"
           :required="requerido"
           :disabled="Deshabilitar"
           :type="Tipo" 
           :placeholder="Placeholder"
           :minlength="minimoCaracteres"
           :maxlength="maximoCaracteres"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
        >
    </div>        
</template>

<script setup>
/* uso 
    <InputLinealDescripcion 
        Tipo="" Tipo de entrada
        Titulo="" Titulo superior
        v-model="" captura del valor
        Placeholder="" Texto interno
        @update:modelValue="variable = $event" Sincronizacion entre padre/hijo
        requerido="" Si el campo es requerido o no
        :minimo-caracteres="" minimo de caracteres del campo
        :maximo-caracteres="" maximo de caracteres del campo
    />
*/
import { defineProps } from 'vue';

const props = defineProps(
    {
        // Props de funcionamiento
        modelValue: {
            type: [String, Number], // Define el tipo de dato que puede recibir, String o Number.
            default: '', // Valor por defecto en caso de que no se proporcione un valor.
        },
        // Props de formato y estilos
        Placeholder : {
            type: [String, Number], // Define el tipo de dato que puede recibir, String o Number.
            default: 'Datos del campo', // Valor por defecto para el placeholder.
        },
        Titulo: {
            type: String, // Define el tipo de dato que puede recibir, String.
            default: "Titulo" // Valor por defecto para el título.
        },
        Tipo: {
            type: String, // Define el tipo de dato que puede recibir, String.
            default: 'text' // Valor por defecto para el tipo de input, en este caso, texto.
        },
        Deshabilitar: {
            type: Boolean, // Define el tipo de dato que puede recibir, Boolean.
            default:false, // Valor por defecto, el input no estará deshabilitado.
        },
        minimoCaracteres: {
            type: [Number, String], // Define el tipo de dato que puede recibir, Number o String.
            default: 3 // Valor por defecto para el mínimo de caracteres permitidos.
        },
        maximoCaracteres: {
            type:[Number, String], // Define el tipo de dato que puede recibir, Number o String.
            default: 100 // Valor por defecto para el máximo de caracteres permitidos.
        },
        requerido: {
            type: Boolean, // Define el tipo de dato que puede recibir, Boolean.
            default: false // Valor por defecto, el input no será requerido.
        }
    }
);
</script>


<style scoped>
/* Establece el estilo para un contenedor de entrada de línea, utilizando flexbox para organizar sus elementos hijos en una columna. */
div.input-line-contend {
    display: flex; /* Utiliza flexbox para el diseño. */
    flex-direction: column; /* Organiza los elementos hijos en una columna vertical. */
    box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el ancho y la altura del elemento. */
    width: 100%; /* Ocupa el ancho completo del contenedor padre. */
    max-height: 66px; /* Establece una altura máxima de 66px para el contenedor. */
    align-self: center; /* Centra el contenedor dentro de su contenedor padre. */
    justify-content: space-around;
}

/* Establece el estilo para las etiquetas de entrada dentro del contenedor de entrada de línea. */
label.input-label {
    font-weight: 500; /* Establece el peso de la fuente a 500 (medio). */
    word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea. */
    color: black; /* Establece el color del texto a un gris claro. */
    font-size: 16px;
    line-height: 20px;
    text-align: left;

}

/* Establece el estilo para los spans dentro de las etiquetas de entrada. */
label.input-label span{
    color: #E32A40; /* Establece el color del texto a un rojo vibrante. */
    font-size: 13px; /* Establece el tamaño de fuente a 13px. */
    font-family: Poppins; /* Utiliza la fuente Poppins. */
    font-weight: 500; /* Establece el peso de la fuente a 500 (medio). */
    word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea. */
}

/* Establece el estilo para los campos de entrada dentro del contenedor de entrada de línea. */
input.input-template {
    margin-top: 8px; /* Establece un margen superior de 8px. */
    color: #1A245B; /* Establece el color del texto a un azul oscuro. */
    font-size: 18px; /* Establece el tamaño de fuente a 18px. */
    height: 46px; /* Establece una altura de 50px para el campo de entrada. */
    border: 2px solid #1A245B;
    border-radius: 7.8px;
    padding: 0 12px;
    box-sizing: border-box;
}

/* Establece el estilo para el estado de foco del campo de entrada. */
input.input-template:focus {
    outline: none; /* Elimina el contorno que aparece cuando el campo de entrada está enfocado. */
}
</style>
