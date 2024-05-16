<template>
    <form class="formulario">
        <h4>Seguro de Cesantía (AFC)</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Seguro AFC Empresa (%)"
                name="Seguro AFC"
                v-model="SeguroAFCEmpresa"
                @update:modelValue="SeguroAFCEmpresa = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Seguro AFC Empleado (%) "
                name="SeguroAFCEmpleado"
                v-model="SeguroAFCEmpleado"
                @update:modelValue="SeguroAFCEmpleado = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="AFC Cont. Plazo Fijo (%)"
                name="Gratificacion"
                v-model="AFC_plazo_fijo"
                @update:modelValue="AFC_plazo_fijo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="AFC 11 Años antigüedad (%) *"
                name="Gratificacion"
                v-model="AFC_Antiguedad"
                @update:modelValue="AFC_Antiguedad = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
            <InputBorderDescripcion
                Placeholder="Ingresar tope de seguro AFC"
                Titulo="Tope Seguro AFC (UF)"
                name="Sueldo"
                v-model="UF"
                @update:modelValue="UF = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="1"
                :maximo-caracteres="100"
            />
        </div>

    
        <div class="espacioBoto">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
import TemplateButton from '@/components/botones/Template-button.vue';
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