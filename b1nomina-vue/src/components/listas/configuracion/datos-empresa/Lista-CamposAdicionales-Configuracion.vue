<template>
    <div class="contend">
        <h3 class="subtitulo">Campos Adicionales del Empleado</h3>

        <p class="descripcion">
            Crea hasta 5 campos personalizados para completar el perfil de tus empleados, estos campos son una opción pensada para suplir necesidades especificas de información que quieras adicionar a B1 Nómina.        
        </p>
        <LayoutFondoBorder v-for="Campo in ListaCamposAdicionales" :key="Campo.id">
            <template #default>    
                  <FormCamposAdicionales :Informacion="Campo"/>        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Campo" @click="AddCampo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormCamposAdicionales from '@/components/formularios/configuracion/datos-empresa/Form-CamposAdicionales.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref} from 'vue';

const ListaCamposAdicionales = ref([
    {
        id: 1,
        Nombre: 'Color Favorito',
        estado: false
    },
    {
        id: 2,
        Nombre: 'Nombre Mascota',
        estado: false
    }
]);

const AddCampo = () => {
    console.log("añadir Campo")
}

onMounted( () => {

})
</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
    box-sizing: border-box;
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