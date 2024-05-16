<template>
    <form class="formulario">
        <h4>Configuraciones Básicas</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar valor de salario mínimo actual"
                Titulo="Sueldo Mínimo ($)"
                name="Sueldo"
                v-model="Sueldo"
                @update:modelValue="Sueldo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="1"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Gratificación Ingreso Mínimo (%) *"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
            
            <InputBorderDescripcion
                Placeholder="Ingresar tope de gratificación"
                Titulo="Tope de Gratificación (UF)"
                v-model="correoEmpresa"
                @update:modelValue="correoEmpresa = $event"
                Tipo="Number"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Días de Vacaciones por año"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Horas diarias legales"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Retención de honorarios (%)"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
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