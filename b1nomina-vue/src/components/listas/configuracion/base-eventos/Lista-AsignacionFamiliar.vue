<template>
    <div class="contend">
        <h3 class="subtitulo">Tramos de Asignacion Familiar</h3>

        <LayoutFondoBorder v-for="item in ListaElementos" :key="item.id">
            <template #default>    
                <FormAsignacionFamiliar />
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormAsignacionFamiliar from '@/components/formularios/configuracion/base-eventos/Form-AsignacionFamiliar.vue';

import {ref} from 'vue';

const ListaElementos = ref([
    {
        id: 1,
        Titulo: "Tramo A"
    },
    {
        id: 2,
        Titulo: "Tramo B"
    },
    {
        id: 3,
        Titulo: "Tramo C"
    },
    {
        id: 4,
        Titulo: "Tramo D"
    },
    {
        id: 5,
        Titulo: "Tramo E"
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