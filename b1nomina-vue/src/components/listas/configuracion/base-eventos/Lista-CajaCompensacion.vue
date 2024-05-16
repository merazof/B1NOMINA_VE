<template>
    <div class="contend">
        <h3 class="subtitulo">Caja Compensación</h3>

        <LayoutFondoBorder v-for="Departamento in ListaDepartamentos" :key="Departamento.id">
            <template #default>    
                <FormCajaCompensacion />
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nueva"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';
import FormCajaCompensacion from '@/components/formularios/configuracion/base-eventos/Form-CajaCompensacion.vue';

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