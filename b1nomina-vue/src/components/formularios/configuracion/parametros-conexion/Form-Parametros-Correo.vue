<template>
    <form class="formulario">
        <h4>Servidor de Correo Electrónicos </h4>

        <span>
            Configura tu servidor de correos electrónicos para puedas comunicarte de manera efectiva con todos los usuarios y empleados de B1 Nómina.
        </span>


        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar nombre del servidor de correo"
                Titulo="Servidor de correo"
                name="Sueldo"
                v-model="Sueldo"
                @update:modelValue="Sueldo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="1"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar nombre del usuario del servidor"
                Titulo="Correo Electrónico  Remitente"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                   
            />
            
            <InputBorderDescripcion
                Placeholder="Ingresar Contraseña"
                Titulo="Contraseña del correo"
                v-model="correoEmpresa"
                @update:modelValue="correoEmpresa = $event"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Puerto Número"
                Titulo="Número de Puerto"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                   
            />

            <LayoutInputBorder textLabel="Habilitar SMTP" :requerido="RequiereActualizar">
                <template v-slot>
                  <InterruptorButton :Estado="true" Texto="Activo" />
                </template>
            </LayoutInputBorder>
            
        </div>

    
        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
import TemplateButton from '@/components/botones/Template-button.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';

import { ref } from 'vue';

const RequiereActualizar = ref(false)
</script>

<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px
}

h4 {
font-size: 22px;
font-weight: 500;
line-height: 30px;
text-align: left;
margin: 0;
}

div.row {
    display: flex;
    justify-content: space-between;
    gap:12px;
}

div.espacioBoto {
    width: 100%;
}

</style>