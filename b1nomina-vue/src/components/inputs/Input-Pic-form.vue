<template>
    <!-- Contenedor principal para la sección de multimedia -->
    <div class="multimedia">
      <!-- Etiqueta para indicar la acción de cargar una foto de perfil -->
      <span>Cargar foto de perfil</span>
      <!-- Contenedor para la funcionalidad de añadir una foto -->
      <div class="add-photo">
        <!-- Muestra el texto "Arrastrar imagen aquí" si no hay una imagen cargada -->
        <span v-show="ubicacion.length <= 0">Arrastrar imagen aqui</span>
        <!-- Muestra la imagen cargada si la variable 'ubicacion' tiene una URL de imagen -->
        <img :src="ubicacion" class="photo">
        <!-- Input oculto para seleccionar un archivo de imagen -->
        <input 
            name="foto"
            id="foto"
            type="file"
            @change="manejarimagen"
        >
        <!-- Etiqueta para el input de archivo, permite seleccionar un archivo de imagen -->
        <label for="foto">Selecionar Archivo</label>
      </div>
    </div>
</template>


<script setup>
// Importa las funciones ref y defineEmits de Vue
import { ref, defineEmits, defineExpose } from 'vue';

// Crea una referencia reactiva para almacenar la ubicación de la imagen
const ubicacion = ref('')

// Declara el evento que el componente puede emitir, en este caso, 'actualizarDataImagen'
const emit = defineEmits(['actualizarDataImagen']);

const reset = () => {
    ubicacion.value = ''
}

defineExpose({
    reset,
})

/**
 * Función para manejar la imagen seleccionada por el usuario.
 * 
 * @param {Event} evento - El evento generado por el input de tipo file.
 * @returns {void} emite un evento 'actualizarDataImagen' con la cadena en base 64 de la imagen o una cadena vacía si la imagen no es válida.
 */
const manejarimagen = (evento) => {
    // Define las extensiones de archivo válidas para la imagen
    const ExtencionesValidas = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    
    // Obtiene la imagen seleccionada por el usuario
    const imagen = evento.target.files[0]
    
    // Verifica si la imagen tiene una extensión válida
    if (ExtencionesValidas.includes(imagen?.type)){
        // Crea un objeto FileReader para leer el contenido de la imagen
        let reader = new FileReader();
        
        // Define la función a ejecutar cuando el contenido de la imagen esté listo
        reader.onload = (e) => {
            // Actualiza la referencia reactiva 'ubicacion' con el resultado de la lectura
            ubicacion.value = e.target.result;
        }        
        
        // Inicia la lectura del contenido de la imagen como una URL de datos
        reader.readAsDataURL(imagen)

        // Emite el evento 'actualizarDataImagen' con el valor actual de 'ubicacion'
        emit('actualizarDataImagen', imagen)

    } else {
        // Si la imagen no es válida, limpia la referencia reactiva 'ubicacion'
        ubicacion.value = ''
        
        // Emite el evento 'actualizarDataImagen' con el valor actual de 'ubicacion'
        emit('actualizarDataImagen', ubicacion.value)
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
div.multimedia > span {
 color: #999999; /* Color del texto */
 font-size: 13px; /* Tamaño de la fuente */
 font-family: Poppins; /* Fuente utilizada */
 font-weight: 500; /* Peso de la fuente */
 word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea */
}

/* Estilo para el botón de añadir una foto */
div.multimedia div.add-photo {
 border-radius: 6px; /* Bordes redondeados */
 border: 0.5px #363855 dashed; /* Borde discontinuo de 0.5px de ancho y color #363855 */
 border-width: 2px; /* Ancho del borde */
 box-sizing: border-box; /* Define cómo se calculan las dimensiones del elemento */
 padding: 12px 48px; /* Espaciado interno */
 display: flex; /* Utiliza Flexbox para organizar los elementos */
 flex-direction: row; /* Organiza los elementos en una fila */
 justify-content: space-between; /* Distribuye el espacio entre los elementos */
 align-items: center; /* Alinea los elementos verticalmente al centro */
 width: 100%; /* Ocupa el ancho completo del contenedor padre */
 height: fit-content; /* Ajusta la altura al contenido */
}

/* Estilo para el botón de añadir una foto cuando está activo */
div.add-photo.active {
    background: #d3dff7; /* Color de fondo */
}

/* Estilo para las imágenes */
.photo {
    max-height: 180px; /* Altura máxima */
    max-width: 180px; /* Ancho máximo */
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
</style>