<!-- Componente principal que contiene la navegación y la vista del panel Datos Empresa -->
<template>
    <div class="contend">
        <!-- Layout de navegación configurable con botones para seleccionar diferentes paneles -->
        <LayoutNavConfig>
            <template #default>
                <!-- Botón para seleccionar el panel de Datos Básicos -->
                <NavConfigButton :activar="panelSelecionado == 1" texto="Datos Básicos" @click="SelecionarPanel(1)"/>
                <!-- Botón para seleccionar el panel de Sedes -->
                <NavConfigButton :activar="panelSelecionado == 2" texto="Sedes" @click="SelecionarPanel(2)"/>
                <!-- Botón para seleccionar el panel de Departamentos -->
                <NavConfigButton :activar="panelSelecionado == 3" texto="Departamentos" @click="SelecionarPanel(3)"/>
                <!-- Botón para seleccionar el panel de Grupos -->
                <NavConfigButton :activar="panelSelecionado == 4" texto="Grupos" @click="SelecionarPanel(4)"/>
                <!-- Botón para seleccionar el panel de Cargos -->
                <NavConfigButton :activar="panelSelecionado == 5" texto="Cargos" @click="SelecionarPanel(5)"/>
                <!-- Botón para seleccionar el panel de Campos Adicionales -->
                <NavConfigButton :activar="panelSelecionado == 6" texto="Campos Adicionales" @click="SelecionarPanel(6)"/>
            </template>            
        </LayoutNavConfig>
        <!-- Contenedor para la vista del panel seleccionado -->
        <div class="vista-panel">
            <!-- Lista de formularios para Datos Básicos de la Empresa -->
            <ListaFormDatosbasicosEmpresa v-if="panelSelecionado == 1" />
            <!-- Lista de formularios para Sedes -->
            <ListaFormSedes v-if="panelSelecionado == 2" />
            <!-- Lista de formularios para Departamentos -->
            <ListaDepartamentosConfiguracions v-if="panelSelecionado == 3" />
            <!-- Lista de formularios para Grupos -->
            <ListaGruposConfiguracion v-if="panelSelecionado == 4" />
            <!-- Lista de formularios para Cargos -->
            <ListaCargosConfiguracion v-if="panelSelecionado == 5" />
            <!-- Lista de formularios para Campos Adicionales -->
            <ListaCamposAdicionalesConfiguracion v-if="panelSelecionado == 6" />
        </div>
    </div>
</template>

<!-- Sección de script para la lógica del componente -->
<script setup>
import NavConfigButton from '@/components/botones/Nav-config-button.vue'; // Importa el componente de botón de configuración
import LayoutNavConfig from '@/components/Layouts/LayoutNavConfig.vue'; // Importa el layout de configuración

import ListaFormDatosbasicosEmpresa from '@/components/listas/configuracion/datos-empresa/Lista-Form-DatosBasicos-Empresa.vue'; // Importa el componente de lista para datos básicos
import ListaFormSedes from '@/components/listas/configuracion/datos-empresa/Lista-Form-Sedes.vue'; // Importa el componente de lista para sedes
import ListaDepartamentosConfiguracions from '@/components/listas/configuracion/datos-empresa/Lista-Departamentos-Configuracion.vue'; // Importa el componente de lista para departamentos
import ListaCargosConfiguracion from '@/components/listas/configuracion/datos-empresa/Lista-Cargos-Configuracion.vue'; // Importa el componente de lista para cargos
import ListaGruposConfiguracion from '@/components/listas/configuracion/datos-empresa/Lista-Grupos-Configuracion.vue'; // Importa el componente de lista para grupos
import ListaCamposAdicionalesConfiguracion from '@/components/listas/configuracion/datos-empresa/Lista-CamposAdicionales-Configuracion.vue'; // Importa el componente de lista para campos adicionales

import { ref, inject } from 'vue'; // Importa las funciones reactivas y de inyección de dependencias de Vue

const panelSelecionado = ref(1); // Variable reactiva para almacenar el número del panel seleccionado

const SelecionarPanel = (num) => { // Función para cambiar el panel seleccionado
    panelSelecionado.value = num;
}

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Datos de la Empresa');
</script>

<!-- Sección de estilos para el componente -->
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
    width: 100%;
    justify-content: start;
    flex-direction: column;
    gap: 48px;
    padding: 24px 0px;
    box-sizing: border-box;
}
</style>
