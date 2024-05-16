<template>
    <!-- Contenedor principal para la navegación de textos posicionales -->
    <div class="nav-form">
        <!-- Componente PositionText con número "1", texto "Datos Básicos" y propiedad seleccionado establecida en falso -->
        <PositionText
            :class="(edit)?'edit':''"
            numero="1"
            texto="Datos Básicos"
            :selecionado="idFormularioActivo == 1"
            @click="() => emit('ShowModal', 1)"
        />

        <!-- Imagen que actúa como línea divisoria entre los elementos de la navegación -->
        <img src="@/components/icons/svg/Line-icon.svg">

        <!-- Componente PositionText con número "2", texto "Datos Personales" y propiedad seleccionado establecida en falso -->
        <PositionText 
        :class="(edit)?'edit':''"
            numero="2"
            texto="Datos Personales"
            :selecionado="idFormularioActivo == 2"
            @click="() => emit('ShowModal', 2)"
        />

        <!-- Imagen que actúa como línea divisoria entre los elementos de la navegación -->
        <img src="@/components/icons/svg/Line-icon.svg">

        <!-- Componente PositionText con número "3", texto "Datos Laborales" y propiedad seleccionado establecida en falso -->
        <PositionText 
        :class="(edit)?'edit':''"
            numero="3" 
            texto="Datos Laborales" 
            :selecionado="idFormularioActivo == 3" 
            @click="() => emit('ShowModal', 3)"
        />

        <!-- Imagen que actúa como línea divisoria entre los elementos de la navegación -->
        <img src="@/components/icons/svg/Line-icon.svg">

        <!-- Componente PositionText con número "4", texto "Datos de Pago" y propiedad seleccionado establecida en falso -->
        <PositionText 
        :class="(edit)?'edit':''"
            numero="4" 
            texto="Datos Adicionales" 
            :selecionado="idFormularioActivo == 4" 
            @click="() => emit('ShowModal', 4)"
        />
        
    </div>
</template>

<script setup>
// uso: <NavForm :idFormularioActivo="" />

// Importación del componente PositionText para ser utilizado en este componente
import PositionText from '../Position-text.vue';

import { defineProps, defineEmits } from 'vue';

const emit = defineEmits([
    'ShowModal'
])

const props = defineProps({
    idFormularioActivo: {
        type: Number,
        default: 1
    },
    edit: {
        Boolean,
        default: false
    }
});

</script>

<style scoped>
/* Estilos específicos para el contenedor de la navegación de textos posicionales */
div.nav-form {
    width:  100%;
    box-sizing: border-box;
    padding:  24px;
    gap:  12px;
    display: flex;
    justify-content: space-between;
    box-shadow:  0px  0px  10px  4px rgba(0,0,0,0.3);
}

.edit {
    cursor: pointer;
}
</style>
