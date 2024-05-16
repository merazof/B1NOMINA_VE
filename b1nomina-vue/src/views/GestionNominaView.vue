<!-- Plantilla -->
<template>
    <!-- Uso del componente LayoutPanel para estructurar la página -->
    <LayoutPanel>
        <!-- Slot predeterminado para insertar contenido -->
        <template #default>
            <!-- Muestra el componente Header con el nombre de la página establecido como "Gestión de Nómina" -->
            <Header nombrePagina="Gestión de Nómina" />  
        </template>
    </LayoutPanel>
</template>

<!-- Configuración del script -->
<script>
    // Importa el componente Header para mostrar la cabecera de la página
    import Header from '@/components/Header.vue';
    // Importa el componente LayoutPanel para estructurar la página
    import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';

    export default {
        // Asigna un nombre único al componente para identificarlo en la aplicación
        name: 'gestionNomina',

        // Registra los componentes locales utilizados en la página
        components: {
            Header,
            LayoutPanel,
        },
    }
</script>

<!-- Estilos CSS -->
<style scoped>
    /* Centra el contenido dentro de los divs */
    div {
        display: flex;
        justify-content: center;
    }
</style>
