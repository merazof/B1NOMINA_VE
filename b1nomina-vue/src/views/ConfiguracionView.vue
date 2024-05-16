<!-- Template -->
<template>
    <!-- Uso de LayoutPanel para estructurar la página -->
    <LayoutPanel>
        <!-- Slot para la cabecera de la página -->
        <template #cabecera>
            <!-- Muestra el componente HeaderVue con el nombre de la página -->
            <!-- Si RutaNavegada está vacía, muestra "Configuraciones" -->
            <Headervue v-if="RutaNavegada == ''" nombrePagina="Configuraciones" />
            <!-- Si RutaNavegada no está vacía, muestra "Configuración > " seguido del nombre de la ruta -->
            <Headervue v-else :nombrePagina="'Configuración > ' + RutaNavegada " />
        </template>
        
        <!-- Slot para el panel principal de la página -->
        <template #panel>            
            <!-- Renderiza el componente correspondiente a la ruta actual -->
            <router-view />
        </template>
    </LayoutPanel>
</template>

<!-- Script Setup -->
<script setup>
    // Importa el componente HeaderVue para mostrar la cabecera de la página
    import Headervue from '@/components/Header.vue';
    // Importa el componente LayoutPanel para estructurar la página
    import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';

    // Importa funciones de Vue para manejar la reactividad y la provisión de valores
    import { provide, ref } from 'vue';
    
    // Propiedad reactiva para almacenar el nombre de la ruta actual
    const RutaNavegada = ref('');
    
    // Función que permite a los componentes hijos actualizar el nombre de la ruta navegada
    const CambiarNombreRuta = (Nombre) => {
        // Actualiza el valor de RutaNavegada con el nuevo nombre proporcionado
        RutaNavegada.value = Nombre;
    };
    
    // Provee la función CambiarNombreRuta a los componentes hijos para que puedan modificar el nombre de la ruta navegada
    provide('CambiarNombreRuta', CambiarNombreRuta);
</script>

<!-- Estilos CSS -->
<style scoped>
    /* Centra el contenido dentro de los divs */
    div {
        display: flex;
        justify-content: center;
    }
</style>
