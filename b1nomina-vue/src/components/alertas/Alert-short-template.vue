<template>
  <!-- Utiliza la etiqueta de transición para animar el componente -->
  <transition name="fade">
     <!-- Div que contiene el contenido de la notificación -->
     <div class="card-contend" v-if="mostrarComponente">
       <!-- Título de la notificación -->
       <h3 class="titulo">{{Titulo}}</h3>
       <!-- Descripción de la notificación -->
       <p class="descripcion">{{Descripcion}}</p>
       <!-- Botón para cerrar la notificación -->
       <div>
         <button type="button" class="button" @click="cerrarNotificacion">
           <!-- Icono de cierre -->
           <ExitColorIcon />
           <!-- Texto del botón -->
           <span>Cerrar</span>
         </button>    
       </div>
     </div>
  </transition>
</template>

<script setup>
/**
* Uso del componente:
* 
* <AlertShort ref="nombreDeLaReferencia" />
* const nombreDeLaReferencia = ref(null)
* const showN = () => {
*    nombreDeLaReferencia.value.ActivarNotificacion(
*        {'Titulo': "empleado especial", 'Descripcion': "esta es la descripcion de la cartica"}
*    );
* }
*/

// Importa el icono de cierre
import ExitColorIcon from '@/components/icons/Exit-color-icon.vue';
// Importa ref y defineExpose de Vue para manejo de estados y exposición de métodos
import { ref, defineExpose } from 'vue';

// Estado para controlar la visibilidad del componente
const mostrarComponente = ref(false);
// Estados para almacenar el título y descripción de la notificación
const Titulo = ref('');
const Descripcion = ref('');

// Método para activar la notificación
const ActivarNotificacion = (DataRecivida) => {
// Asigna los valores recibidos a los estados correspondientes
Titulo.value = DataRecivida?.Titulo;
Descripcion.value = DataRecivida?.Descripcion;
// Hace visible el componente
mostrarComponente.value= true;
// Oculta el componente después de 4 segundos
setTimeout(() => {
  mostrarComponente.value = false;
}, 4000);
};

// Método para cerrar la notificación manualmente
const cerrarNotificacion = () => {
mostrarComponente.value = false;
};

// Exposición de métodos para su uso fuera del componente
defineExpose({
  ActivarNotificacion,
  cerrarNotificacion,
});
</script>

<style scoped>
/* Estilos para el contenedor de la notificación */
div.card-contend {
  width: 416px; 
  height: 234px; 
  padding: 24px; 
  background: white; 
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); /* Sombra alrededor del contenedor */
  border-radius: 6px; 
  flex-direction:column; /* Dirección de los elementos flexibles */
  gap: 12px; /* Espacio entre elementos flexibles */
  display:flex; /* Display flexible */
  flex-direction: column; /* Dirección de los elementos flexibles */
  z-index: 5; /* Capa del elemento */
  box-sizing: border-box; /* Modelo de caja */
  position: absolute; /* Posicionamiento absoluto */
  align-self: baseline; /* Alineación del elemento */
  align-items: flex-end; /* Alineación horizontal de los elementos flexibles */
  justify-content: space-between; /* Distribución del espacio entre los elementos flexibles */

  bottom: 0; /* Ajusta la posición en el eje Y */
  right: 0; /* Ajusta la posición en el eje X */
  margin: 48px 24px; /* Margen alrededor del elemento */
}

/* Estilos para el título de la notificación */
div.card-contend > h3 {
  color: black; /* Color del texto */
  font-size: 24px; /* Tamaño de fuente */
  font-weight: 500; /* Pesantez del texto */
  line-height: 34px; /* Altura de línea */
  word-wrap: break-word; /* Salto de línea de palabras largas */
  margin: 0; /* Margen externo */
  text-align: start; /* Alineación del texto */
  width: 100%; /* Ancho del elemento */
}

/* Estilos para la descripción de la notificación */
div.card-contend > p.descripcion {
  margin: 0; /* Margen externo */
  color: black; /* Color del texto */
  font-size: 16px; /* Tamaño de fuente */
  font-weight: 400; /* Pesantez del texto */
  line-height: 26px; /* Altura de línea */
  word-wrap: break-word; /* Salto de línea de palabras largas */
  text-align: start; /* Alineación del texto */
  width: 100%; /* Ancho del elemento */
  height: 100%; /* Altura del elemento */
}

/* Estilos para el botón de cierre */
button {
  height: 50px; /* Altura del botón */
  box-sizing: border-box; /* Modelo de caja */
  padding: 12px 0; /* Padding interno vertical */
  border: none; /* Sin borde */
  background-color: white; /* Color de fondo */
  cursor: pointer; /* Cursor al pasar el mouse */
  display: flex; /* Display flexible */
  align-self: center; /* Alineación del elemento */
  align-items: center; /* Alineación horizontal de los elementos flexibles */
}

/* Estilos para el texto dentro del botón */
button > span {
  font-family: Poppins; /* Fuente del texto */
  font-size: 16px; /* Tamaño de fuente */
  font-weight: 400; /* Pesantez del texto */
  line-height: 26px; /* Altura de línea */
  letter-spacing: 0em; /* Espaciado entre letras */
  text-align: left; /* Alineación del texto */
}

/* Transiciones de difuminado */
.fade-enter-active,.fade-leave-active {
  transition: opacity 0.3s ease; /* Transición de opacidad */
}
.fade-enter,.fade-leave-to {
  opacity: 0; /* Opacidad inicial y final */
}
</style>
