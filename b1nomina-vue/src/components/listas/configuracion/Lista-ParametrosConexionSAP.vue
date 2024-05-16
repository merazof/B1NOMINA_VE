<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>    
                <FormParametrosSAP />
            </template>
        </LayoutFondoBorder>
        <LayoutFondoBorder>
            <template #default>    
                <FormParametrosCorreo />
            </template>
        </LayoutFondoBorder>

    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormParametrosSAP from '@/components/formularios/configuracion/parametros-conexion/Form-Parametros-SAP.vue';
import FormParametrosCorreo from '@/components/formularios/configuracion/parametros-conexion/Form-Parametros-Correo.vue';

import {ref} from 'vue';

</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
    box-sizing: border-box;
}

h3.subtitulo {
font-size: 22px;
font-weight: 500;
line-height: 48px;
text-align: left;
margin:0;
}

p.descripcion {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;  
}
</style>