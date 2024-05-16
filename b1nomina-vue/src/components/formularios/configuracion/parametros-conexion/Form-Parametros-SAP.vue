<template>
    <form class="formulario">
        <h4>Servidor SAP</h4>

        <span>Al conectarse a SAP, podrá visualizar datos y establecer datos de forma sincronizada.</span>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar nombre del servidor"
                Titulo="Servidor SAP"
                name="Sueldo"
                v-model="Sueldo"
                @update:modelValue="Sueldo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="1"
                :maximo-caracteres="100"
            />
            <LayoutInputBorder textLabel="Tipo de Servidor" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Region"
                    :options="ListaRegiones"
                    :requerido="RequiereActualizar"            
                    :preseleccion="tipoDocumentoSelect"  
                    optionsSelected="Seleccionar"
                  />
                </template>
            </LayoutInputBorder>

           <LayoutInputBorder textLabel="Versión del Servidor" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Region"
                    :options="ListaRegiones"
                    :requerido="RequiereActualizar"            
                    :preseleccion="tipoDocumentoSelect"  
                    optionsSelected="Seleccionar"
                  />
                </template>
            </LayoutInputBorder>
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar nombre del la base de datos"
                Titulo="Nombre de base de datos SAP"
                name="Sueldo"
                v-model="Sueldo"
                @update:modelValue="Sueldo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="1"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar nombre del usuario del servidor"
                Titulo="Usuario del Servidor"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                   
            />
            
            <InputBorderDescripcion
                Placeholder="Ingresar Contraseña"
                Titulo="Contraseña Servidor"
                v-model="correoEmpresa"
                @update:modelValue="correoEmpresa = $event"
                Tipo="Number"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar nombre de usuario SAP"
                Titulo="Usuario SAP"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                   
            />
            <InputBorderDescripcion
                Placeholder="Ingresar Contraseña"
                Titulo="Contraseña SAP"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                   
            />
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