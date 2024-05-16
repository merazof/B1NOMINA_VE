<template>
    <div class="contend">
        <h3 class="subtitulo"></h3>


        <LayoutFondoBorder v-for="Campo in ListaCamposAdicionales" :key="Campo.id">
            <template #default>    
                      
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref, defineProps} from 'vue';

const props = defineProps({
    InformacionPeriodo: {
        type: Object,
        default: {}
    }
});

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