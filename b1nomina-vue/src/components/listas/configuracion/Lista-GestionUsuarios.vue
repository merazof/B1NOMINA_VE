<template>
    <div class="contend">
        <h3 class="subtitulo">
            Configuración usuarios
        </h3>

        <p class="descripcion">
            Aquí puedes visualizar los perfiles de ususario que existen y los roles que puedes asignarles.
        </p>

        <LayoutFondoBorder>
            <template #default>    
                <FormMaster /> 
            </template>
        </LayoutFondoBorder>

        <LayoutFondoBorder>
            <template #default>    
                     
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormMaster from '@/components/formularios/configuracion/gestion-usuarios/Form-Master.vue';
import {ref} from 'vue';

const ListaDepartamentos = ref([
    {
        id: 1
    },
    {
        id: 2
    }
]);
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