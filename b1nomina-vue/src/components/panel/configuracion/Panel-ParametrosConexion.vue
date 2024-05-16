<template>
    <div class="contend">
       <ListaParametrosConexionSAP />
    </div>
</template>

<script setup>
import ListaParametrosConexionSAP from '@/components/listas/configuracion/Lista-ParametrosConexionSAP.vue';

import { ref, inject } from 'vue';

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Parámetros de Conexión');


</script>

<style scoped>
.contend {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    gap: 12px;
}
</style>