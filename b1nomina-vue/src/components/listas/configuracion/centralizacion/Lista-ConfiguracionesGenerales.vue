<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                
                <FormActivacionCampoVue
                    Titulo="Centralización por centro de costos"
                    descripcion="Permite agrupar y centralizar datos específicos de tu centro de costos."
                />
                                
            </template>
        </LayoutFondoBorder>
        <LayoutFondoBorder>
            <template #default>
                <FormActivacionCampoVue
                    Titulo="Préstamo solidario sobre el Imponible (Activo) / Tributable (Inactivo )"
                    descripcion="Permite configurar cómo se declara el préstamo polidario"
                />
            </template>
        </LayoutFondoBorder>
        <LayoutFondoBorder>
            <template #default>
                <FormCuentasContables />
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormActivacionCampoVue from '@/components/formularios/configuracion/centralizacion/Form-ActivacionCampo.vue';
import FormCuentasContables from '@/components/formularios/configuracion/centralizacion/Form-CuentasContables.vue'
</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
}
</style>