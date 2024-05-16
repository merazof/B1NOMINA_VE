<template>
    <div class="contend">
        <LayoutNavConfig>
            <template #default>
                <NavConfigButton 
                :activar="panelSelecionado == 1" 
                texto="AFP" 
                @click="SelecionarPanel(1)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 2" 
                texto="Previsión Salud" 
                @click="SelecionarPanel(2)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 3" 
                texto="Caja Compensación" 
                @click="SelecionarPanel(3)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 4" 
                texto="Asignación Familiar" 
                @click="SelecionarPanel(4)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 5" 
                texto="Mutual" 
                @click="SelecionarPanel(5)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 6" 
                texto="APV" 
                @click="SelecionarPanel(6)"
            />
            </template>            
        </LayoutNavConfig>
        <div class="vista-panel">
            <ListaAFP v-if="panelSelecionado == 1" />
            <ListaPrevisionSalud v-if="panelSelecionado == 2" />
            <ListaCajaCompensaciones v-if="panelSelecionado == 3" />
            <ListaAsignacionFamiliar v-if="panelSelecionado == 4" />
            <ListaMutual v-if="panelSelecionado == 5" />
            <ListaAPV v-if="panelSelecionado == 6" />
        </div>
    </div>
</template>

<script setup>
import NavConfigButton from '@/components/botones/Nav-config-button.vue';
import LayoutNavConfig from '@/components/Layouts/LayoutNavConfig.vue';
import ListaAFP from '@/components/listas/configuracion/base-eventos/Lista-AFP.vue'
import ListaPrevisionSalud from '@/components/listas/configuracion/base-eventos/Lista-PrevisionSalud.vue'
import ListaCajaCompensaciones from '@/components/listas/configuracion/base-eventos/Lista-CajaCompensacion.vue'
import ListaAsignacionFamiliar from '@/components/listas/configuracion/base-eventos/Lista-AsignacionFamiliar.vue'
import ListaMutual from '@/components/listas/configuracion/base-eventos/Lista-Mutual.vue'
import ListaAPV from '@/components/listas/configuracion/base-eventos/Lista-APV.vue'


import { ref, inject } from 'vue';

const panelSelecionado = ref(1);

const SelecionarPanel = (num) => {
    panelSelecionado.value = num;
};

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Base de Eventos');


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