<!-- Plantilla -->
<template>
    <!-- Contenedor principal de la página -->
    <div>
        <!-- Muestra el componente Header con el nombre de la página establecido como "Eventos" -->
        <Header nombrePagina="Eventos" />
    </div>
</template>

<!-- Configuración del script -->
<script>
    // Importa el componente Header para ser utilizado en la página
    import Header from '@/components/Header.vue';

    export default {
        // Asigna un nombre único al componente para identificarlo en la aplicación
        name: 'eventos',

        // Registra los componentes locales utilizados en la página
        components: {
            Header
        },

        // Define los datos reactivos del componente
        data() {
            // Retorna un objeto vacío para los datos reactivos
            return {}
        },
    }
</script>

<!-- Estilos CSS -->
<style scoped>
    /* Aplica estilos al contenedor div para centrar su contenido horizontalmente */
    div {
        display: flex;
        justify-content: center;
    }
</style>
