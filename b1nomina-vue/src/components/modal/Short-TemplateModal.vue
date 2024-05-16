<template>
    <!-- Utiliza el componente Teleport para "teletransportar" el modal fuera de la jerarquía del DOM del componente padre.
         Esto es útil para modales, popups y notificaciones que necesitan ser renderizados en un lugar específico del DOM.
         El atributo :disabled controla si el teleport está activo o no, basado en la propiedad activarModal. -->
         <Teleport :disabled="activarModal" to="#modal-container">
            <transition name="Animacion-Modal">
                <div v-show="activarModal" class="modal">
                    <TemplateAlertModal 
                        class="Notificacion"
                        :activarNotifiacion="mostrarNotificacion"
                        :Mensaje="mensajeNotificacion"
                        :Status="tipoNotificacion"
                        @closeNotificacion="cerrarNotificacion"
                        :style="{ zIndex: 1000 }"
                    />
                     <!-- Transición interna para animar el contenido del modal. -->
                    <transition name="Animacion-Modal-inner">
                        <div v-show="activarModal" class="modal-inner">
                            <!-- Cabecera del modal con el nombre de la acción y un icono para cerrar el modal. -->
                            <div class="header-modal">
                                <span class="NombreAccion">{{NombreAccion}}</span>
                                <CloseIconVue class="icon" @click="close" />
                            </div>

                            <!-- Slot para el contenido principal del modal. -->
                            <slot>

                            </slot>

                            <!-- Contenedor para los botones del modal.
                                Se muestra basado en si FormId es distinto de null. -->
                            <div class="contend-button-modal" v-if="FormId != null">
                                <!-- Botón de envío del formulario. -->
                                <TemplateButton :form="FormId" Tipo="submit" :text="textSubmit"/>
                                <!-- Slot para botones adicionales. -->
                                <slot name="boton">

                                </slot>
                                <!-- Botón para cancelar la acción. -->
                                <TemplateButton2 text="Cancelar" @click="close" />
                            </div>
                            <!-- Contenedor para los botones del modal cuando FormId es null. -->
                            <div class="contend-button-modal" v-else>
                                <!-- Botón de envío del formulario. -->
                                <TemplateButton :form="FormId" Tipo="submit" :text="textSubmit"/>
                                <!-- Botón para cancelar la acción. -->
                                <TemplateButton2 text="Cancelar" @click="close" />
                            </div>
                        </div>
                    </transition>       
                </div>
            </transition>
        </Teleport>        
</template>

<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue';

// Importa los componentes necesarios para el modal.
import CloseIconVue from '@/components/icons/Close-icon.vue';
import TemplateButton2 from '@/components/botones/Template-button2.vue'
import TemplateButton from '@/components/botones/Template-button.vue'
import TemplateAlertModal from '@/components/modal/TemplateAlertModal.vue';

// Define las props del componente.
const props = defineProps({
    // Propiedad para controlar la visibilidad del modal.
    // Propiedad para el nombre de la acción que se muestra en el modal.
    NombreAccion: {
        type: String,
    },
    // Propiedad para el texto del botón de envío.
    textSubmit: {
        type: String,
        default: 'Nombre Campo'
    },
    // Propiedad para el ID del formulario asociado al modal.
    FormId:{
        type: String,
        default: null
    },
    // Propiedad para la notificación que se muestra en el modal.
    DataNotification: {
        type: Object, // Cambia el tipo a Object
        default: () => ({
            DataNotification: '',
            valor: null
        }), // Proporciona un objeto vacío como valor predeterminado
    },
});

const activarModal = ref(false)

// Define los eventos que el componente puede emitir.
const emit = defineEmits([
    'close',
]);

// Función para cerrar el modal.
const close = () => {
    activarModal.value = false;
}; 

// Inicializa las variables reactivas para controlar la notificación.
const mostrarNotificacion = ref(false);
const mensajeNotificacion = ref('');
const tipoNotificacion = ref(false); // true para correcto, false para error

// Función para cerrar la notificación.
const cerrarNotificacion = () => {
    mostrarNotificacion.value = false;
};

