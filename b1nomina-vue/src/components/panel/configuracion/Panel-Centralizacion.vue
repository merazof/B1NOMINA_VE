<template>
    <div class="contend">
        <LayoutNavConfig>
            <template #default>
                <NavConfigButton 
                    :activar="panelSelecionado == 1"  
                    texto="Configuración Generales" 
                    @click="SelecionarPanel(1)"
                />
                <NavConfigButton 
                    :activar="panelSelecionado == 2" 
                    texto="Centro de Costos"
                    @click="SelecionarPanel(2)"
                />
                <NavConfigButton 
                    :activar="panelSelecionado == 3" 
                    texto="Grupos Centralización"
                    @click="SelecionarPanel(3)"
                />
            </template>            
        </LayoutNavConfig>
        <div class="vista-panel">
            <ListaConfiguracionesGenerales v-if="panelSelecionado == 1" />

            <ListaCentrosCostos v-if="panelSelecionado == 2" />

            <ListaGrupos v-if="panelSelecionado == 3" />
        </div>
    </div>
</template>

<script setup>
import NavConfigButton from '@/components/botones/Nav-config-button.vue';
import LayoutNavConfig from '@/components/Layouts/LayoutNavConfig.vue';
import ListaConfiguracionesGenerales from '@/components/listas/configuracion/centralizacion/Lista-ConfiguracionesGenerales.vue'
import ListaCentrosCostos from '@/components/listas/configuracion/centralizacion/Lista-CentrosCostos.vue';
import ListaGrupos from '@/components/listas/configuracion/centralizacion/Lista-Grupos.vue'

import { ref, inject } from 'vue';

const panelSelecionado = ref(1);

const SelecionarPanel = (num) => {
    panelSelecionado.value = num;
}

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Centralización');


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