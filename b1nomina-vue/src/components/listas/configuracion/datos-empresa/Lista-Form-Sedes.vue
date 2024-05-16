<template>
    <div class="contend">
        <h3 class="subtitulo">Agrega las sedes de tu empresa</h3>

        <p class="descripcion">
            Las sedes son los lugares, ciudades o puntos de venta en donde tu empresa maneja personal y son importantes para poder segmentar mejor tu nómina a la hora de hacer los cálculos. 
        </p>

        <LayoutFondoBorder v-for="Sede in ListaSedes" :key="Sede.id">
            <template #default>    
               <FormSedes 
                    :Informacion="Sede"
                    :parametros="listadoLocalidad"
               />                 
            </template>
        </LayoutFondoBorder>

        
        <TemplateBlankButton text="+ Agregar Nueva Sede" @click="AddCampo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormSedes from '@/components/formularios/configuracion/datos-empresa/Form-Sedes.vue';
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref} from 'vue';

import peticiones from '@/peticiones/p_empleado'

const listadoLocalidad = ref ({})

const ListaSedes = ref([
    {
        id: 1,
        Nombre: 'Sede 1',
        ciudad: 'ciudad 1',
        region_id: 1,
        comuna_id: 9,
        direccion: '',
        
    },
    {
        id: 2,
        Nombre: 'Sede',
        ciudad: 'ciudad',
        region_id: 4,
        comuna_id: 9,
        direccion: 'algun lugar lejos',
        
    },
    {
        id: 3,
        Nombre: 'Sede 3',
        ciudad: 'ciudad 3',
        region_id: 1,
        comuna_id: 5,
        direccion: 'algun lugar lejos',
        
    },
]);


const AddCampo = () => {
    console.log("añadir Sede")
}

const pedirListadoLocalidad = async () => {
    const respuesta = await peticiones.ListadoRegiones()
    if (respuesta.success) {
        listadoLocalidad.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

onMounted( async () => {
    pedirListadoLocalidad();
});

</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
}

h3.subtitulo {
font-size: 22px;
font-weight: 500;
line-height: 48px;
text-align: left;
margin:0;
}

p.descripcion {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;  
}
</style>