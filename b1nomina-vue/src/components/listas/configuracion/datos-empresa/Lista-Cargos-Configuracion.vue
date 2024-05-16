<template>
    <div class="contend">
        <h3 class="subtitulo">
            Asigna los cargos en tu empresa
        </h3>

        <p class="descripcion">
            Crea los cargos de tu empresa, para poder asociar a los empleados y poder tener así más información y control.
        </p>

        <LayoutFondoBorder v-for="cargo in ListaCargos" :key="cargo.id">
            <template #default>    
                  <FormCargos :Informacion="cargo"/>        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Cargo" @click="console.log('añadir Cargo')"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormCargos from '@/components/formularios/configuracion/datos-empresa/Form-Cargo.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref} from 'vue';

const ListaCargos = ref([
    {
        id: 1,
        Nombre: "Cargo 1"
    },
    {
        id: 2,
        Nombre: "Cargo 2"
    }
]);

onMounted(() => {

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