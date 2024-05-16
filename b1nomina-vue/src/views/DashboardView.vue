<!-- Plantilla -->
<template>
    <!-- Uso del componente LayoutPanel para estructurar la página -->
    <LayoutPanel>
        <!-- Slot para la cabecera de la página -->
        <template #cabecera>
            <!-- Muestra el componente HeaderVue con el nombre de la página establecido como "DashBoard" -->
            <Headervue nombrePagina="DashBoard" />
        </template>

        <!-- Slot para el panel principal de la página -->
        <template v-slot:panel>
            <!-- Renderiza el componente PanelDashboard -->
            <PanelDashboard />
        </template>
    </LayoutPanel>
</template>

<!-- Configuración del script -->
<script setup>
    // Importa el componente HeaderVue para mostrar la cabecera de la página
    import Headervue from '@/components/Header.vue';
    // Importa el componente LayoutPanel para estructurar la página
    import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
    // Importa el componente PanelDashboard para mostrar el panel de dashboard
    import PanelDashboard from '@/components/panel/Panel-Dashboard.vue';
</script>

<!-- Estilos CSS -->
<style scoped>
    /* Centra el contenido dentro de los divs */
    div {
        display: flex;
        justify-content: center;
    }
</style>
