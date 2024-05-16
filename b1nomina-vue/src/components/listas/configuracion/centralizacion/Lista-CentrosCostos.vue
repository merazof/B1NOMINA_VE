<template>
    <div class="contend">
        <h3 class="subtitulo">Agrega Centro de Costo</h3>

        <p class="descripcion">
            Un centro de costos se utiliza en la contabilidad de gestión para recopilar y asignar los gastos generales.    
        </p>

        <LayoutFondoBorder v-for="Departamento in ListaDepartamentos" :key="Departamento.id">
            <template #default>    
                  <FormCentroosto :Datos="Departamento"/>        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Centro de Costo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormCentroosto from '@/components/formularios/configuracion/centralizacion/Form-CentroCosto.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {ref} from 'vue';

const ListaDepartamentos = ref([
    {
        id: 1
    },
    {
        id: 2
    }
]);
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