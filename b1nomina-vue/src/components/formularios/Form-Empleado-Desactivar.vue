<template>
    <form id="FormSend-D" @submit.prevent="Enviar">
        <span>Al desactivarlo debes tener en cuenta que:</span>
        <ol>
            <li>No aparecerá en la sección Gestionar Nómina.</li>
            <li>Como Usuario no podrá acceder a la plataforma.</li>
            <li>Se detendrán los eventos recurrentes asignados para el empleado.</li>
        </ol>                        
    </form>
</template>

<script setup>

import {defineProps, defineEmits} from 'vue';

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
})

const emit = defineEmits([
    'desactivarUsuario',
    'notificacion'
])

const Enviar = async () => {
    
    await axios.put(`user/${props.EmpleadoIDSelecionado}/deactivate_user?user_updater=${IDMaster}`)
    .then(
        respuesta => {
            emit('desactivarUsuario')
        }
    )
    .catch(
        error => {
            console.log(error)
            emit('notificacion', {'texto':err?.response.data?.message, 'valor':false})
        }
    )
};

</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
}

form > span {
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
li {
    text-align: start;
}

li::marker {
    text-align: center;
}

</style>