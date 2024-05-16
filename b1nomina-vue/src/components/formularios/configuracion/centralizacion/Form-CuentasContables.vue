<template>
    <form class="formulario">
        <h4>Cuentas Contables</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta anticipo"
                name="CuentaAnticipo"
                v-model="cuentaAnticipo"
                @update:modelValue="cuentaAnticipo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta bonos feriado"
                name="CuentaBonosFeriados"
                v-model="CuentaBonosFeriados"
                @update:modelValue="CuentaBonosFeriados = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta Prestamos Solidarios"
                name="CuentaPrestamoSolidarios"
                v-model="CuentaPrestamoSolidarios"
                @update:modelValue="CuentaPrestamoSolidarios = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
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