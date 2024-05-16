<template>
    <form class="formulario">
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar código"
                Titulo="Código Externo"
                name="CodigoExterno"
                v-model="CodigoExterno"
                @update:modelValue="CodigoExterno = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                   
            />
            <InputBorderDescripcion
                Placeholder="Ingresar nombre"
                Titulo="Nombre"
                name="Nombre"
                v-model="Nombre"
                @update:modelValue="Nombre = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                   
            />
            <InputBorderDescripcion
                Placeholder="N° de cuenta previsión"
                Titulo="Cuenta Previsión"
                name="nprevision"
                v-model="nprevision"
                @update:modelValue="nprevision = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                   
            />
            <div>
                <trashIcon Stroke="#1A245B" text="Eliminar"/>
            </div>
        </div>

        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import TemplateButton from '@/components/botones/Template-button.vue';
import trashIcon from '@/components/icons/trash-icon.vue';
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