// Función para mostrar una notificación personalizada.
const mostrarNotificacionPersonalizada = (mensaje, tipo) => {
    mensajeNotificacion.value = mensaje;
    tipoNotificacion.value = tipo;
    mostrarNotificacion.value = true;
};

// Observa cambios en la propiedad DataNotification para mostrar notificaciones personalizadas.
watch(() => props.DataNotification, (ValorNuevo) => mostrarNotificacionPersonalizada(ValorNuevo.texto,ValorNuevo.valor));


</script>

<style scoped>

/* Estilos para el contenedor del modal, se centra en el viewport y cubre toda la pantalla con un fondo semi-transparente */
div.modal {
    display: flex; /* Utiliza Flexbox para centrar el contenido */
    flex-direction: column;
    justify-content:center; /* Centra horizontalmente el contenido */
    align-items: center; /* Centra verticalmente el contenido */
    height:  100%; /* Ajusta la altura al  100% de la altura de la ventana del navegador */
    width:  100%; /* Ajusta la anchura al  100% del ancho de la ventana del navegador */
    position:absolute; /* Posiciona el modal absolutamente en relación al primer ancestro posicionado (o el viewport si no hay ninguno) */
    top:0; /* Alinea el modal con el borde superior de la ventana del navegador */
    left:  0; /* Alinea el modal con el borde izquierdo de la ventana del navegador */
    background-color:  #00000080; /* Fondo negro con  50% de transparencia */
    z-index:  100; /* Asegura que el modal se muestre por encima de otros elementos */
    box-sizing: border-box;
}

/* Estilos para el contenido interno del modal, con un diseño flexible y limitaciones de tamaño */
div.modal-inner {
    display:flex; /* Utiliza Flexbox para organizar el contenido */
    flex-direction: column; /* Organiza los elementos hijos en columna */
    position: relative; /* Posiciona el contenido interno del modal en relación al modal */
    max-width:  540px; /* Establece un ancho máximo para el modal */
    width:  80%; /* Ajusta el ancho al  80% del ancho del contenedor modal */

    box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el tamaño total del elemento */
    padding:  38px; /* Espacio interior alrededor del contenido */
    background: #FFFFFF; /* Fondo blanco */
    gap:  24px; /* Espacio entre los elementos hijos de Flexbox */

    border-radius:  8px; /* Bordes redondeados */
    z-index: 5 !important;
}

/* Estilos para los elementos div dentro del modal-inner, utilizando Flexbox para organizarlos */
div.modal-inner > div {
    display: flex; /* Utiliza Flexbox para organizar los elementos */
    gap:24px; /* Espacio entre los elementos hijos de Flexbox */
}

/* Estilos para el encabezado del modal, con un diseño flexible y alineación de elementos */
div.header-modal {
    background-color: rgb(255,  255,  255); /* Fondo blanco */
    display:flex; /* Utiliza Flexbox para organizar el encabezado */
    justify-content: space-between; /* Alinea los elementos hijos horizontalmente con espacio entre ellos */
    align-items:center; /* Alinea los elementos hijos verticalmente en el centro */
}

/* Estilos específicos para el texto del encabezado del modal, ajustando el tipo de fuente y estilos de texto */
div.header-modal > span.NombreAccion {
  font-family: "Poppins-Medium", Helvetica; /* Tipo de fuente */
  font-weight:  500; /* Estilo de fuente */
  color: rgba(26,  36,  91,  1); /* Color del texto */
  font-size:  24px; /* Tamaño de la fuente */
  letter-spacing:  0; /* Espacio entre letras */
  line-height:  34px; /* Altura de línea */
  white-space: nowrap; /* Evita que el texto se ajuste a una nueva línea */
}

/* Estilos para el contenedor de botones dentro del modal, alineando los botones al inicio */
div.contend-button-modal {
    display: flex; /* Utiliza Flexbox para organizar los botones */
    justify-content: center; /* Alinea los botones al inicio del contenedor */
    align-items: center;
}

.Animacion-Modal-enter-active, .Animacion-Modal-leave-active {
    transition: opacity  0.3s;
  }
.Animacion-Modal-enter, .Animacion-Modal-leave-to {
    opacity:  0;
}

.Notificacion {
    z-index: 1000;
}
</style>
