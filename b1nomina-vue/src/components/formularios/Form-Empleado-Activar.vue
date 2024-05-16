<template>
    <form id="FormSend-A" @submit.prevent="Enviar">
        <span class="span-activar">{{ texto }}</span>
    </form>
</template>

<script setup>
import {defineProps} from 'vue';

import axios from 'axios';
import { useRoute } from 'vue-router';

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;
    const IDMaster = JSON.parse(localStorage.getItem("userId"));

const props = defineProps({
    EmpleadoIDSelecionado:{
        type: [String, Number],
        default: null
    }
});
const emit = defineEmits([
    'activarUsuario',
    'notificacion',
]);


const Enviar = async () => {
    
    await axios.put(`user/${props.EmpleadoIDSelecionado}/activate_user?user_updater=${IDMaster}`)
    .then(
        respuesta => {
            emit('activarUsuario')
        }
    )
    .catch(
        error => {
            console.log(error)
            emit('notificacion', {'texto':error?.response, 'valor':false})
        }        
    )
    
};

const texto = "Activándolo comenzará a aparecer en la sección Gestión de Empleado, Gestión de Nómina y tendrás acceso a sus datos.";
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
}

form > span.span-activar {
    display: block;
    color: black;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px;
    box-sizing: border-box;
    overflow-wrap: break-word; /* Cambiado de word-wrap a overflow-wrap */
    white-space: normal; /* Asegura que el espacio en blanco se maneje normalmente */
    width: 100%; /* Asegura que el span tenga un ancho definido */
    text-align: justify;
}

</style>