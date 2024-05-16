<template>
    <div class="contend">
        <h3 class="subtitulo">APV -  Instituciones autorizadas</h3>

        <LayoutFondoBorder v-for="item in ListaElementos" :key="item.id">
            <template #default>    
                <FormAPV/>
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nueva"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';
import FormAPV from '@/components/formularios/configuracion/base-eventos/Form-APV.vue';

import {ref} from 'vue';

const ListaElementos = ref([
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