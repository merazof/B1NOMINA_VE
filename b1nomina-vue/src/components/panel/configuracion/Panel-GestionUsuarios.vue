<template>
    <div class="contend">
        <ListaGestionUsuarios />
    </div>
</template>

<script setup>
import ListaGestionUsuarios from '@/components/listas/configuracion/Lista-GestionUsuarios.vue';

import { ref, inject } from 'vue';

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Gestión de Usuario');


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