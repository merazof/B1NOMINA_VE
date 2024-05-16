<template>
    <transition name="Notificacion">
        <div v-if="activarNotifiacion" class="Notificacion-fondo">
            <transition name="Animacion-Modal-inner">
                <div v-if="activarNotifiacion" class="Notificacion-inner" :class="Status ? 'correct' : 'error'">
                    <span class="NombreAccion" :class="Status ? 'correct' : 'error'">
                        {{Mensaje}}
                    </span>
                    <ExitColorIcon class="icon" @click="close" :class="Status ? 'correct' : 'error'"/>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
/**
 * uso
 * <TemplateAlertModal 
        :activarNotifiacion="mostrarNotificacion"
        :Mensaje="mensajeNotificacion"
        :Status="tipoNotificacion"
        @closeNotificacion="cerrarNotificacion"
    />
 */
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue';
import ExitColorIcon from '../icons/Exit-color-icon.vue';

const props = defineProps({
    activarNotifiacion: {
        type: Boolean,
        default: false
    },
    Mensaje: {
        type: String,
    },
    Status: {
        type: Boolean,
    }
});
const emit = defineEmits(['closeNotificacion']);

const close = () => {
    emit('closeNotificacion');
};

// Asegúrate de que estás pasando una referencia reactiva o una función que devuelva un valor reactivo a `watch`
watch(() => props.activarNotifiacion, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            close();
        }, 8000); // Espera 8 segundos antes de cerrar automáticamente
    }
});
</script>

<style scoped>

/* Estilos para el contenedor del modal, se centra en el viewport y cubre toda la pantalla con un fondo semi-transparente */

div.Notificacion-fondo {
        display: flex; /* Utiliza Flexbox para centrar el contenido */
        justify-content: end; /* Centra horizontalmente el contenido */
        align-items: start; /* Centra verticalmente el contenido */
        height:  fit-content; /* Ajusta la altura al  100% de la altura de la ventana del navegador */
        width:  100%; /* Ajusta la anchura al  100% del ancho de la ventana del navegador */
        top:0; /* Alinea el modal con el borde superior de la ventana del navegador */
        left:  0; /* Alinea el modal con el borde izquierdo de la ventana del navegador */
        background-color:  none; /* Fondo negro con  50% de transparencia */
        z-index:  -1; /* Asegura que el modal se muestre por encima de otros elementos */
        box-sizing: border-box; /** */
}

/* Estilos para el contenido interno del modal, con un diseño flexible y limitaciones de tamaño */
div.Notificacion-inner {
    margin-top: 30px;
    margin-right: 30px;
    padding: 24px; 
    background: #ffffff; 
    border: 1px black solid; 
    justify-content: center; 
    align-items: flex-start; 
    gap: 24px; 
    display: inline-flex;
    z-index: 100;
    position:absolute; /* Posiciona el modal absolutamente en relación al primer ancestro posicionado (o el viewport si no hay ninguno) */
}

div.correct {
    background: #BFF7D5; 
    border: 1px #18B055 solid; 
}

div.error {
    background: #F2C0BE;
    border: 1px #D42E27 solid;
}

span.correct {
    color: #18B055;
}

span.error {
    color: #D42E27;
}

svg.correct {
    stroke: #18B055;
}

div > svg.error {
    stroke: #D42E27;
}

span {
    font-size: 16px;
    font-family: Inter;
    font-weight: 500;
    line-height: 19.23px;
    word-wrap: break-word;
}

.icon {
    cursor: pointer;
}

/* Animación de entrada (fade-in) */
.Notificacion-enter-active, .Notificacion-leave-active {
 transition: opacity 0.4s;
}

/* Estado inicial de la animación de entrada */
.Notificacion-enter-from, .Notificacion-leave-to {
 opacity: 0;
}

/* Estado final de la animación de entrada */
.Notificacion-enter-to, .Notificacion-leave-from {
 opacity: 1;
}


</style>
