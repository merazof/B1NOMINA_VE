<template>
    <select class="lista-general" v-model="selected">

        <option value=''> 
            {{optionsSelected}}
        </option>

        <!---->
        <option v-for="option in options" :key="option.id" :value="option.id">
          {{ option.nombre }}
        </option>

    </select>
</template>

<script setup>
import { ref, defineProps } from 'vue';

//valores recibidos
const props = defineProps({
    //Lista de opciones
    options: {
        default: () => [{}]
    },
    //Titulo de la opcion
    optionsSelected: {
        type: [String, Number] ,
        default: 0,
    }
});

//reactividad a la opcion selecionada
const selected = ref('');

</script>

<style scoped>
select.lista-general {
    gap: 24px;
    width: fit-content;
    height: 48px;
    padding: 0px 16px;
    border-radius: 6px;
    border: 1px #363855 solid;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;

    /*Estilos de fuente*/
    color: #1A245B;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}

select.lista-general:focus {
    border-radius: 6px;
}

option {
    text-align: start;
}

</style>