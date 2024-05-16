<template>
    <!-- Contenedor principal para la sección de multimedia -->
    <div class="multimedia">
      <!-- Contenedor para la funcionalidad de añadir una foto -->
      <div class="add-docs">

        
        <div class="Input-file" v-if="DocumentName.length <= 0">
            
            <span>Arrastrar Archivo Aquí</span>
            <input 
                name="input-docs"
                id="input-docs"
                type="file"
                @change="ingresarDocs"
            >
            <label for="input-docs">                
                Selecionar Archivo
                <UpLoadIcon />
            </label>
        </div>

        <div v-else class="show-file">
            <span class="archivo">{{DocumentName}}</span>
            <trashIcon 
                Stroke="#000000" 
                class="icon"
                @click="reset"
            />
        </div>
        
        
      </div>
    </div>
</template>

<script setup>

import UpLoadIcon from '@/components/icons/UpLoad-icon.vue';
import trashIcon from '../icons/trash-icon.vue';

// Importa las funciones ref y defineEmits de Vue
import { ref, defineEmits, defineExpose} from 'vue';

// Crea una referencia reactiva para almacenar el documento
const Documento = ref('')
const DocumentName = ref('')

// Declara el evento que el componente puede emitir, en este caso, 'actualizarDocumento'
const emit = defineEmits([
    'actualizarDocumento',
    'respuesta'
]);


const reset = () => {

    deleteDocumento()
}

const deleteDocumento = () => {
    Documento.value = '';
    DocumentName.value = '';
    const inputFile = document.getElementById('input-docs');
    if (inputFile) {
        inputFile.value = '';
    }
    emit('actualizarDocumento', Documento.value)
}

defineExpose({
    reset,
})

/**
 * Función para manejar la imagen seleccionada por el usuario.
 * 
 * @param {Event} evento - El evento generado por el input de tipo file.
 * @returns {void} emite un evento 'actualizarDocumento' con la cadena en base 64 de la imagen o una cadena vacía si la imagen no es válida.
 */
const ingresarDocs = (evento) => {
    // Define las extensiones de archivo válidas para la imagen
    const ExtencionesValidas = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    const DocumentoIngresado = evento.target.files[0]

    // Verifica si la imagen tiene una extensión válida
    if (ExtencionesValidas.includes(DocumentoIngresado?.type)){
        DocumentName.value = DocumentoIngresado?.name;
        Documento.value = DocumentoIngresado;
        // Emite el evento 'actualizarDocumento' con el valor actual de 'Documento'
        emit('actualizarDocumento', Documento)
        emit("respuesta", {'texto':'Archivo compatible', 'valor': true})

    } else {
        // Si la imagen no es válida, limpia la referencia reactiva 'Documento'
        Documento.value = '';
        DocumentName.value = '';
        emit("respuesta", {'texto':'El documento selecionado no es valido', 'valor':false})
        
        // Emite el evento 'actualizarDocumento' con el valor actual de 'Documento'
        emit('actualizarDocumento', Documento);
    }
};
</script>

<style scoped>
/* Estilo para el contenedor de elementos multimedia */
div.multimedia {
 display: flex; /* Utiliza Flexbox para organizar los elementos */
 flex-direction: column; /* Organiza los elementos en una columna */
 gap: 12px; /* Define un espacio de 12px entre los elementos */
 box-sizing: content-box; /* Define cómo se calculan las dimensiones del elemento */
 width: 100%; /* Ocupa el ancho completo del contenedor padre */
}

/* Estilo para los elementos de texto dentro del contenedor multimedia */
div.multimedia div.add-docs div > span {
    font-family: Poppins;
    color: #1A245B;
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
}

div.multimedia div.add-docs div.show-file {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
} 

div.multimedia div.add-docs div.Input-file {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
} 

/* Estilo para el botón de añadir una foto */
div.multimedia div.add-docs {
 border-radius: 6px; /* Bordes redondeados */
 border: 0.5px #363855 dashed; /* Borde discontinuo de 0.5px de ancho y color #363855 */
 border-width: 2px; /* Ancho del borde */
 box-sizing: border-box; /* Define cómo se calculan las dimensiones del elemento */
 padding: 12px 48px; /* Espaciado interno */
 display: flex; /* Utiliza Flexbox para organizar los elementos */
 flex-direction: column; /* Organiza los elementos en una fila */
 justify-content: space-between; /* Distribuye el espacio entre los elementos */
 align-items: center; /* Alinea los elementos verticalmente al centro */
 width: 100%; /* Ocupa el ancho completo del contenedor padre */
 height: fit-content; /* Ajusta la altura al contenido */
}

/* Estilo para el botón de añadir una foto cuando está activo */
div.add-docs.active {
    background: #d3dff7; /* Color de fondo */
}

/* Estilo para el input de tipo file, oculto */
input {
    display: none; /* Oculta el input */
}

/* Estilo para la etiqueta del botón de añadir una foto */
label {
    box-sizing: border-box; /* Define cómo se calculan las dimensiones del elemento */
    padding-left: 15.39px; /* Espaciado interno a la izquierda */
    padding-right: 15.39px; /* Espaciado interno a la derecha */
    padding-top: 9.62px; /* Espaciado interno arriba */
    padding-bottom: 9.62px; /* Espaciado interno abajo */
    background: none; /* Sin fondo */
    box-shadow: 0px 0.9615941643714905px 1.923188328742981px rgba(16, 24, 40, 0.05); /* Sombra alrededor del elemento */
    border-radius: 6px; /* Bordes redondeados */
    overflow: hidden; /* Oculta el contenido que excede el tamaño del elemento */
    border: 0.96px #1A2771 solid; /* Borde sólido de 0.96px de ancho y color #1A2771 */
    justify-content: center; /* Alinea los elementos horizontalmente al centro */
    align-items: center; /* Alinea los elementos verticalmente al centro */
    align-self: center;
    gap: 7.69px; /* Espaciado entre los elementos */
    display: flex; /* Utiliza Flexbox para organizar los elementos */
    justify-content: space-between; /* Distribuye el espacio entre los elementos */
    cursor: pointer; /* Cambia el cursor a un puntero al pasar el mouse */
    width: fit-content; /* Ajusta el ancho al contenido */

    /* Estilos de fuente */
    color: #002E99; /* Color del texto */
    font-size: 16px; /* Tamaño de la fuente */
    font-family: Poppins; /* Fuente utilizada */
    font-weight: 400; /* Peso de la fuente */
    line-height: 26px; /* Altura de línea */
    word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea */
}

/* Estilo para la etiqueta del botón de añadir una foto al pasar el mouse */
label:hover {
    background: #ebedf1; /* Color de fondo al pasar el mouse */
}

.icon {
    cursor: pointer;
}
</style>