<template>
    <form class="formulario">
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar centro de costos"
                Titulo="Centro de costo"
                name="Departamento"
                v-model="NombreDepartamento"
                @update:modelValue="NombreDepartamento = $event"
                :requerido="RequiereActualizar"
            />
            <InputBorderDescripcion
                Placeholder="Ingresar código"
                Titulo="Código SAP "
                name="CodigoSAP"
                v-model="CodigoSAP"
                @update:modelValue="CodigoSAP = $event"
                :requerido="RequiereActualizar"
            />

            <LayoutInputBorder textLabel="Dimensión" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Dimension"
                    :options="ListaDimension"
                    :requerido="RequiereActualizar"            
                    :preseleccion="Dimension"  
                    optionsSelected="Seleccionar"
                  />
                </template>
            </LayoutInputBorder>
            
            <div>
                <trashIcon Stroke="#1A245B"/>    
            </div>
            
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
import trashIcon from '@/components/icons/trash-icon.vue';

import { defineProps, ref } from 'vue';

const props = defineProps({
    Datos: {
        Object,
        default: {}
    }
})

const RequiereActualizar = ref(false)
</script>


<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    box-sizing: border-box;
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

div.espacioTrash {
    width: 100%;
    display:flex;
    justify-content: end;
}

</style>