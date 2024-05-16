<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                <div>
                    <h3>Historial de cambios realizados a B1 Nómina</h3>
                    <p>
                        El historial de cambios de B1 Nómina fue diseñado para llevar un registro de los cambios efectuados en la configuración del sistema.
                    </p>
                    <HistorialAcciones />
                </div>
            </template>
        </LayoutFondoBorder>               
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';

import { ref, inject } from 'vue';
import HistorialAcciones from '@/components/tablas/configuracion/HistorialAcciones.vue';

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Historial de Acciones');


</script>

<style scoped>
.contend {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    gap: 12px;
}

.contend > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

h3 {
    color: black;
    font-size: 22px;
    font-weight: 500;
    line-height: 48px;
    word-wrap: break-word;
    margin: 0;
}

p {
    color: black;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    margin: 0;
}
</style>