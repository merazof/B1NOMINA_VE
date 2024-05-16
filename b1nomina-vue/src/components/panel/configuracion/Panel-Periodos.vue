<template>
    <div class="contend">
        <LayoutNavConfig>
            <template #default>
                <NavConfigButton 
                    v-for="(periodo) in ListadoPeriodos" :key="periodo.id" 
                    :activar="panelSelecionado == periodo.id"  
                    :texto="periodo.Texto" 
                    @click="SelecionarPanel(periodo.id)"
                />
            </template>            
        </LayoutNavConfig>
        <div class="vista-panel">
            <ListaPeriodos :InformacionPeriodo="{}"/>
        </div>
    </div>
</template>

<script setup>
import NavConfigButton from '@/components/botones/Nav-config-button.vue';
import LayoutNavConfig from '@/components/Layouts/LayoutNavConfig.vue';
import ListaPeriodos from '@/components/listas/configuracion/Lista-periodos.vue'

import { ref, inject, onMounted } from 'vue';

const panelSelecionado = ref(1);

const SelecionarPanel = (num) => {
    panelSelecionado.value = num;
}

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Periodos');

const ListadoPeriodos = ref([
    {
        id: 1,
        Texto: '2022',
        data: {

        }

    },
    {
        id: 2,
        Texto: '2023',
        data: {
            
        }
    }
]);



onMounted(() => {

})
</script>

<style scoped>
.contend {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    gap: 12px;
}
.vista-panel {
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: center;
}
</style>